import "./CustomButton.css";

export default function CustomButton({
  text,
  type,
  href,
  variant = "primary",
}: {
  text: string;
  type: "submit" | "button" | "reset";
  href?: string;
  variant?: "primary" | "secondary";
}) {
  return href ? (
    <a href={href} className="button-link">
      <button
        className={
          " text-white w-100 py-3 fs-4 fw-bold mb-4 rounded-3 wp-button-component cc-button-xx-large wp-button-" +
          variant
        }
        type={type}
      >
        {text}
      </button>
    </a>
  ) : (
    <button
      className="text-white w-100 py-3 fs-4 fw-bold mb-4 rounded-3 wp-button-component wp-button-primary cc-button-xx-large"
      type={type}
    >
      {text}
    </button>
  );
}
