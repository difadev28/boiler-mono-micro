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
declare const Input: React.FC<InputProps>;
export default Input;
