import { User } from "../../../utils/User";

export async function RegisterUser(
  user: User,
  handleShowError: Function,
  handleShowSuccess: Function,
): Promise<void> {
  try {
    const endpoint = "http://localhost:3000/api/user/auth/register";
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
