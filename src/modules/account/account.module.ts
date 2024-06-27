import { Account, AccountInfo } from "@db/entities";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountService } from "./account.service";
import { SecurityModule } from "@providers/security";

@Module({
	imports: [TypeOrmModule.forFeature([Account, AccountInfo]), SecurityModule],
	controllers: [],
	providers: [AccountService],
	exports: [AccountService],
})
export class AccountModule {}
