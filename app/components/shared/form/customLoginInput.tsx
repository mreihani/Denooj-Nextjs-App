import { FC } from "react";
import { Field, ErrorMessage } from 'formik';

interface InputProps {
    name: string,
    label: string,
    type? : string,
    placeholder? : string,
    inputClassNane? : string,
    errorClassName? : string,
}

const CustomLoginInput : FC<InputProps> = ({
    name,
    label,
    placeholder,
    type = 'text',
    inputClassNane,
    errorClassName
}) => {
    return (
        <>
            <Field
                id={name}
                name={name}
                type={type}
                autoComplete={name}
                placeholder={placeholder}
                className={`py-3 px-4 pe-11 block w-full border-gray-200 shadow-sm rounded-e-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none rounded-start-0 ${inputClassNane ?? ''}`}
            />
        </>
    );
}

export default CustomLoginInput;