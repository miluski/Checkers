import { User } from "../../utils/User";

export async function getUsers(): Promise<Array<User>> {
    const endpoint = "http://192.168.0.11:3000/api/user/getAll";
    const response = await fetch(endpoint);
    return await response.json();
}