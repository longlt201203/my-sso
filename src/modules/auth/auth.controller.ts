import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginUsernamePasswordDto } from "./dto";
import { ApiResponseDto } from "@utils";
import { SkipAuth } from "./skip-auth.decorator";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("login-username-password")
	@SkipAuth()
	async loginUsernamePassword(@Body() dto: LoginUsernamePasswordDto) {
		const data = await this.authService.loginUsernamePassword(dto);
		return new ApiResponseDto(data);
	}

	@Get("refresh-tokens")
	@SkipAuth()
	async refreshTokens(@Query("refreshToken") refreshToken: string) {
		const data = await this.authService.refreshTokens(refreshToken);
		return new ApiResponseDto(data);
	}

	@Get("profile")
	@ApiBearerAuth()
	async profile() {
		const data = this.authService.getProfileCls();
		return new ApiResponseDto(data);
	}
}
