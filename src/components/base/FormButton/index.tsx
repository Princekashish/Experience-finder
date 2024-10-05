import React, { Children } from "react";

interface ButtonProps {
  type?: "submit" | "button";
  label?: string;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode; // Adjust to accept children
  onClick?: () => void; // Add an optional onClick prop
  startIcon?: React.ReactNode; // Add an icon prop
}

const FormButton: React.FC<ButtonProps> = ({
  type,
  label,
  onClick,
  disabled,
  className,
  children,
  startIcon, // Destructure the icon prop
}) => {
  return (
    <div className="flex justify-center items-center ">
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`leading-none ${className}`}
      >
        {startIcon && <span className="mr-2">{startIcon}</span>}
        {label || children}
      </button>
    </div>
  );
};

export default FormButton;
