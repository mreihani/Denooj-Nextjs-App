"use client"

import "./../../../app/globals.css";
import RegisterForm from '@/app/forms/auth/register/registerForm';
import {useAppSelector} from "@/redux/store";
import RegisterFormVerify from '@/app/forms/auth/register/registerFormVerify';
import { useDispatch } from "react-redux";
import { AppDispatch } from '@/redux/store';
import { displaySmsVerificationInput } from '@/redux/features/auth/smsCodeInputSlice';
import { setTemporaryUserPhone } from '@/redux/features/auth/temporaryUserPhone';
import { NextPageWithLayout } from '@/pages/_app';
import GuestLayout from "@/app/components/layouts/dashboard/guestLayout";
import { useRouter } from "next/router";
import { Helmet } from "react-helmet";
import { metaConfig } from "@/app/utils/metaConfig";

const Register: NextPageWithLayout = () =>  {
    
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
            <Helmet>
                <title>
                    عضویت
                </title>
                <meta name="description" content={metaConfig.metaDescription} />
                <meta name="keywords" content={metaConfig.metaKeywords} />
                <link rel="icon" type="image/x-icon" href="/assets/img/fave.png" />
            </Helmet>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
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
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        عضویت در دنوج
                    </h2>
                </div>
        
                {!isInputDisplayed && 
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <RegisterForm 
                            dispatch={dispatch} 
                            displaySmsVerificationInput={displaySmsVerificationInput} 
                            setTemporaryUserPhone={setTemporaryUserPhone}
                        />
                    </div>
                }

                {isInputDisplayed && 
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <RegisterFormVerify 
                            router={router} 
                            phone={phone} 
                        />
                    </div>
                }
            </div>
        </>
    )
}
  
Register.getLayout = page => <GuestLayout>{page}</GuestLayout>

export default Register

