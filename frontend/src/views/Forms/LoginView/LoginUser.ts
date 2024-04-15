import { User } from "../../../utils/User.ts";

export async function LoginUser(
  user: User,
  navigate: Function,
  handleShow: Function,
): Promise<void> {
  const handleLogin = () => {
    navigate("/screenAfterLogin");
  };

  try {
    const endpoint = "http://localhost:3000/api/user/auth/login";
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    response.status === 200 ? handleLogin() : handleShow();
  } catch (error) {
    console.error(error);
  }
}