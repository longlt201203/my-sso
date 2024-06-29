import { Module } from "@nestjs/common";
import { CacheService } from "./cache.service";
import { Redis } from "ioredis";

@Module({
	providers: [
		CacheService,
		{
			provide: "REDIS_CLIENT",
			useValue: new Redis({ host: "localhost", port: 6379 }),
		},
	],
	exports: [CacheService],
})
export class CacheModule {}
