import { ApiError } from "@errors";

export class InvalidJwtError extends ApiError {
	constructor() {
		super({
			code: "invalid_jwt",
			message: "Invalid JWT",
			detail: null,
			status: 401,
		});
	}
}
