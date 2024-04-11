import { Form } from "react-bootstrap";

export default function FormInput({
  label,
  type,
  placeholder,
}: {
  label: string;
  type: string;
  placeholder: string;
}) {
  return (
    <Form.Group className="mb-4">
      <Form.Label className="text-white fw-bold fs-5">{label}</Form.Label>
      <Form.Control
        className="form-input py-2"
        type={type}
        placeholder={placeholder}
        data-bs-theme="dark"
      />
    </Form.Group>
  );
}
