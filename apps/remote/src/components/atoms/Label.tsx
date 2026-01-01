import React from 'react';

export interface LabelProps {
    htmlFor?: string;
    children: React.ReactNode;
    required?: boolean;
    className?: string;
}

const Label: React.FC<LabelProps> = ({
    htmlFor,
    children,
    required = false,
    className = '',
}) => {
    const baseStyles = `
    block text-sm font-medium mb-2
    text-gray-700 dark:text-gray-300
  `;

    return (
        <label htmlFor={htmlFor} className={`${baseStyles} ${className}`}>
            {children}
            {required && <span className="text-red-500 ml-1">*</span>}
        </label>
    );
};

export default Label;
