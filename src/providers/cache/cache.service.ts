import { Inject, Injectable } from "@nestjs/common";
import { Redis } from "ioredis";

@Injectable()
export class CacheService {
	constructor(
		@Inject("REDIS_CLIENT")
		private readonly redisClient: Redis,
	) {}

	get(key: string) {
		return this.redisClient.get(key);
	}

	set(key: string, value: string, ttl?: number) {
		return ttl
			? this.redisClient.set(key, value, "EX", ttl)
			: this.redisClient.set(key, value);
	}

	del(key: string) {
		return this.redisClient.del(key);
	}
}
