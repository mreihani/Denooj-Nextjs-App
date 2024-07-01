import useAuth from '@/app/hooks/auth/useAuth';
import { displaySmsVerificationInput } from '@/redux/features/auth/smsCodeInputSlice';
import { setTemporaryUserPhone } from '@/redux/features/auth/temporaryUserPhone';
import { setSidebarStatus } from '@/redux/features/shared/openSidebarSlice';
import { AppDispatch, useAppSelector } from '@/redux/store';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const GuestButton = () => {
    return (
        <>
            <Link href="/user/auth/login" className="btn_main text-decoration-none d-flex flex-column align-items-center justify-content-center mt-3 text-white">
                <span>
                    ورود / ثبت نام
                </span>
            </Link>
        </>
    );
}

const AuthButton = () => {

    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const logoutHandler = async () => {
        const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URI;
        const url = "api/auth/logout";

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
        
        if(parsedResponse.status == 'success') {
            dispatch(displaySmsVerificationInput(false));
            dispatch(setTemporaryUserPhone(""));
            router.push('/user/auth/login');
            // return <></>;
        }
    }
    
    return (
        <>
            <Link href="/checkout" className=" text-decoration-none">
                تسویه حساب
            </Link>
            <Link href="/dashboard" className=" text-decoration-none">
                پیشخوان 
            </Link>
            <Link href='#' onClick={logoutHandler} className="text-decoration-none">
                خروج
            </Link>
        </>
    );
}

const SideMenu = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    
    const sidebarStatus = useAppSelector((state) => {
        return state.openSidebar.value.isSidebarDisplayed;
    });

    // toggle sidebar status
    const handleOpenSidebar = () => {
        dispatch(setSidebarStatus(!sidebarStatus));
    }

    // close sidebar when clicked on X button on sidebar
    const handleCloseSidebar = () => {
        dispatch(setSidebarStatus(false));
    }

    
    const { user } = useAuth();

    return (
        <>
            <div id="black" className="black" onClick={handleOpenSidebar} style={{display: sidebarStatus ? 'block' : 'none'}}></div>
            <div id="side_menu" className={`side_menu ${sidebarStatus ? 'sidebar-open' : 'sidebar-closed'}`}>
                <i className="fal fa-times" onClick={handleCloseSidebar}></i>
                <div className="menu d-flex flex-column align-items-center justify-content-center">
                    <Link href="/" className="selected text-decoration-none">
                        صفحه اصلی
                    </Link>
                    <Link href="/products" className="text-decoration-none">
                        فروشگاه
                    </Link>
                    <Link href="/cart" className="text-decoration-none">
                        مشاهده سبد خرید
                    </Link>
                    {
                        (user && user.status == 'success') ?
                        <AuthButton /> :
                        <GuestButton />
                    }
                </div>
            </div>
        </>
    )
}

export default SideMenu;