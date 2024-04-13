import { User } from "../../../utils/User";

export async function RegisterUser(
  user: User,
  handleShow: Function,
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
    response.status === 200 ? alert("Pomyślnie zarejestrowano!") : handleShow();
  } catch (error) {
    console.error(error);
  }
}
