import { Injectable } from "@nestjs/common";
import { LoginUsernamePasswordDto, ProfileDto } from "./dto";
import { SecurityService } from "@providers/security";
import { AccountService } from "@modules/account";
import { Env, MySsoClsStore } from "@utils";
import { InvalidJwtError, WrongUsernameOrPasswordError } from "./errors";
import { CacheService } from "@providers/cache";
import { ClsService } from "nestjs-cls";

@Injectable()
export class AuthService {
	constructor(
		private readonly securityService: SecurityService,
		private readonly accountService: AccountService,
		private readonly cacheService: CacheService,
		private readonly cls: ClsService<MySsoClsStore>,
	) {}

	private issueTokensPair(sub: string) {
		const accessToken = this.securityService.signToken(
			sub,
			Env.JWT_AT_SECRET,
			Env.JWT_AT_EXP,
			Env.JWT_ISSUER,
		);
		const randomToken = this.securityService.randomStringToken(32);
		this.cacheService.set(`tokenId:${sub}`, randomToken);
		const refreshToken = this.securityService.signToken(
			sub,
			Env.JWT_RT_SECRET,
			Env.JWT_RT_EXP,
			Env.JWT_ISSUER,
			{
				token_id: randomToken,
			},
		);
		return { accessToken, refreshToken };
	}

	async loginUsernamePassword(dto: LoginUsernamePasswordDto) {
		const account = await this.accountService.getByUsernameAndPassword(
			dto.username,
			dto.password,
		);
		if (!account) throw new WrongUsernameOrPasswordError();
		return this.issueTokensPair(account.id);
	}

	async refreshTokens(refreshToken: string) {
		const payload = this.securityService.verifyToken(
			refreshToken,
			Env.JWT_RT_SECRET,
			Env.JWT_ISSUER,
		);
		if (typeof payload === "string") throw new InvalidJwtError();
		const sub = payload.sub;
		if (!sub) throw new InvalidJwtError();
		const tokenId = await this.cacheService.get(`tokenId:${sub}`);
		if (!tokenId) throw new InvalidJwtError();
		if (tokenId !== payload.token_id) throw new InvalidJwtError();
		this.cacheService.del(`tokenId:${sub}`);
		return this.issueTokensPair(sub);
	}

	async getProfile(accessToken: string) {
		const payload = this.securityService.verifyToken(
			accessToken,
			Env.JWT_AT_SECRET,
			Env.JWT_ISSUER,
		);
		if (typeof payload === "string") throw new InvalidJwtError();
		const sub = payload.sub;
		if (!sub) throw new InvalidJwtError();
		const account = await this.accountService.getOneById(sub);
		if (!account) throw new InvalidJwtError();
		return ProfileDto.fromAccount(account);
	}

	getProfileCls() {
		return this.cls.get("profile");
	}
}
