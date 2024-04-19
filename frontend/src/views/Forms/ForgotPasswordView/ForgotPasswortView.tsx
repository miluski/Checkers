import "../../../utils/utils.css";
import "../Forms.css";
import { Form } from "react-bootstrap";
import Logo from "../../../components/Logo/Logo.tsx";
import FormInput from "../../../components/FormInput/FormInput.tsx";
import CustomButton from "../../../components/Buttons/CustomButton/CustomButton.tsx";
import SocialMediaList from "../../../components/SocialMediaList/SocialMediaList.tsx";
import CopyRight from "../../../components/CopyRight/CopyRight.tsx";
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
    <main className="background-theme ">
      <div className="container d-flex flex-column gap-4 gap-lg-5 align-items-center  justify-content-center h-100">
        <Logo size={"big"} className={"ms-4"} />
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
              className="form-container rounded-4  p-4"
            >
              <FormInput
                label="Email:"
                type="email"
                placeholder="Twój adres email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.email && !!errors.email}
                isValid={touched.email && !errors.email}
                errorMessage={errors.email}
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
                className="w-100 py-3 mb-4 fs-4"
              />
              <SocialMediaList />
            </Form>
          )}
        </Formik>
        <CopyRight />
      </div>
      <AlertModal
        show={show}
        onProceed={handleClose}
        icon="bi-check-lg"
        title="Udało się"
        text="Na twój adres mailowy przesłany został formularz przypomnienia hasła"
        color="var(--color-green-300)"
        onProceedButtonVariant="success"
        onProceedButtonText="OK"
      />
    </main>
  );
}
