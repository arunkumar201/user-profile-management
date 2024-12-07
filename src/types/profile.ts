import { TProfile } from "../schema";


export interface ProfileContextType {
	profile: TProfile | null;
	loading: boolean;
	error: string | null;
	updateUserProfile: (
		id: string,
		updatedProfile: Omit<TProfile, "id" | "email">
	) => Promise<void>;
	deleteUserProfile: () => Promise<void>;
	saveUserProfile: (newProfile: Omit<TProfile, "id">) => Promise<void>;
}
