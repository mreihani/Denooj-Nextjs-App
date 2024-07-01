import * as yup from "yup";
import {
    withFormik,
} from 'formik';
import { UserProfileVerifySmsFormInterface } from "@/app/contracts/profile";
import InnerUserProfileSmsVerifyForm from "@/app/components/pages/dashboard/profileForm/innerUserProfileSmsVerifyForm";
import { mutate } from "swr";

interface ProfileVerifySmsFormProps {
    setOpenDisplayInput? : any,
    displaySmsInput? : boolean,
    code? : string,
    temporaryPhoneNumber? : string,
    setDisplaySuccessMessage? : any,
    displaySuccessMessage? : boolean,
}

const UserProfileVerifySmsForm = withFormik<ProfileVerifySmsFormProps, UserProfileVerifySmsFormInterface>({
    mapPropsToValues: props => ({
        setOpenDisplayInput: props.setOpenDisplayInput ?? '',
        displaySmsInput: props.displaySmsInput ?? false,
        code: props.code ?? '',
        temporaryPhoneNumber: props.code ?? '',
    }),
    handleSubmit: async(values, { props, setFieldError }) => {

        const {setOpenDisplayInput} = props;
        const {temporaryPhoneNumber} = props;
        const {setDisplaySuccessMessage} = props;

        async function fetchCsrfToken() {

            const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URI;
            const url = "api/profile";

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
        async function sendUserSmsCode(values :any) {

            let token = await fetchCsrfToken();

            const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URI;
            const url = "api/profile/phone-verify";

            let fetchPostResponse = await fetch(`${domainUrl}${url}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'xsrf-token': token
                },
                credentials: 'include',
                mode: 'cors',
                body: JSON.stringify({
                    phone: temporaryPhoneNumber,
                    code: values.code
                }),
            });

            // return back server response
            return await fetchPostResponse.json();
        }

        // send form data along with csrf token
        let response = await sendUserSmsCode(values);

        if(response.status == 'success') {
            // show success message
            setDisplaySuccessMessage(true);
            setOpenDisplayInput(false);
        } else {
            // set errors
            Object.entries(response).forEach(([key,value]) => setFieldError((value as { path: string }).path, (value as { msg: string }).msg));
        }
    }
})(InnerUserProfileSmsVerifyForm)

export default UserProfileVerifySmsForm;