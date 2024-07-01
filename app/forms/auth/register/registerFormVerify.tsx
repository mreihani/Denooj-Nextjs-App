"use client"

import { withFormik } from 'formik';
import * as yup from "yup";
import { RegisterFormVerifyValuesInterface } from '@/app/contracts/auth';
import InnerRegisterFormVerify from '@/app/components/auth/register/innerRegisterFormVerify';

interface RegisterFormProps {
    code? : string,
    csrfTokenState? : string,
    phone? : string,
    router? : any,
}

const RegisterFormValidationSchema = yup.object().shape({
    code: yup.string().notRequired(),
});

const RegisterFormVerify = withFormik<RegisterFormProps, RegisterFormVerifyValuesInterface>({
    mapPropsToValues: props => ({
        code: props.code ?? '',
        phone: props.phone ?? '',
        router: props.router ?? '',
    }),
    validationSchema: RegisterFormValidationSchema,
    handleSubmit: async(values, { props, setFieldError }) => {

        const { phone } = props;
        const { router } = props;

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
        async function verifyUserSmsCode(values :any) {

            let token = await fetchCsrfToken();

            const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URI;
            const url = "api/auth/register/verify";
          
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
        let response = await verifyUserSmsCode({
            code: values.code,
            phone: phone
        });
     
        if(response.status == 'success') {
            router.push('/dashboard');
            // return <></>;
        } else {
            // set errors
            Object.entries(response).forEach(([key,value]) => setFieldError((value as { path: string }).path, (value as { msg: string }).msg));
        }
    }
})(InnerRegisterFormVerify)

export default RegisterFormVerify;