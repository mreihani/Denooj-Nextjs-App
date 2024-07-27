import FixedMenu from "@/app/components/shared/footer/fixedMenu";
import Footer from "@/app/components/shared/footer/footer";
import FooterCopyRight from "@/app/components/shared/footer/footerCopyRight";
import FooterInstagram from "@/app/components/shared/footer/footerInstagram";
import Header from "@/app/components/shared/header/header";
import SideMenu from "@/app/components/shared/side-menu/sideMenu";
import CartItems from "@/app/components/shared/cart/cartItems";
import { mutate } from "swr";
import { clearAllCartApi } from "@/app/hooks/cart/clearAllCart";
import useCart from "@/app/hooks/cart/useCart";
import { NextPageWithLayout } from "../_app";
import UserCheckoutLayout from "@/app/components/layouts/checkout/userCheckoutLayout";
import Link from "next/link";
import useAuth from "@/app/hooks/auth/useAuth";
import UserCheckoutForm from "@/app/forms/pages/checkout/userCheckoutForm";
import { Helmet } from "react-helmet";
import { metaConfig } from "@/app/utils/metaConfig";

const MainContent = () => {

    const handleClearAllCart = async() => {
        await clearAllCartApi();
        mutate('cart_me'); // Re-fetch cart data
    } 
    const { cart } = useCart();
    let cartItems = cart?.cart;

    let { user } = useAuth();
    let fullName = user?.user?.firstname + " " + user?.user?.lastname;
    let gender = user?.user?.gender;
    let phone = user?.user?.phone;
    let email = user?.user?.emailAddress;
    
    return (
        <>
            <div className="container animation_set animation_fade_in animation_start mt-5" style={{margin: "55px auto"}}>
                <div className="float_header mb-5" style={{fontWeight: "600", fontSize: "14pt"}}>
                    <div className="row">
                        <div className="col-md-6">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-credit-card ms-2" viewBox="0 0 16 16">
                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
                                <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                            </svg>
                            تسویه حساب
                        </div>
                        {
                            (cartItems && Object.keys(cartItems).length > 0 && 
                                (
                                    <div className="col-md-6 text-start">
                                        <a className="text-decoration-none btn btn-sm btn-outline-dark" href="javasript: disabled" onClick={() => handleClearAllCart()}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                            </svg>
                                            خالی کردن سبد خرید
                                        </a>
                                    </div>
                                )
                            )
                        }
                    </div>
                </div>
                <CartItems />

                <div className="row">
                    <div className="col-md-12">
                        <UserCheckoutForm 
                            fullName={fullName} 
                            gender={gender} 
                            phone={phone} 
                            email={email} 
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

const Checkout :NextPageWithLayout = (props) => {
    return (
        <>
            <Helmet>
                <title>
                    تسویه حساب
                </title>
                <meta name="description" content={metaConfig.metaDescription} />
                <meta name="keywords" content={metaConfig.metaKeywords} />
                <link rel="icon" type="image/x-icon" href="/assets/img/fave.png" />
            </Helmet>
            <Header />
            <SideMenu />
            <MainContent />
            <FooterInstagram />
            <Footer />
            <FooterCopyRight />
            <FixedMenu />
        </>
    )
}

Checkout.getLayout = (page) => <UserCheckoutLayout>
    {page}
</UserCheckoutLayout>


export default Checkout;