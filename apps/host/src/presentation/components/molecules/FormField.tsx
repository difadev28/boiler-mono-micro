import React from 'react';
import Input, { InputProps } from '../atoms/Input';
import Label from '../atoms/Label';

export interface FormFieldProps extends Omit<InputProps, 'id'> {
    label: string;
    id: string;
    error?: string;
    helperText?: string;
}

const FormField: React.FC<FormFieldProps> = ({
    label,
    id,
    error,
    helperText,
    required,
    ...inputProps
}) => {
    return (
        <div className="w-full">
            <Label htmlFor={id} required={required}>
                {label}
            </Label>

            <Input
                id={id}
                error={error}
                required={required}
                {...inputProps}
            />

            {error && (
                <p
                    id={`${id}-error`}
                    className="mt-2 text-sm text-red-600 dark:text-red-400"
                    role="alert"
                >
                    {error}
                </p>
            )}

            {!error && helperText && (
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {helperText}
                </p>
            )}
        </div>
    );
};

export default FormField;
