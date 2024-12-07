import { TProfile } from '../schema';
import { generateId } from '../utils/generateId';

const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL ?? process.env.VITE_API_BASE_URL;

export async function getProfile(email: string): Promise<TProfile> {
  try {
    if(!email) throw new Error('Profile email is required');
    const response = await fetch(`${API_BASE_URL}/profiles/?email=${email}`);
    if (!response.ok) {
      throw new Error('Profile not found');
    }
    const users=await response.json();
    console.log('Fetched profile:', users[0]);
    return users[0];
  } catch (err) {
    console.error('Error fetching profile:', err);
    throw new Error('Failed to fetch profile');
  }
}

export async function getAllProfiles(): Promise<TProfile[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/profiles`);
    if (!response.ok) {
      throw new Error('Failed to fetch profiles');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching profiles:', error);
    throw new Error('Failed to fetch profiles');
  }
}
export async function saveProfile(
	profile: Omit<TProfile, "id">
): Promise<TProfile> {
	const isUserExists = await getProfile(profile.email);

	if (isUserExists) {
		throw new Error("User already exists");
	}

	try {
		const id = generateId();
		const response = await fetch(`${API_BASE_URL}/profiles`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...profile, id }),
		});

		if (!response.ok) {
			throw new Error("Failed to save profile");
		}
		const savedProfile = await response.json();
		console.debug("🚀 ~ saveProfile ~ savedProfile:", savedProfile);
		return savedProfile;
	} catch (error) {
		console.error("Error saving profile:", error);
		throw new Error("Failed to save profile");
	}
}

export async function updateProfile(
	id: string,
	profile: Omit<TProfile, "id" | "email">
): Promise<TProfile> {
	try {
		const response = await fetch(`${API_BASE_URL}/profiles/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...profile }),
		});

		if (!response.ok) {
			throw new Error("Failed to update profile");
		}

		return response.json();
	} catch (error) {
		console.error("Error updating profile:", error);
		throw new Error("Failed to update profile");
	}
}

export async function deleteProfile(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/profiles/${id}`, {
			method: "DELETE",
		});
    
    if (!response.ok) {
      throw new Error('Failed to delete profile');
    }
  } catch (error) {
    console.error('Error deleting profile:', error);
    throw new Error('Failed to delete profile');
  }
}
