import React from "react";

interface FormInputProps {
  type: string;
  placeholder?: string;
  value?: string;
  name?:string,
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({
  placeholder,
  value,
  name,
  onChange,
  className,
  type,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      className={` outline-none   ${className}`}
    />
  );
};

export default FormInput;
