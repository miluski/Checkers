import { User } from "../../utils/types/User";

export async function getUsers(): Promise<Array<User>> {
    const endpoint = "http://localhost:3000/api/user/getAll";
    const response = await fetch(endpoint);
    return await response.json();
}