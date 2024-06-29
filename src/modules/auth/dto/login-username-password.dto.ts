import { ApiProperty } from "@nestjs/swagger";

export class LoginUsernamePasswordDto {
	@ApiProperty()
	username: string;

	@ApiProperty()
	password: string;
}
