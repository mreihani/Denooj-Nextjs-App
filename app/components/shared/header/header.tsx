import useAuth from "@/app/hooks/auth/useAuth";
import { setSidebarStatus } from "@/redux/features/shared/openSidebarSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";

const GuestButton = () => {
    return (
        <>
            <a href="#" className="site_name text-decoration-none">محصولات ارگانیک دنوج شمال</a>
        </>
    );
}

interface AuthButtonProps {
    user: any;
} 

const AuthButton: React.FC<AuthButtonProps> = (props) => {

    const {user} = props;
    
    return (
        <>
            <img 
                className="user_img"
                src="/assets/img/user.png"
                alt="profile"
                width={60}
                height={60}
            />
            <div className="user_detail">
                <div className="user_name_holder">
                    <span className="user_name">
                        {user.firstname}
                        &nbsp;
                        {user.lastname}
                    </span>
                    <span className="user_phone">
                        0{user.phone}
                    </span>
                </div>
                {/* <div className="user_setting">
                    <Link href="/dashboard">
                        <i className="fal fa-cog"></i>
                    </Link>
                    <a href="#">
                        <i className="fal fa-bell-on"></i>
                        <span className="notification">
                            2
                        </span>
                    </a>
                </div> */}
            </div>
        </>
    );
}

const Header = () => {

    const sidebarStatus = useAppSelector((state) => {
        return state.openSidebar.value.isSidebarDisplayed;
    });

    const dispatch = useDispatch<AppDispatch>();
    const handleOpenSidebar = () => {
        dispatch(setSidebarStatus(!sidebarStatus));
    }

    const { user } = useAuth();

    return (
        <>
            <div className="header">
                <div className="container">
                    <div className="menu_holder">
                        <div className="menu animation_set animation_fade_in animation_start">
                            <i className="fal fa-bars header_icon" onClick={handleOpenSidebar}></i>
                            {
                                (user && user.status == 'success') ?
                                <AuthButton user={user.user} /> :
                                <GuestButton />
                            }
                        </div>
                    </div>
                    <Link href="/" className="logo_holder">
                        <img 
                            className="img_logo animation_set animation_fade_in animation_start"
                            src="/assets/img/logo.png"
                            alt="logo"
                            width={50}
                            height={50}
                        />
                    </Link>
                </div>
            </div>
            <div className="header_holder"></div>
        </>
    )
}

export default Header;