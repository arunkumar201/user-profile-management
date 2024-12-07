import { useState, useCallback, ReactNode, useEffect } from "react";
import { ProfileContext } from "./ProfileContext";
import { TProfile } from "../schema";
import { getProfile } from "../services/api";

export function ProfileProvider({ children }: { children: ReactNode }) {
	const [profile, setProfile] = useState<TProfile | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const updateProfile = useCallback((newProfile: TProfile | null) => {
		setProfile(newProfile);
	}, []);

	const fetchUserProfile = useCallback(async () => {
		const userEmail = localStorage.getItem("user-email");
		if (userEmail) {
			setLoading(true);
			setError(null);
			try {
				const userProfile = await getProfile(userEmail);
				setProfile(userProfile);
			} catch (error) {
				console.error("Error fetching profile:", error);
				setError("Failed to fetch user profile");
			} finally {
				setLoading(false);
			}
		}
	}, []);

	useEffect(() => {
		fetchUserProfile();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const value = {
		profile,
		setProfile: updateProfile,
		loading,
		error,
		setError,
		setLoading,
	};

	return (
		<ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
	);
}
