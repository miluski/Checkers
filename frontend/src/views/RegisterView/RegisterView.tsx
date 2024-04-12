import "../../utils/utils.css";
import "./RegisterView.css";
import { Form } from "react-bootstrap";
import Logo from "../../components/Logo/Logo.tsx";
import FormInput from "../../components/FormInput/FormInput.tsx";
import FormTextSecondary from "../../components/FormTextSecondary/FormTextSecondary.tsx";
import FormSubmitButton from "../../components/FormButton/FormSubmitButton.tsx";
import SocialMediaList from "../../components/SocialMediaList/SocialMediaList.tsx";
import CopyRight from "../../components/CopyRight/CopyRight.tsx";

export default function RegisterView() {
	return (
		<main className='background-theme '>
			<div className='container d-flex flex-column gap-4 gap-lg-5 align-items-center  justify-content-center h-100'>
				<Logo />
				<Form className='form-container rounded-4 container p-4'>
					<FormInput
						label='Nickname:'
						type='text'
						placeholder='Twoja nazwa użytkownika'
					/>
					<FormInput
						label='Email:'
						type='email'
						placeholder='Twój adres email'
					/>
					<FormInput label='Hasło:' type='password' placeholder='Twoje hasło' />
					<FormTextSecondary
						text='Rejestrująć się akceptujesz '
						linkText='warunki użytkowania'
						link='#'
					/>
					<FormSubmitButton text='Zarejestruj się' operation='register' />
					<FormTextSecondary
						text='Masz już konto? - '
						linkText='Zaloguj się!'
						link='#'
					/>
					<SocialMediaList />
				</Form>
				<CopyRight />
			</div>
		</main>
	);
}
