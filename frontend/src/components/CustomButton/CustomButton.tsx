import "./CustomButton.css";

export default function CustomButton({
  text,
  type,
  variant = "primary",
  className,
  onClick,
}: {
  text: string;
  type: "submit" | "button" | "reset";
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: any;
}) {
  return (
    <button
      className={
        " text-white fw-bold rounded-3 wp-button-component wp-button-" +
        variant +
        " " +
        className
      }
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
