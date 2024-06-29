import { ProfileDto } from "@modules/auth/dto";
import { ClsStore } from "nestjs-cls";

export interface MySsoClsStore extends ClsStore {
	profile: ProfileDto;
}
