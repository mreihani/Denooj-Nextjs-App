"use client"

import { withFormik } from 'formik';
import * as yup from "yup";
import InnerRegisterForm from '@/app/components/auth/register/innerRegisterForm';
import { RegisterFormValuesInterface } from '@/app/contracts/auth';

interface RegisterFormProps {
    firstname? : string,
    lastname? : string,
    phone? : string,
    csrfTokenState? : string,
    dispatch? : any,
    displaySmsVerificationInput? : any,
    setTemporaryUserPhone? : any,
}

const RegisterFormValidationSchema = yup.object().shape({
    firstname: yup.string().notRequired(),
    lastname: yup.string().notRequired(),
    phone: yup.number().notRequired(),
});

const RegisterForm = withFormik<RegisterFormProps, RegisterFormValuesInterface>({
    mapPropsToValues: props => ({
        firstname: props.firstname ?? '',
        lastname: props.lastname ?? '',
        phone: props.phone ?? '',
        dispatch: props.dispatch ?? '',
        displaySmsVerificationInput: props.displaySmsVerificationInput ?? '',
        setTemporaryUserPhone: props.setTemporaryUserPhone ?? '',
    }),
    validationSchema: RegisterFormValidationSchema,
   
    handleSubmit: async(values, { props, setFieldError }) => {
        
        const { displaySmsVerificationInput } = props;
        const { setTemporaryUserPhone } = props;
        const { dispatch } = props;

        // get csrf from server
        async function fetchCsrfToken() {

            const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URI;
            const url = "api/auth/register";

            let fetchPostResponse = await fetch(`${domainUrl}${url}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                mode: 'cors'
            });
            let parsedResponse = await fetchPostResponse.json();

            // return back token
            return parsedResponse.csrfToken;
        }

        // post data along with the csrf to the server
        async function sendUserInfo(values :any) {

            let token = await fetchCsrfToken();
            
            const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URI;
            const url = "api/auth/register";

            let fetchPostResponse = await fetch(`${domainUrl}${url}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'xsrf-token': token
                },
                credentials: 'include',
                mode: 'cors',
                body: JSON.stringify(values),
            });

            // return back server response
            return await fetchPostResponse.json();
        }

        // send form data along with csrf token
        let response = await sendUserInfo(values);
        
        if(response.status == 'success') {
            dispatch(displaySmsVerificationInput(true));
            dispatch(setTemporaryUserPhone(response.phone));
        } else {
            // set errors
            Object.entries(response).forEach(([key,value]) => setFieldError((value as { path: string }).path, (value as { msg: string }).msg));
        }
    }
})(InnerRegisterForm)

export default RegisterForm;