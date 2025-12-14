import React from "react";

export interface InputProps {
  type?: "text" | "email" | "password" | "number";
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  label,
  error,
  disabled = false,
  className = "",
}) => {
  const baseStyles = "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors";
  const errorStyles = error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500";
  const disabledStyles = disabled ? "bg-gray-100 cursor-not-allowed" : "";

  const inputClasses = `${baseStyles} ${errorStyles} ${disabledStyles} ${className}`;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={inputClasses}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;