import { useState, useCallback, ReactNode, useEffect } from "react";
import { TProfile } from "../schema";
import {
	getProfile,
	updateProfile,
	deleteProfile,
	saveProfile,
} from "../services/api";
import { ProfileContext } from "../context/ProfileContext";
import { USER_PROFILE } from "../constants";
import { ProfileContextType } from "../types/profile";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export interface IUserDetails {
	email: string;
	data: TProfile | null;
}

export function ProfileProvider({ children }: { children: ReactNode }) {
	const [profile, setProfile] = useState<TProfile | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const updateLocalProfile = useCallback(
		(newProfile: TProfile | null) => {
			setProfile(newProfile);
			localStorage.setItem(
				USER_PROFILE,
				JSON.stringify({
					email: profile?.email ?? newProfile?.email,
					data: newProfile,
				})
			);
		},
		[profile?.email]
	);
	const navigate = useNavigate();

	const fetchUserProfile = useCallback(async () => {
		const userDetailsString = localStorage.getItem(USER_PROFILE);
		const userDetails = userDetailsString
			? (JSON.parse(userDetailsString) as IUserDetails)
			: null;

		if (!userDetails?.email) {
			setProfile(null);
			return;
		}

		setLoading(true);
		setError(null);
		try {
			const userProfile =
				userDetails?.data || (await getProfile(userDetails.email));
			updateLocalProfile(userProfile);
		} catch (error) {
			console.error("Error fetching profile:", error);
			setError("Failed to fetch user profile");
		} finally {
			setLoading(false);
		}
	}, [setProfile, setLoading, setError, updateLocalProfile]);

	useEffect(() => {
		fetchUserProfile();
	}, [fetchUserProfile]);

	const saveUserProfile = async (updatedProfile: Omit<TProfile, "id">) => {
		setLoading(true);
		setError(null);
		try {
			const savedProfile = await saveProfile(updatedProfile);
			updateLocalProfile(savedProfile);
			toast.success("Profile saved successfully!");
			navigate("./profile");
		} catch (error) {
			if (error instanceof Error) {
				console.error("Error saving profile:", error);
				toast.error(error.message ?? "Failed to save user profile");
			} else {
				console.error("Unexpected error:", error);
				toast.error("An unexpected error occurred");
			}
			setError("Failed to save user profile");
		} finally {
			setLoading(false);
		}
	};

	const deleteUserProfile = async () => {
		if (!profile) {
			console.error("Invalid profile ID");
			toast.error("Invalid profile ID");
			return;
		}

		setLoading(true);
		setError(null);
		try {
			await deleteProfile(profile.id);
			updateLocalProfile(null);
			localStorage.removeItem(USER_PROFILE);
			toast.success("Profile deleted successfully!");
			navigate("/");
		} catch (error) {
			console.error("Error deleting profile:", error);
			setError("Failed to delete user profile");
			toast.error("Failed to delete user profile");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchUserProfile();
	}, [fetchUserProfile]);

	const updateUserProfile = async (
		id: string,
		updatedProfile: Omit<TProfile, "id" | "email">
	) => {
		if (!id || !profile) {
			console.error("Invalid profile ID");
			toast.error("Invalid profile ID");
			return;
		}
		setLoading(true);
		setError(null);
		try {
			await updateProfile(id, updatedProfile);
			updateLocalProfile({
				...profile,
				...updatedProfile,
			});
			toast.success("Profile updated successfully!");
			navigate("./profile");
		} catch (error) {
			console.error("Error updating profile:", error);
			setError("Failed to update user profile");
			toast.error("Failed to update user profile");
		} finally {
			setLoading(false);
		}
	};

	const value: ProfileContextType = {
		profile,
		loading,
		error,
		saveUserProfile,
		deleteUserProfile,
		updateUserProfile,
	};

	return (
		<ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
	);
}
