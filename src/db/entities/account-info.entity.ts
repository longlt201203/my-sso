import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AccountInfo {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	fname: string;

	@Column()
	lname: string;

	@Column()
	dob: Date;

	@Column()
	phone: string;
}
