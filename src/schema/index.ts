import { z } from "zod";

export const ZProfile = z.object({
	firstName: z.string().min(3, "First name must be at least 3 characters"),
	lastName: z.string().min(3, "Last name must be at least 3 characters"),
	email: z.string().email("Invalid email format"),
	age: z.number().optional(),
	id: z.string(),
});


export type TProfile = z.infer<typeof ZProfile>;
