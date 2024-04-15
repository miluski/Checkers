import { Button } from "react-bootstrap";
import "./FormSubmitButton.css";
import { useSelector } from "react-redux";
import { User } from "../../utils/User";
import { handleRegisterButtonClick } from "../../views/RegisterView/handleRegisterButtonClick";

export default function FormSubmitButton(props: {
	text: string;
	operation: string;
}) {
	const { nickname, password, email } = useSelector((state: User) => state);
	return (
		<Button
			className='w-100 py-3 fs-4 fw-bold mb-4 rounded-3 wp-button-component wp-button-primary cc-button-xx-large '
			type='submit'
			onClick={async () => {
				props.operation === "login"
					? null
					: props.operation === "register"
					? await handleRegisterButtonClick({
							nickname: nickname,
							password: password,
							email: email,
					  })
					: null;
			}}>
			{props.text}
		</Button>
	);
}
