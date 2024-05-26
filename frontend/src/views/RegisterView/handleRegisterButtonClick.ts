import { User } from "../../utils/User";

export async function handleRegisterButtonClick(user: User): Promise<void> {
    try {
        const endpoint = "http://192.168.0.11:3000/api/user/auth/register";
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        response.status === 200 ? alert("Pomyślnie zarejestrowano!") : alert("Wystąpił błąd przy rejestracji!");
    } catch(error) {
        console.error(error);
    }
}