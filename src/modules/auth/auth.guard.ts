import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request } from "express";
import { ClsService } from "nestjs-cls";
import { MySsoClsStore } from "@utils";
import { Reflector } from "@nestjs/core";
import { SkipAuth } from "./skip-auth.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly authService: AuthService,
		private readonly cls: ClsService<MySsoClsStore>,
		private readonly reflector: Reflector,
	) {}

	async canActivate(context: ExecutionContext) {
		const isSkipAuth = this.reflector.get<boolean>(
			SkipAuth.name,
			context.getHandler(),
		);
		if (isSkipAuth) {
			return true;
		}
		const ctx = context.switchToHttp();
		const req = ctx.getRequest<Request>();
		const accessToken = this.getAccessToken(req);
		if (!accessToken) {
			return false;
		}
		const profile = await this.authService.getProfile(accessToken);
		this.cls.set("profile", profile);
		return true;
	}

	private getAccessToken(req: Request) {
		const authHeader = req.headers.authorization;
		if (authHeader && authHeader.startsWith("Bearer ")) {
			return authHeader.substring(7);
		}
		return null;
	}
}
