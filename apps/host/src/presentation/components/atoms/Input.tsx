import React from 'react';

export interface InputProps {
    type?: 'text' | 'email' | 'password';
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    onBlur?: () => void;
    error?: string;
    disabled?: boolean;
    name?: string;
    id?: string;
    autoComplete?: string;
    required?: boolean;
}

const Input: React.FC<InputProps> = ({
    type = 'text',
    placeholder,
    value,
    onChange,
    onBlur,
    error,
    disabled = false,
    name,
    id,
    autoComplete,
    required = false,
}) => {
    const baseStyles = `
    w-full px-4 py-3 rounded-lg border transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

    const themeStyles = `
    bg-white dark:bg-gray-800
    text-gray-900 dark:text-gray-100
    placeholder-gray-400 dark:placeholder-gray-500
  `;

    const borderStyles = error
        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
        : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500';

    return (
        <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete={autoComplete}
            required={required}
            className={`${baseStyles} ${themeStyles} ${borderStyles}`}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
        />
    );
};

export default Input;
