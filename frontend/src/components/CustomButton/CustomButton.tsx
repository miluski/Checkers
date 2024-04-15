import "./CustomButton.css";
import React from "react";

export default function CustomButton({
  text,
  type,
  variant = "primary",
  className,
  onClick,
  style,
}: {
  text: string;
  type: "submit" | "button" | "reset";
  variant?: "primary" | "secondary" | "success" | "neutral";
  className?: string;
  onClick?: any;
  style?: React.CSSProperties;
}) {
  return (
    <button
      className={
        " text-white fw-bold rounded-3 wp-button-component wp-button-" +
        variant +
        " " +
        className
      }
      style={style}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
