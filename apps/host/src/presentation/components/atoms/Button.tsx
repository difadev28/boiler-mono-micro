import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({
    label,
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    type = 'button',
    ...props
}) => {
    const baseStyles = 'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variantStyles = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
        outline: 'bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    };

    const sizeStyles = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    };

    const disabledStyles = 'opacity-50 cursor-not-allowed';

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabled ? disabledStyles : ''} ${className}`;

    return (
        <button
            type={type}
            disabled={disabled}
            className={combinedClassName}
            {...props}
        >
            {label}
        </button>
    );
};

export default Button;
