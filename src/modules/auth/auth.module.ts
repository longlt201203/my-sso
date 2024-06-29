import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { SecurityModule } from "@providers/security";
import { AccountModule } from "@modules/account";
import { CacheModule } from "@providers/cache";
import { ClsModule } from "nestjs-cls";

@Module({
	imports: [SecurityModule, AccountModule, CacheModule, ClsModule.forFeature()],
	controllers: [AuthController],
	providers: [AuthService],
	exports: [AuthService],
})
export class AuthModule {}
