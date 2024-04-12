import "../../../utils/utils.css";
import "../Forms.css";
import { Form } from "react-bootstrap";
import Logo from "../../../components/Logo/Logo.tsx";
import FormInput from "../../../components/FormInput/FormInput.tsx";
import FormTextSecondary from "../../../components/FormTextSecondary/FormTextSecondary.tsx";
import CustomButton from "../../../components/CustomButton/CustomButton.tsx";
import SocialMediaList from "../../../components/SocialMediaList/SocialMediaList.tsx";
import CopyRight from "../../../components/CopyRight/CopyRight.tsx";
import { useNavigate } from "react-router-dom";
import * as formik from "formik";
import * as yup from "yup";

export default function LoginView() {
  const { Formik } = formik;
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/screenAfterLogin");
  };

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Pole jest wymagane")
      .email("Nieprawidłowy adres mailowy"),
    password: yup.string().required("Pole jest wymagane"),
  });

  return (
    <main className="background-theme ">
      <div className="container d-flex flex-column gap-4 gap-lg-5 align-items-center  justify-content-center h-100 ">
        <Logo size={"big"} className={"ms-4"} />

        <Formik
          validationSchema={schema}
          onSubmit={handleLogin}
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
              className="form-container rounded-4 container p-4"
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
              <FormInput
                label="Hasło:"
                type="password"
                placeholder="Twoje hasło"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.password && !!errors.password}
                isValid={touched.password && !errors.password}
                errorMessage={errors.password}
              />
              <FormTextSecondary
                linkText="Zapomniałeś hasła?"
                link="forgotPassword"
                textAlign="text-left"
              />
              <CustomButton
                text="Zaloguj się"
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
        <CopyRight />
      </div>
    </main>
  );
}
