import * as yup from "yup";
import { withFormik } from 'formik';
import { UserCheckoutFormInterface } from "@/app/contracts/checkout";
import InnerUserCheckoutForm from "@/app/components/pages/checkout/innerUserCheckoutForm";


interface CheckoutFormProps {
    address? : string,
    postalCode? : string,
    loading?: boolean,
    setLoading?: any,
}

const LoginFormValidationSchema = yup.object().shape({
    address: yup.number().notRequired(),
    postalCode: yup.number().notRequired(),
})

const UserCheckoutForm = withFormik<CheckoutFormProps, UserCheckoutFormInterface>({
    mapPropsToValues: props => ({
        address: props.address ?? '',
        postalCode: props.postalCode ?? '',
        loading: props.loading ?? false,
        setLoading: props.setLoading ?? '',
    }),
    handleSubmit: async(values, { props, setFieldError }) => {

        const { setLoading } = props;
       
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
        if(response?.SalePaymentRequestResult?.Status && response.SalePaymentRequestResult.Status === 0 && response.SalePaymentRequestResult.Token > 0) {

            setLoading(true);

            const token = response.SalePaymentRequestResult.Token;
            window.location.href = `https://pec.shaparak.ir/NewIPG/?token=${token}`;
        } else {
            // set errors
            Object.entries(response).forEach(([key,value]) => setFieldError((value as { path: string }).path, (value as { msg: string }).msg));
        }
    }
})(InnerUserCheckoutForm)

export default UserCheckoutForm;