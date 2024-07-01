import { FC } from "react";
import { Field, ErrorMessage } from 'formik';

interface InputProps {
    name: string,
    label: string,
    type? : string,
    placeholder? : string,
    inputClassNane? : string,
    errorClassName? : string,
    labelClassName? : string,
}

const Input : FC<InputProps> = ({
    name,
    label,
    placeholder,
    labelClassName,
    type = 'text',
    inputClassNane,
    errorClassName
}) => {
    return (
        <>
            <label htmlFor={name} className={`block text-sm font-medium leading-6 text-gray-900 ${labelClassName ?? ''}`}>
                {label}
            </label>
            <div className="mt-2">
                <Field
                id={name}
                name={name}
                type={type}
                autoComplete={name}
                placeholder={placeholder}
                className={`py-3 px-4 pe-11 block w-full border-gray-200 shadow-sm rounded-e-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none ${inputClassNane ?? ''}`}
                />
                <ErrorMessage name={name} className={`text-red-500 mt-2 text-sm ${errorClassName ?? ''}`} component="div" />
            </div>
        </>
    );
}

export default Input;