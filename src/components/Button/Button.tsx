import React from "react";
import "./styles.scss";

export interface Props {
  onClick: () => void;
  label: string;
  type: "productive" | "passive";
  priority: "primary" | "secondary";
  size: "small" | "medium" | "large" | "xlarge";
}

export default function Button({
  onClick,
  label,
  type = "productive",
  priority = "primary",
  size = "small",
}: Props): JSX.Element {
  return (
    <button
      onClick={onClick}
      className={`button ${type}-${priority} button--${size}`}
    >
      {label}
    </button>
  );
}
