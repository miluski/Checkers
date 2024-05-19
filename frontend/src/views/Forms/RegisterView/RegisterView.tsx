import styles from "../Forms.module.css";
import { Form } from "react-bootstrap";
import Logo from "../../../components/Logo/Logo.tsx";
import CustomFormInput from "../../../components/CustomFormInput/CustomFormInput.tsx";
import FormTextSecondary from "../../../components/FormTextSecondary/FormTextSecondary.tsx";
import CustomButton from "../../../components/Buttons/CustomButton/CustomButton.tsx";
import SocialMediaList from "../../../components/SocialMediaList/SocialMediaList.tsx";
import * as formik from "formik";
import * as yup from "yup";
import AlertModal from "../../../components/Modals/AlertModal/AlertModal.tsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "./RegisterUser";

export default function RegisterView() {
  const { Formik } = formik;

  const navigate = useNavigate();

  const [showError, setShowError] = useState(false);
  const handleCloseError = () => setShowError(false);
  const handleShowError = () => {
    setShowError(true);
  };

  const [showSuccess, setShowSuccess] = useState(false);
  const handleCloseSuccess = () => {
    setShowSuccess(false);
    navigate("/screenAfterLogin");
  };
  const handleShowSuccess = () => {
    setShowSuccess(true);
  };

  const schema = yup.object().shape({
    nickname: yup.string().required("Pole jest wymagane"),
    email: yup
      .string()
      .required("Pole jest wymagane")
      .email("Nieprawidłowy adres mailowy"),
    password: yup
      .string()
      .required("Pole jest wymagane")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Hasło musi zawierać:\n" +
          "- Co najmniej 8 znaków\n" +
          "- Przynajmniej jedną dużą literę\n" +
          "- Przynajmniej jedną małą literę\n" +
          "- Przynajmniej jedną cyfrę\n" +
          "- Przynajmniej jeden znak specjalny",
      ),
  });
  return (
    <main className={styles.backgroundTheme}>
      <div
        className={`container d-flex flex-column gap-4 gap-lg-5 align-items-center justify-content-center py-4 ${styles.baseContainer}`}
      >
        <Logo className={"ms-4"} />
        <Formik
          validationSchema={schema}
          onSubmit={(values) =>
            registerUser(values, handleShowError, handleShowSuccess)
          }
          validateOnChange={false}
          validateOnBlur={true}
          initialValues={{
            nickname: "",
            email: "",
            password: "",
          }}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            handleBlur,
            errors,
            touched,
          }) => (
            <Form
              noValidate
              onSubmit={handleSubmit}
              className={`form-container rounded-4  p-4 ${styles.formContainer}`}
            >
              <CustomFormInput
                label="Nickname:"
                type="text"
                placeholder="Twoja nazwa użytkownika"
                name="nickname"
                value={values.nickname}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.nickname! && !!errors.nickname}
                isValid={touched.nickname! && !errors.nickname}
                errorMessage={errors.nickname!}
              />
              <CustomFormInput
                label="Email:"
                type="email"
                placeholder="Twój adres email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.email! && !!errors.email}
                isValid={touched.email! && !errors.email}
                errorMessage={errors.email!}
              />
              <CustomFormInput
                label="Hasło:"
                type="password"
                placeholder="Twoje hasło"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.password! && !!errors.password}
                isValid={touched.password! && !errors.password}
                errorMessage={errors.password!}
              />
              <FormTextSecondary
                text="Rejestrująć się akceptujesz "
                linkText="warunki użytkowania"
                link="#"
              />
              <CustomButton
                text="Zarejestruj się"
                type="submit"
                className="w-100 py-3 mb-4 fs-4"
              />
              <FormTextSecondary
                text="Masz już konto? - "
                linkText="Zaloguj się!"
                link="./login"
              />
              <SocialMediaList />
            </Form>
          )}
        </Formik>
      </div>
      <AlertModal
        show={showError}
        onProceed={handleCloseError}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="currentColor"
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>
        }
        title="Błąd"
        text="Użytkownik o podanym adresie email już jest zarejestrowany"
        color="var(--clr-red-450)"
        onProceedButtonText={"OK"}
      />
      <AlertModal
        show={showSuccess}
        onProceed={handleCloseSuccess}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="currentColor"
            className="bi bi-check-lg"
            viewBox="0 0 16 16"
          >
            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
          </svg>
        }
        title="Udało się!"
        text="Twoje konto zostało zarejestrowane"
        color="var(--color-green-300)"
        onProceedButtonVariant="success"
        onProceedButtonText={"OK"}
      />
    </main>
  );
}
