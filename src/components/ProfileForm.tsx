import { useState, useCallback, FormEvent, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { saveProfile, updateProfile } from "../services/api";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { TProfile, ZProfile } from "../schema";
import { useProfile } from "../hooks/useProfile";
import { wait } from "../utils";
import { InputField } from "./InputFormField";

function UserProfileForm() {
	const navigate = useNavigate();
	const { profile, setProfile, loading, setLoading, setError } = useProfile();
	const [errors, setErrors] = useState<Record<string, string>>({});

const initialFormData = useMemo(
	() => ({
		firstName: profile?.firstName || "",
		lastName: profile?.lastName || "",
		email: profile?.email || "",
		age: profile?.age ? profile.age.toString() : "",
	}),
	[profile]
);

	const [formData, setFormData] = useState(initialFormData);
	const isFormChanged = JSON.stringify(formData) !== JSON.stringify(initialFormData);
  
  useEffect(() => {
    setFormData(initialFormData);
  }, [initialFormData]);

	const handleInputChange = useCallback((field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	}, []);

	const handleErrors = (error: Error | z.ZodError) => {
		if (error instanceof z.ZodError) {
			const formattedErrors: Record<string, string> = {};
			error.errors.forEach((err) => {
				if (err.path) {
					formattedErrors[err.path[0]] = err.message;
				}
			});
			setErrors(formattedErrors);
		} else {
			toast.error(error.message ?? "Failed to save profile");
			setError(error.message ?? "Failed to save profile");
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!isFormChanged) {
			toast.error("No changes detected.");
			return;
		}
  
		setLoading(true);
		setError(null);
		try {
			const validatedData = await ZProfile.omit({ id: true }).parseAsync({
				...formData,
				age: formData.age ? Number(formData.age) : undefined,
			});

			await wait(1);
			let savedProfile: TProfile;
			if (profile?.id) {
				savedProfile = await updateProfile(profile.id, validatedData);
			} else {
				savedProfile = await saveProfile(validatedData);
				localStorage.setItem("user-email", savedProfile.email.toLowerCase());
			}
			setProfile(savedProfile);
			toast.success("Profile saved successfully!");
			navigate("/profile");
		} catch (error) {
			handleErrors(error as z.ZodError | Error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
			<h2 className="text-2xl font-bold mb-6">
				{profile ? "Edit Profile" : "Create Profile"}
			</h2>

			<form onSubmit={handleSubmit} className="space-y-6">
				<InputField
					label="First Name"
					value={formData.firstName}
					onChange={(e) => handleInputChange("firstName", e.target.value)}
					error={errors.firstName}
				/>

				<InputField
					label="Last Name"
					value={formData.lastName}
					onChange={(e) => handleInputChange("lastName", e.target.value)}
					error={errors.lastName}
				/>

				<InputField
					label="Email"
					type="email"
					value={formData.email}
					onChange={(e) => handleInputChange("email", e.target.value)}
					error={errors.email}
					isReadOnly={profile?.email ? true : false}
				/>

				<InputField
					label="Age (Optional)"
					type="number"
					value={formData.age}
					onChange={(e) => handleInputChange("age", e.target.value)}
					error={errors.age}
				/>

				<button
					type="submit"
					disabled={loading || !isFormChanged}
					className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
						loading || !isFormChanged ? "opacity-50" : ""
					}`}
				>
					{loading ? "Saving..." : "Save Profile"}
				</button>
			</form>
		</div>
	);
}

export default UserProfileForm;
