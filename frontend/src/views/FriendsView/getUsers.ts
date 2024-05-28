import { User } from "../../utils/types/User";

export async function getUsers(): Promise<Array<User>> {
    const endpoint = "http://192.168.220.148:3000/api/user/getAll";
    const response = await fetch(endpoint);
    return await response.json();
}