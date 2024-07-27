import { withFormik } from 'formik';
import * as yup from "yup";
import { LoginFormValuesInterface } from '@/app/contracts/auth';
import InnerLoginForm from '@/app/components/auth/login/innerLoginForm';

interface LoginFormProps {
    phone? : string,
    csrfTokenState? : string,
    dispatch? : any,
    displaySmsVerificationInput? : any,
    setTemporaryUserPhone? : any,
}

const LoginFormValidationSchema = yup.object().shape({
    phone: yup.number().notRequired(),
})

const LoginForm = withFormik<LoginFormProps, LoginFormValuesInterface>({
    mapPropsToValues: props => ({
        phone: props.phone ?? '',
        dispatch: props.dispatch ?? '',
        displaySmsVerificationInput: props.displaySmsVerificationInput ?? '',
        setTemporaryUserPhone: props.setTemporaryUserPhone ?? '',
    }),
    validationSchema: LoginFormValidationSchema,
    handleSubmit: async(values, { props, setFieldError }) => {
        
        const { displaySmsVerificationInput } = props;
        const { setTemporaryUserPhone } = props;
        const { dispatch } = props;
        
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
        async function sendUserInfo(values :any) {

            let token = await fetchCsrfToken();

            const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URI;
            const url = "admin/api/auth/login";

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
})(InnerLoginForm)

export default LoginForm;