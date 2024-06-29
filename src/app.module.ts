import { Module } from "@nestjs/common";
import { APP_FILTER, APP_GUARD, APP_PIPE } from "@nestjs/core";
import { MyExceptionFilter, MySsoClsStore, ValidationPipe } from "@utils";
import { DbModule } from "@db";
import { AccountModule } from "@modules/account";
import { AuthGuard, AuthModule } from "@modules/auth";
import { ClsModule, ClsService } from "nestjs-cls";

@Module({
	imports: [
		DbModule,
		AccountModule,
		AuthModule,
		ClsModule.forRoot({
			global: true,
			middleware: {
				mount: true,
				setup: (cls: ClsService<MySsoClsStore>) => {
					cls.set("profile", null);
				},
			},
		}),
	],
	controllers: [],
	providers: [
		{
			provide: APP_FILTER,
			useClass: MyExceptionFilter,
		},
		{
			provide: APP_PIPE,
			useClass: ValidationPipe,
		},
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
})
export class AppModule {}
