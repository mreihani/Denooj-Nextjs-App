import * as yup from "yup";
import {
    withFormik,
} from 'formik';
import { UserProfileFormInterface } from "@/app/contracts/profile";
import InnerUserProfileForm from "@/app/components/pages/dashboard/profileForm/innerUserProfileForm";

interface ProfileFormProps {
    fullName? : string,
    gender? : string,
    email? : string,
    phone? : string,
    setOpenDisplayInput? : any,
    displaySmsInput? : boolean,
    code? : string,
    temporaryPhoneNumber? : string,
    setTemporaryPhoneNumber? : any,
    setDisplaySuccessMessage? : any,
    displaySuccessMessage? : boolean,
}

const LoginFormValidationSchema = yup.object().shape({
    phone: yup.number().notRequired(),
})

const UserProfileForm = withFormik<ProfileFormProps, UserProfileFormInterface>({
    mapPropsToValues: props => ({
        fullName: props.fullName ?? '',
        gender: props.gender ?? '',
        email: props.email ?? '',
        phone: props.phone ?? '',
        setOpenDisplayInput: props.setOpenDisplayInput ?? '',
        displaySmsInput: props.displaySmsInput ?? false,
        code: props.code ?? '',
        temporaryPhoneNumber: props.temporaryPhoneNumber ?? '',
        setTemporaryPhoneNumber: props.setTemporaryPhoneNumber ?? '',
        setDisplaySuccessMessage: props.setDisplaySuccessMessage ?? '',
        displaySuccessMessage: props.displaySuccessMessage ?? '',
    }),
    validationSchema: LoginFormValidationSchema,
    handleSubmit: async(values, { props, setFieldError }) => {

        const {setOpenDisplayInput} = props;
        const {setTemporaryPhoneNumber} = props;
        const {setDisplaySuccessMessage} = props;
        const {displaySuccessMessage} = props;

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
        async function sendUserInfo(values :any) {

            let token = await fetchCsrfToken();

            const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URI;
            const url = "api/profile";

            let fetchPostResponse = await fetch(`${domainUrl}${url}`, {
                method: 'PUT',
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
        if(response.status == 'pending') {
            setOpenDisplayInput(true);
            setTemporaryPhoneNumber(response.phone);
        }

        if(response.status == 'success') {
            // show success message
            setDisplaySuccessMessage(true);
        } else {
            // set errors
            Object.entries(response).forEach(([key,value]) => setFieldError((value as { path: string }).path, (value as { msg: string }).msg));
        }
    }
})(InnerUserProfileForm)

export default UserProfileForm;