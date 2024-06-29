import { Account, AccountInfo } from "@db/entities";
import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as fs from "fs";
import { AccountRoleEnum, Env } from "@utils";
import { SecurityService } from "@providers/security";

@Injectable()
export class AccountService implements OnModuleInit {
	constructor(
		@InjectRepository(Account)
		private readonly accountRepository: Repository<Account>,
		@InjectRepository(AccountInfo)
		private readonly accountInfoRepository: Repository<AccountInfo>,
		private readonly securityService: SecurityService,
	) {}

	async onModuleInit() {
		await this.createAdminIfNotExists();
	}

	private async createAdminIfNotExists() {
		let account = await this.accountRepository.findOne({
			where: {
				username: Env.ADMIN_USER,
			},
		});
		if (account) return;
		console.log("Creating admin account...");
		const password = fs.readFileSync(Env.ADMIN_PASS_FILE).toString();
		account = this.accountRepository.create({
			username: Env.ADMIN_USER,
			password: await this.securityService.hashPassword(password),
			email: Env.ADMIN_EMAIL,
			role: AccountRoleEnum.ADMIN,
			info: {
				fname: "admin",
				lname: "admin",
				dob: new Date(),
				phone: "string",
			},
		});
		await this.accountRepository.save(account);
		console.log("Admin account created.");
	}

	async getByUsernameAndPassword(username: string, password: string) {
		const account = await this.accountRepository.findOne({
			where: {
				username: username,
			},
		});
		if (!account) return null;
		const isPasswordValid = await this.securityService.comparePassword(
			password,
			account.password,
		);
		if (!isPasswordValid) return null;
		return account;
	}

	getOneById(id: string) {
		return this.accountRepository.findOne({
			where: {
				id: id,
			},
			relations: {
				info: true,
			},
		});
	}
}
