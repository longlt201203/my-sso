import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

@Injectable()
export class SecurityService {
	randomStringToken(length: number) {
		const seed =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
		let token = "";
		for (let i = 0; i < length; i++) {
			token += seed.charAt(Math.floor(Math.random() * seed.length));
		}
		return token;
	}

	async hashPassword(password: string) {
		const salt = await bcrypt.genSalt();
		return bcrypt.hash(password, salt);
	}

	comparePassword(password: string, hashedPassword: string) {
		return bcrypt.compare(password, hashedPassword);
	}

	signToken(
		sub: string,
		secret: string,
		expiresIn: string,
		issuer: string,
		payload: any = {},
	) {
		return jwt.sign(payload, secret, {
			subject: sub,
			expiresIn: expiresIn,
			issuer: issuer,
		});
	}

	verifyToken(token: string, secret: string, issuer: string) {
		return jwt.verify(token, secret, {
			issuer: issuer,
		});
	}
}
