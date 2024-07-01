import Input from '@/app/components/shared/form/input';
import CustomLoginInput from '@/app/components/shared/form/customLoginInput';
import { UserProfileVerifySmsFormInterface } from '@/app/contracts/profile/index';
import { ErrorMessage, Form, FormikProps, Field } from 'formik';
import Link from 'next/link';


const InnerUserProfileSmsVerifyForm = (props: FormikProps<UserProfileVerifySmsFormInterface>) => {

    const { displaySmsInput } :any = props;

    return (
        <Form>
            <> 
                <div className="row">
                    <div className="col-md-6">
                        <label htmlFor="code">
                            کد تأیید پیامک شده را وارد نمایید
                        </label>
                        <Field type="code" id="code" name="code" />
                        <ErrorMessage name={'code'} className={`text-danger small`} component="div" />
                    </div>
                </div>

                <button type="submit" className="btn_primary mt-3 border-0">
                    <i className="fas fa-save"></i>
                    تأیید
                </button>
            </>  
        </Form>
    )
}

export default InnerUserProfileSmsVerifyForm;