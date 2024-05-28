import { User } from "../../../utils/types/User";

export async function registerUser(
  user: User,
  handleShowError: Function,
  handleShowSuccess: Function,
): Promise<void> {
  try {
    const endpoint = "http://192.168.220.148:3000/api/user/auth/register";
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    response.status === 200 ? handleShowSuccess() : handleShowError();
  } catch (error) {
    console.error(error);
  }
}
