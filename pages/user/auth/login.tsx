import "./../../../app/globals.css";
import LoginForm from '@/app/forms/auth/login/loginForm';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { displaySmsVerificationInput } from '@/redux/features/auth/smsCodeInputSlice';
import { setTemporaryUserPhone } from '@/redux/features/auth/temporaryUserPhone';
import LoginFormVerify from '@/app/forms/auth/login/loginFormVerify';
import { NextPageWithLayout } from '@/pages/_app';
import GuestLayout from "@/app/components/layouts/dashboard/guestLayout";
import { useRouter } from "next/router";

const Login: NextPageWithLayout = () =>  {

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const isInputDisplayed = useAppSelector((state) => {
        return state.smsCodeInput.value.isInputDisplayed
    });

    const phone = useAppSelector((state) => {
        return state.temporaryUserPhone.value.phone;
    });

    return (
        <>
            <div className="flex flex-1 flex-col justify-center px-6 lg:px-8 h-screen" style={{marginTop: "-100px;"}}>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img 
                        className="mx-auto w-auto"
                        src="/assets/img/logo_85.png"
                        alt="denooj"
                        height={85}
                        width={85}
                        style={{width: "85px;", height:"85px;"}}
                    />
                </div>
                <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    ورود
                </h2>
                {!isInputDisplayed && 
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <LoginForm 
                            dispatch={dispatch} 
                            displaySmsVerificationInput={displaySmsVerificationInput} 
                            setTemporaryUserPhone={setTemporaryUserPhone}
                        />
                    </div>
                }

                {isInputDisplayed && 
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <LoginFormVerify 
                            router={router} 
                            phone={phone} 
                        />
                    </div>
                }
            </div>
        </>
    )
}
  
Login.getLayout = page => <GuestLayout>{page}</GuestLayout>

export default Login

