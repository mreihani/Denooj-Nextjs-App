"use client"

import Input from '@/app/components/shared/form/input';
import { LoginFormVerifyValuesInterface } from '@/app/contracts/auth';
import { Form, FormikProps } from 'formik';
import React from 'react';
import { useEffect, useState } from "react";

const innerLoginFormVerify = (props: FormikProps<LoginFormVerifyValuesInterface>) => {

    const [loading, setLoading] = useState(false); // State to manage loading

    const changeBtnStatus = () => {
        setLoading(true);
    }

    return (
        <Form className="space-y-6">
            <div>
                <Input name='code' type='text' label="کد تأیید" />
            </div>

            <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    تأیید
                </button>
            </div>
        </Form>
    )
}

export default innerLoginFormVerify;