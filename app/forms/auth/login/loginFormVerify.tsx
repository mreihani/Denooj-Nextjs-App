"use client"

import { withFormik } from 'formik';
import * as yup from "yup";
import { LoginFormVerifyValuesInterface } from '@/app/contracts/auth';
import InnerLoginFormVerify from '@/app/components/auth/login/innerLoginFormVerify';

interface LoginFormProps {
    code? : string,
    csrfTokenState? : string,
    phone? : string,
    router? : any,
}

const LoginFormValidationSchema = yup.object().shape({
    code: yup.string().notRequired(),
});

const LoginFormVerify = withFormik<LoginFormProps, LoginFormVerifyValuesInterface>({
    mapPropsToValues: props => ({
        code: props.code ?? '',
        phone: props.phone ?? '',
        router: props.router ?? '',
    }),
    validationSchema: LoginFormValidationSchema,
    handleSubmit: async(values, { props, setFieldError }) => {
        
        const { phone } = props;
        const { router } = props;

        // get csrf from server
        async function fetchCsrfToken() {

            const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URI;
            const url = "admin/api/auth/login";

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
            const url = "admin/api/auth/login/verify";
            
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
            Object.entries(response).forEach(([key,value]) => setFieldError((value as { path: string }).path, (value as { msg: string }).msg));
        }
    }
})(InnerLoginFormVerify)

export default LoginFormVerify;