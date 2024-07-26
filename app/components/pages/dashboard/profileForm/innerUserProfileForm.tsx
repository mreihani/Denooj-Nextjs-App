import Input from '@/app/components/shared/form/input';
import CustomLoginInput from '@/app/components/shared/form/customLoginInput';
import { UserProfileFormInterface } from '@/app/contracts/profile/index';
import { ErrorMessage, Form, FormikProps, Field } from 'formik';
import Link from 'next/link';

const InnerUserProfileForm = (props: FormikProps<UserProfileFormInterface>) => {

    const { displaySmsInput } :any = props;
    const { displaySuccessMessage } :any = props;
    
    return (
        <Form>
            <> 
                <div className="row">

                    {
                        displaySuccessMessage && (
                            <div className="col-md-12">
                                <div className="alert alert-success alert-dismissible fade show" role="alert">
                                    <span className='ms-1'>  
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                            <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
                                        </svg>
                                    </span>
                                    اطلاعات با موفقیت ذخیره گردید
                                </div>                                
                            </div>
                        )
                    }

                    <div className="col-md-6">
                        <label htmlFor="fullName">نام و نام خانوادگی</label>
                        <Field disabled={true} type="text" id="fullName" name="fullName" className="bg-light" />

                        <label className="mt-2" htmlFor="gender">جنسیت</label>
                        <Field as="select" id="gender" name="gender" >
                            <option value="">انتخاب کنید</option>
                            <option value="male">مرد</option>
                            <option value="female">زن</option>
                        </Field>
                        <ErrorMessage name={'gender'} className={`text-danger small`} component="div" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="email">ایمیل</label>
                        <Field type="email" id="email" name="email" />
                        <ErrorMessage name={'email'} className={`text-danger small`} component="div" />

                        <label className="mt-2" htmlFor="phone">تلفن</label>
                        <div className="input-group d-felx flex-nowrap" dir="ltr">
                            {/* <span className="input-group-text rounded-0 rounded-start" id="basic-addon11">0</span> */}
                            <Field type="number" id="phone" name="phone" />
                        </div>
                        <div>
                            <ErrorMessage name={'phone'} className={`text-danger small`} component="div" />
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn_primary mt-3 border-0">
                    <i className="fas fa-save"></i>
                    ذخیره
                </button>
            </>  
        </Form>
    )
}

export default InnerUserProfileForm;