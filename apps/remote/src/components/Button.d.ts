import React from 'react';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
}
declare const Button: React.FC<ButtonProps>;
export default Button;
