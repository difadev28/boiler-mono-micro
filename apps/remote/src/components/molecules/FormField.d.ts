import React from 'react';
import { InputProps } from '../atoms/Input';
export interface FormFieldProps extends Omit<InputProps, 'id'> {
    label: string;
    id: string;
    error?: string;
    helperText?: string;
}
declare const FormField: React.FC<FormFieldProps>;
export default FormField;
