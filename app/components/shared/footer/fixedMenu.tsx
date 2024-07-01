import useAuth from "@/app/hooks/auth/useAuth";
import Link from "next/link";
import { useState } from "react";

const GuestButton = () => {
    return (
        <>
            <Link href="/user/auth/login" className="text-decoration-none text-success">
                <i className="fal fa-user"></i>
                <span>ورود / عضویت</span>
            </Link>
        </>
    );
}

const AuthButton = () => {
    return (
        <>
            <a href="/dashboard" className="text-decoration-none text-success">
                <i className="fal fa-dashboard"></i>
                <span>
                    پیشخوان
                </span>
            </a>
        </>
    );
}

const FixedMenu = () => {

    const { user } = useAuth();

    return (
        <>
            <div className="fixed_menu_holder"></div>
            <div className="fixed_menu">
                <Link href="/" className="text-decoration-none text-success">
                    <i className="fal fa-home"></i>
                    <span>صفحه اصلی</span>
                </Link>
                <Link href="/products" className="fixed_menu_selected text-decoration-none text-success">
                    <i className="fas fa-store"></i>
                    <span>
                        فروشگاه 
                    </span>
                </Link>
                <a href="tel: 09309003164" className="text-decoration-none text-success">
                    <i className="fal fa-phone"></i>
                    <span>
                        تماس بگیرید
                    </span>
                </a>
                <a href="/cart" className="text-decoration-none text-success">
                    <i className="fal fa-shopping-cart"></i>
                    <span>سبد خرید</span>
                </a>
                {
                    (user && user.status == 'success') ?
                    <AuthButton /> :
                    <GuestButton />
                }
            </div>
        </>
    )
}

export default FixedMenu;