import * as yup from "yup";
import {
    withFormik,
} from 'formik';
import { UserCheckoutFormInterface } from "@/app/contracts/checkout";
import InnerUserCheckoutForm from "@/app/components/pages/checkout/innerUserCheckoutForm";

interface CheckoutFormProps {
    fullName? : string,
    gender? : string,
    email? : string,
    phone? : string,
}

const LoginFormValidationSchema = yup.object().shape({
    phone: yup.number().notRequired(),
})

const UserCheckoutForm = withFormik<CheckoutFormProps, UserCheckoutFormInterface>({
    mapPropsToValues: props => ({
        fullName: props.fullName ?? '',
        gender: props.gender ?? '',
        email: props.email ?? '',
        phone: props.phone ?? '',
    }),
    validationSchema: LoginFormValidationSchema,
    handleSubmit: async(values, { props, setFieldError }) => {
        async function fetchCsrfToken() {

            const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URI;
            const url = "admin/api/payment";

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
            const url = "admin/api/payment";

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
      
        // user has asked to chenge the phone number
        if(response[0].SalePaymentRequestResult.Status === 0 && response[0].SalePaymentRequestResult.Token > 0) {
            const token = response.SalePaymentRequestResult.Token;
            window.location.href = `https://pec.shaparak.ir/NewIPG/?token=${token}`;
        }
    }
})(InnerUserCheckoutForm)

export default UserCheckoutForm;