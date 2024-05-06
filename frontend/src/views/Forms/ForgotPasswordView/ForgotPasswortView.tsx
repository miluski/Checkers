import styles from "../Forms.module.css";
import { Form } from "react-bootstrap";
import Logo from "../../../components/Logo/Logo.tsx";
import CustomFormInput from "../../../components/CustomFormInput/CustomFormInput.tsx";
import CustomButton from "../../../components/Buttons/CustomButton/CustomButton.tsx";
import SocialMediaList from "../../../components/SocialMediaList/SocialMediaList.tsx";
import * as formik from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AlertModal from "../../../components/Modals/AlertModal/AlertModal.tsx";

export default function ForgotPasswordView() {
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
  });

  return (
    <main className={styles.backgroundTheme}>
      <div
        className={`container d-flex flex-column gap-4 gap-lg-5 align-items-center  justify-content-center ${styles.baseContainer}`}
      >
        <Logo className={"ms-4"} />
        <Formik
          validationSchema={schema}
          onSubmit={handleShow}
          validateOnChange={false}
          validateOnBlur={true}
          initialValues={{
            email: "",
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
              <CustomButton
                text="Wyślij"
                type="submit"
                className="w-100 py-3 mb-4 fs-4"
              />
              <div className="d-flex align-items-center justify-content-center mb-3 text-white">
                <hr className="w-50 d-inline-block me-4 border-3 border-white rounded-3" />
                lub
                <hr className="w-50 d-inline-block ms-4 border-3 rounded-3" />
              </div>
              <CustomButton
                text="Zaloguj się"
                type="button"
                onClick={() => navigate("/login")}
                variant="secondary"
                className="w-100 py-3 mb-5 fs-4"
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
            className="bi bi-check-lg"
            viewBox="0 0 16 16"
          >
            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
          </svg>
        }
        title="Udało się"
        text="Na twój adres mailowy przesłany został formularz przypomnienia hasła"
        color="var(--color-green-300)"
        onProceedButtonVariant="success"
        onProceedButtonText="OK"
      />
    </main>
  );
}
