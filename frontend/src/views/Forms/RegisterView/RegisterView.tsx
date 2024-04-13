import "../../../utils/utils.css";
import "../Forms.css";
import { Form } from "react-bootstrap";
import Logo from "../../../components/Logo/Logo.tsx";
import FormInput from "../../../components/FormInput/FormInput.tsx";
import FormTextSecondary from "../../../components/FormTextSecondary/FormTextSecondary.tsx";
import CustomButton from "../../../components/CustomButton/CustomButton.tsx";
import SocialMediaList from "../../../components/SocialMediaList/SocialMediaList.tsx";
import CopyRight from "../../../components/CopyRight/CopyRight.tsx";
import { RegisterUser } from "./RegisterUser.ts";
import * as formik from "formik";
import * as yup from "yup";

export default function RegisterView() {
  const { Formik } = formik;

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
        "Hasło musi zawierać co najmniej 8 znaków, Jeden Duża Litera, Jedna Mała Litera, Jedna Cyfra, Jeden Znak Specjalny",
      ),
  });
  return (
    <main className="background-theme ">
      <div className="container d-flex flex-column gap-4 gap-lg-5 align-items-center  justify-content-center h-100">
        <Logo size={"big"} className={"ms-4"} />
        <Formik
          validationSchema={schema}
          onSubmit={(values) => RegisterUser(values)}
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
              className="form-container rounded-4  p-4"
            >
              <FormInput
                label="Nickname:"
                type="text"
                placeholder="Twoja nazwa użytkownika"
                name="nickname"
                value={values.nickname}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.nickname && !!errors.nickname}
                isValid={touched.nickname && !errors.nickname}
                errorMessage={errors.nickname}
              />
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
                link="login"
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
