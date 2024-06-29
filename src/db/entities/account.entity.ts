import { AccountRoleEnum } from "@utils";
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { AccountInfo } from "./account-info.entity";

@Entity()
export class Account {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ unique: true })
	username: string;

	@Column({ unique: true })
	email: string;

	@Column({ type: "enum", enum: AccountRoleEnum })
	role: AccountRoleEnum;

	@Column()
	password: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@OneToOne(() => AccountInfo, { cascade: true })
	@JoinColumn()
	info: AccountInfo;
}
