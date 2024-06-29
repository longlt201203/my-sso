import { Account } from "@db/entities";

export class ProfileDto {
	id: string;
	fname: string;
	lname: string;
	dob: Date;
	phone: string;

	static fromAccount(account: Account): ProfileDto {
		return {
			id: account.id,
			fname: account.info.fname,
			lname: account.info.lname,
			dob: account.info.dob,
			phone: account.info.phone,
		};
	}
}
