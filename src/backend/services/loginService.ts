import { existingUser } from "../database/login";

export const login = async (email: string) => {
    return existingUser(email);
}