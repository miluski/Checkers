import "./CustomButton.css";
import React, { MouseEventHandler, ReactElement } from "react";

export default function CustomButton({
  text,
  type,
  variant = "primary",
  className,
  onClick,
  style,
}: {
  text: string | ReactElement;
  type: "submit" | "button" | "reset";
  variant?: "primary" | "secondary" | "success" | "neutral" | "danger";
  className?: string;
  onClick?: MouseEventHandler;
  style?: React.CSSProperties;
}) {
  return (
    <button
      className={
        " text-white fw-bold rounded-3 custom-button-component custom-button-" +
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
