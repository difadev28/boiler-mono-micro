import React from 'react';
export interface LabelProps {
    htmlFor?: string;
    children: React.ReactNode;
    required?: boolean;
    className?: string;
}
declare const Label: React.FC<LabelProps>;
export default Label;
