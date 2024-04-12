import { Form } from "react-bootstrap";
import "./FormInput.css";
import { useState } from "react";
import "../../utils/utils.css";

export default function FormInput({
  label,
  type,
  placeholder,
  name,
  value,
  onChange,
  onBlur,
  isInvalid,
  isValid,
  errorMessage,
}: {
  label: string;
  type: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: any;
  onBlur: any;
  isInvalid: boolean | undefined;
  isValid: boolean | undefined;
  errorMessage: any;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Form.Group className="mb-4">
      <Form.Label className="text-white fw-bold fs-5">{label}</Form.Label>
      <div className="d-flex align-items-center position-relative ">
        <Form.Control
          className={
            "form-input py-2 " + (type === "password" ? "no-icon" : "")
          }
          type={type === "password" && showPassword ? "text" : type}
          placeholder={placeholder}
          data-bs-theme="dark"
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          isInvalid={isInvalid}
          isValid={isValid}
        />

        {type === "password" && (
          <button
            type="button"
            className="border-0 fs-5 position-absolute end-0 bg-transparent"
            onClick={togglePasswordVisibility}
          >
            <i
              className={
                "bi bi-eye-fill text-white opacity-50 mx-2 opacity-100-hover" +
                (showPassword ? " bi-eye-fill" : " bi-eye-slash-fill")
              }
            ></i>
          </button>
        )}
      </div>
      {isInvalid && (
        <p className="mt-1 mb-0 ms-1 error-message fs-7 fw-bold">
          {errorMessage}
        </p>
      )}
    </Form.Group>
  );
}
