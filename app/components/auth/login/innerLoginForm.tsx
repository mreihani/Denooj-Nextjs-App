import Input from '@/app/components/shared/form/input';
import CustomLoginInput from '@/app/components/shared/form/customLoginInput';
import { LoginFormValuesInterface } from '@/app/contracts/auth';
import { ErrorMessage, Form, FormikProps } from 'formik';
import Link from 'next/link';

const InnerLoginForm = (props: FormikProps<LoginFormValuesInterface>) => {
    return (
        <Form className="space-y-6">
            <div className="max-w-sm space-y-3" dir='ltr'>
                <label htmlFor={'phone'} className={`block text-sm font-medium leading-6 text-gray-900`} dir='rtl'>
                    {"شماره تلفن"}
                </label>
                <div className="flex">
                    {/* <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                        0
                    </span> */}
                    <CustomLoginInput name='phone' type='number' label="شماره تلفن" placeholder='09101234567' />
                </div>
                <div dir='rtl'>
                    <ErrorMessage name={'phone'} className={`text-red-500 text-sm text-right`} component="div" />
                </div>
            </div>
            <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    ورود
                </button>
            </div>

            <div>
                عضو دنوج نیستید؟ از طریق این
                &nbsp;
                <Link href="/user/auth/register">
                    <u>
                        صفحه 
                    </u>
                </Link>
                &nbsp;
                عضو شوید
            </div>
        </Form>
    )
}

export default InnerLoginForm;