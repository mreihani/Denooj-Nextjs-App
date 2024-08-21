import Input from '@/app/components/shared/form/input';
import CustomLoginInput from '@/app/components/shared/form/customLoginInput';
import { UserCheckoutFormInterface } from '@/app/contracts/checkout/index';
import { ErrorMessage, Form, FormikProps, Field } from 'formik';
import Link from 'next/link';
import { useEffect, useState } from "react";

const InnerUserCheckoutForm = (props: FormikProps<UserCheckoutFormInterface>) => {

    const { displaySmsInput } :any = props;
    const { displaySuccessMessage } :any = props;

    const [loading, setLoading] = useState(false); // State to manage loading

    const changeBtnStatus = () => {
        setLoading(true);
    }
    
    return (
        <Form>
            <> 
                <div className="row mt-5">
                    <div className="col-md-6">
                        <label htmlFor="fullName">نام و نام خانوادگی</label>
                        <Field disabled={true} type="text" id="fullName" name="fullName" className="bg-light" />

                        <label className="mt-2" htmlFor="gender">جنسیت</label>
                        <Field disabled={true} as="select" id="gender" name="gender" className="bg-light" >
                            <option value="">انتخاب کنید</option>
                            <option value="male">مرد</option>
                            <option value="female">زن</option>
                        </Field>
                        <ErrorMessage name={'gender'} className={`text-danger small`} component="div" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="email">ایمیل</label>
                        <Field disabled={true} type="email" id="email" name="email" className="bg-light" />
                        <ErrorMessage name={'email'} className={`text-danger small`} component="div" />

                        <label className="mt-2" htmlFor="phone">تلفن</label>
                        <div className="input-group d-felx flex-nowrap" dir="ltr">
                            <span className="input-group-text rounded-0 rounded-start" id="basic-addon11">0</span>
                            <Field disabled={true} type="number" id="phone" name="phone" className="bg-light" />
                        </div>
                        <div>
                            <ErrorMessage name={'phone'} className={`text-danger small`} component="div" />
                        </div>
                    </div>
                </div>
                
                {/* {
                    loading ?
                    <>
                        <button className="text-decoration-none d-flex align-items-center btn btn-dark rounded-pill mt-3 border-0" type="button" disabled>
                            صبر کنید
                            <span className="spinner-grow spinner-grow-sm me-2" role="status" aria-hidden="true"></span>
                        </button>
                    </>
                    :
                    <button type="submit" className="btn_primary mt-3 mb-5 border-0"  onClick={() => changeBtnStatus()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-credit-card" viewBox="0 0 16 16">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
                            <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                        </svg>
                        &nbsp;پرداخت
                    </button>
                } */}

                {
                    <>
                        <button 
                            type="submit" 
                            onClick={() => changeBtnStatus()} 
                            className={`${loading ? 'text-decoration-none d-flex align-items-center btn btn-dark rounded-pill mt-3 border-0' : 'btn_primary mt-3 mb-5 border-0'}`} 
                            // disabled={loading} 
                        >
                            {
                                loading ? 
                                (
                                    <>
                                        صبر کنید
                                        <span className="spinner-grow spinner-grow-sm me-2" role="status" aria-hidden="true"></span>
                                    </>
                                )
                                :
                                (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-credit-card" viewBox="0 0 16 16">
                                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
                                            <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                                        </svg>
                                        &nbsp;پرداخت
                                    </>
                                )
                            }
                        </button>
                    </>
                }
                   
            </>  
        </Form>
    )
}

export default InnerUserCheckoutForm;