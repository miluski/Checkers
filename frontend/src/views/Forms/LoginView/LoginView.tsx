import styles from "../Forms.module.css";
import { Form } from "react-bootstrap";
import Logo from "../../../components/Logo/Logo.tsx";
import CustomFormInput from "../../../components/CustomFormInput/CustomFormInput.tsx";
import FormTextSecondary from "../../../components/FormTextSecondary/FormTextSecondary.tsx";
import CustomButton from "../../../components/Buttons/CustomButton/CustomButton.tsx";
import SocialMediaList from "../../../components/SocialMediaList/SocialMediaList.tsx";
import { LoginUser } from "./LoginUser.ts";
import * as formik from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AlertModal from "../../../components/Modals/AlertModal/AlertModal.tsx";

export default function LoginView() {
  const { Formik } = formik;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Pole jest wymagane")
      .email("Nieprawidłowy adres mailowy"),
    password: yup.string().required("Pole jest wymagane"),
  });

  return (
    <main className={styles.backgroundTheme}>
      <div
        className={`container d-flex flex-column gap-4 gap-lg-5 align-items-center  justify-content-center ${styles.baseContainer}  `}
      >
        <Logo className={"ms-4"} />
        <Formik
          validationSchema={schema}
          onSubmit={(values) => LoginUser(values, navigate, handleShow)}
          validateOnChange={false}
          validateOnBlur={true}
          initialValues={{
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
              className={`rounded-4 container p-4 ${styles.formContainer}`}
            >
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
                linkText="Zapomniałeś hasła?"
                link="forgotPassword"
                textAlign="text-left"
              />
              <CustomButton
                text={"Zaloguj się"}
                type="submit"
                className="w-100 py-3 mb-4 fs-4"
              />
              <FormTextSecondary
                text="Jesteś nowy? - "
                linkText="Zarejestruj się!"
                link="register"
              />
              <SocialMediaList />
            </Form>
          )}
        </Formik>
      </div>
      <AlertModal
        show={show}
        onProceed={handleClose}
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
        text="Wprowadzono nieprawidłowe dane"
        color="var(--clr-red-450)"
        onProceedButtonText="OK"
      />
    </main>
  );
}
