import { UserCheckoutFormInterface } from '@/app/contracts/checkout/index';
import { ErrorMessage, Form, FormikProps, Field } from 'formik';

const InnerUserCheckoutForm = (props: FormikProps<UserCheckoutFormInterface>) => {

    const { loading } :any = props;

    return (
        <Form>
            <> 
                <div className="row mt-5">
                    <div className="col-md-12">
                        <label htmlFor="address">
                            آدرس *
                        </label>
                        <Field type="text" id="address" name="address" className="" />
                        <ErrorMessage name={'address'} className={`text-danger small`} component="div" />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12">
                        <label htmlFor="postalCode">
                            کد پستی *
                        </label>
                        <Field type="text" id="postalCode" name="postalCode" className="" />
                        <ErrorMessage name={'postalCode'} className={`text-danger small`} component="div" />
                    </div>
                </div>
                
                {
                    <>
                        <button 
                            type="submit" 
                            className={`${loading ? 'text-decoration-none d-flex align-items-center btn btn-dark rounded-pill mt-3 border-0' : 'btn_primary mt-3 mb-5 border-0'}`} 
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