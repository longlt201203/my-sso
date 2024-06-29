import { config } from "dotenv";

config();

export const Env = {
	LISTEN_PORT: parseInt(process.env.LISTEN_PORT || "3000"),

	DB_HOST: process.env.DB_HOST || "localhost",
	DB_PORT: parseInt(process.env.DB_PORT || ""),
	DB_NAME: process.env.DB_NAME || "",
	DB_USER: process.env.DB_USER || "",
	DB_PASS: process.env.DB_PASS || "",

	ADMIN_USER: process.env.ADMIN_USER || "",
	ADMIN_EMAIL: process.env.ADMIN_EMAIL || "",
	ADMIN_PASS_FILE: process.env.ADMIN_PASS_FILE || "",

	JWT_AT_SECRET: process.env.JWT_AT_SECRET || "",
	JWT_RT_SECRET: process.env.JWT_RT_SECRET || "",
	JWT_AT_EXP: process.env.JWT_AT_EXP || "",
	JWT_RT_EXP: process.env.JWT_RT_EXP || "",
	JWT_ISSUER: process.env.JWT_ISSUER || "",

	REDIS_HOST: process.env.REDIS_HOST || "localhost",
	REDIS_PORT: parseInt(process.env.REDIS_PORT || "6379"),
} as const;

console.log(Env);
