import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class SecurityService {
	async hashPassword(password: string) {
		const salt = await bcrypt.genSalt();
		return bcrypt.hash(password, salt);
	}

	comparePassword(password: string, hashedPassword: string) {
		return bcrypt.compare(password, hashedPassword);
	}
}
