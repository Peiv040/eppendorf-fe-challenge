import { IUser } from "../models/User";

export const registerUser = async (formData: IUser): Promise<{
    user: IUser;
    message: string;
}> => {
    const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/register`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        }
    );

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed");
    }

    return response.json();
};
