import FixedMenu from "@/app/components/shared/footer/fixedMenu";
import Footer from "@/app/components/shared/footer/footer";
import FooterCopyRight from "@/app/components/shared/footer/footerCopyRight";
import FooterInstagram from "@/app/components/shared/footer/footerInstagram";
import Header from "@/app/components/shared/header/header";
import SideMenu from "@/app/components/shared/side-menu/sideMenu";
import { useRouter } from "next/router";
import CartItems from "@/app/components/shared/cart/cartItems";
import { mutate } from "swr";
import { clearAllCartApi } from "@/app/hooks/cart/clearAllCart";
import useCart from "@/app/hooks/cart/useCart";
import Link from "next/link";
import { Helmet } from "react-helmet";
import { metaConfig } from "@/app/utils/metaConfig";
import { useEffect, useState } from "react";

const MainContent = () => {

    const [loading, setLoading] = useState(false); // State to manage loading

    const changeBtnStatus = () => {
        setLoading(true);
    }

    const handleClearAllCart = async() => {
        await clearAllCartApi();
        await mutate('cart_me'); // Re-fetch cart data
    } 

    const { cart } = useCart();
    let cartItems = cart?.cart;
    
    return (
        <>    
            <div className="container animation_set animation_fade_in animation_start mt-5">
                <div className="float_header mb-5" style={{fontWeight: "600;", fontSize: "14pt;"}}>
                    <div className="row">
                        <div className="col-md-6">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-cart-check-fill" viewBox="0 0 16 16">
                                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708"/>
                            </svg>
                            سبد خرید
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

                <div className="col-md-6 d-flex justify-content-start mb-3">
                    {
                        loading ?
                        <>
                            <button className="text-decoration-none d-flex align-items-center btn btn-dark rounded-pill mt-3 border-0" type="button" disabled>
                                صبر کنید
                                <span className="spinner-grow spinner-grow-sm me-2" role="status" aria-hidden="true"></span>
                            </button>
                        </>
                        :
                        <Link href="/checkout" className="text-decoration-none d-flex align-items-center btn_primary mt-3" onClick={() => changeBtnStatus()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bag-check-fill" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0m-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"/>
                            </svg> 
                            &nbsp;ادامه و تسویه حساب
                        </Link>
                    }
                </div>
            </div>

            {/* <div className="product_scroll">
                <div className="container">
                    <div className="scroll_header animation_set animation_fade_in animation_delay_1 animation_start">
                        <i className="fas fa-wheat scroll_header_icon"></i>
                        <span className="scroll_header_title">محصولات پپیشنهادی</span>
                        <a href="#" className="scroll_left_icon"><i className="fal fa-arrow-left"></i></a>
                    </div>
                    <div className="scroll_holder animation_set animation_fade_in_up animation_delay_2 animation_start">
                        <div className="scroll_scroller" style={{width: "calc(145px * 10);"}}>
                            <div className="product_item">
                                <div className="product_img">
                                    <a href="#">
                                        <img 
                                            src="/assets/img/rice3.png"
                                            alt="rice3"
                                            width={120}
                                            height={120}
                                        />
                                    </a>
                                    <div className="discount_holder">
                                        <span className="item_discount">15%</span>
                                    </div>
                                </div>
                                <div className="product_detail">
                                    <a href="#" className="product_title">طارم هاشمی</a>
                                    <div className="cost_num_holder">
                                        <a className="plus"><span>+</span></a>
                                        <div className="costs">
                                            <span className="cost">60,000 تومان</span>
                                            <span className="cost_off">80,000 تومان</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product_item">
                                <div className="product_img">
                                    <a href="#"><img 
                                            src="/assets/img/rice3.png"
                                            alt="rice3"
                                            width={120}
                                            height={120}
                                        /></a>
                                    <div className="discount_holder">
                                        <span className="item_discount">15%</span>
                                    </div>
                                </div>
                                <div className="product_detail">
                                    <a href="#" className="product_title">طارم هاشمی</a>
                                    <div className="cost_num_holder">
                                        <a className="plus"><span>+</span></a>
                                        <div className="costs">
                                            <span className="cost">60,000 تومان</span>
                                            <span className="cost_off">80,000 تومان</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product_item">
                                <div className="product_img">
                                    <a href="#"><img 
                                            src="/assets/img/rice3.png"
                                            alt="rice3"
                                            width={120}
                                            height={120}
                                        /></a>
                                    <div className="discount_holder">
                                        <span className="item_discount">15%</span>
                                    </div>
                                </div>
                                <div className="product_detail">
                                    <a href="#" className="product_title">طارم هاشمی</a>
                                    <div className="cost_num_holder">
                                        <a className="plus"><span>+</span></a>
                                        <div className="costs">
                                            <span className="cost">60,000 تومان</span>
                                            <span className="cost_off">80,000 تومان</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product_item">
                                <div className="product_img">
                                    <a href="#"><img 
                                            src="/assets/img/rice3.png"
                                            alt="rice3"
                                            width={120}
                                            height={120}
                                        /></a>
                                    <div className="discount_holder">
                                        <span className="item_discount">15%</span>
                                    </div>
                                </div>
                                <div className="product_detail">
                                    <a href="#" className="product_title">طارم هاشمی</a>
                                    <div className="cost_num_holder">
                                        <a className="plus"><span>+</span></a>
                                        <div className="costs">
                                            <span className="cost">60,000 تومان</span>
                                            <span className="cost_off">80,000 تومان</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product_item">
                                <div className="product_img">
                                    <a href="#"><img 
                                            src="/assets/img/rice3.png"
                                            alt="rice3"
                                            width={120}
                                            height={120}
                                        /></a>
                                    <div className="discount_holder">
                                        <span className="item_discount">15%</span>
                                    </div>
                                </div>
                                <div className="product_detail">
                                    <a href="#" className="product_title">طارم هاشمی</a>
                                    <div className="cost_num_holder">
                                        <a className="plus"><span>+</span></a>
                                        <div className="costs">
                                            <span className="cost">60,000 تومان</span>
                                            <span className="cost_off">80,000 تومان</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product_item">
                                <div className="product_img">
                                    <a href="#"><img 
                                            src="/assets/img/rice3.png"
                                            alt="rice3"
                                            width={120}
                                            height={120}
                                        /></a>
                                    <div className="discount_holder">
                                        <span className="item_discount">15%</span>
                                    </div>
                                </div>
                                <div className="product_detail">
                                    <a href="#" className="product_title">طارم هاشمی</a>
                                    <div className="cost_num_holder">
                                        <a className="plus"><span>+</span></a>
                                        <div className="costs">
                                            <span className="cost">60,000 تومان</span>
                                            <span className="cost_off">80,000 تومان</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product_item">
                                <div className="product_img">
                                    <a href="#"><img 
                                            src="/assets/img/rice3.png"
                                            alt="rice3"
                                            width={120}
                                            height={120}
                                        /></a>
                                    <div className="discount_holder">
                                        <span className="item_discount">15%</span>
                                    </div>
                                </div>
                                <div className="product_detail">
                                    <a href="#" className="product_title">طارم هاشمی</a>
                                    <div className="cost_num_holder">
                                        <a className="plus"><span>+</span></a>
                                        <div className="costs">
                                            <span className="cost">60,000 تومان</span>
                                            <span className="cost_off">80,000 تومان</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product_item">
                                <div className="product_img">
                                    <a href="#"><img 
                                            src="/assets/img/rice3.png"
                                            alt="rice3"
                                            width={120}
                                            height={120}
                                        /></a>
                                    <div className="discount_holder">
                                        <span className="item_discount">15%</span>
                                    </div>
                                </div>
                                <div className="product_detail">
                                    <a href="#" className="product_title">طارم هاشمی</a>
                                    <div className="cost_num_holder">
                                        <a className="plus"><span>+</span></a>
                                        <div className="costs">
                                            <span className="cost">60,000 تومان</span>
                                            <span className="cost_off">80,000 تومان</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product_item">
                                <div className="product_img">
                                    <a href="#"><img 
                                            src="/assets/img/rice3.png"
                                            alt="rice3"
                                            width={120}
                                            height={120}
                                        /></a>
                                    <div className="discount_holder">
                                        <span className="item_discount">15%</span>
                                    </div>
                                </div>
                                <div className="product_detail">
                                    <a href="#" className="product_title">طارم هاشمی</a>
                                    <div className="cost_num_holder">
                                        <a className="plus"><span>+</span></a>
                                        <div className="costs">
                                            <span className="cost">60,000 تومان</span>
                                            <span className="cost_off">80,000 تومان</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product_item">
                                <div className="product_img">
                                    <a href="#"><img 
                                            src="/assets/img/rice3.png"
                                            alt="rice3"
                                            width={120}
                                            height={120}
                                        /></a>
                                    <div className="discount_holder">
                                        <span className="item_discount">15%</span>
                                    </div>
                                </div>
                                <div className="product_detail">
                                    <a href="#" className="product_title">طارم هاشمی</a>
                                    <div className="cost_num_holder">
                                        <a className="plus"><span>+</span></a>
                                        <div className="costs">
                                            <span className="cost">60,000 تومان</span>
                                            <span className="cost_off">80,000 تومان</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

        </>
    )
}

const Cart = () => {
    return (
        <>
            <Helmet>
                <title>
                    سبد خرید
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

export default Cart;