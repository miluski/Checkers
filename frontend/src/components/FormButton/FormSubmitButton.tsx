import { Button } from "react-bootstrap";
import "./FormSubmitButton.css";

export default function FormSubmitButton({ text }: { text: string }) {
  return (
    <Button
      className="w-100 py-3 fs-4 fw-bold mb-4 rounded-3 wp-button-component wp-button-primary cc-button-xx-large "
      type="submit"
    >
      {text}
    </Button>
  );
}
