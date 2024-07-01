import useCart from "@/app/hooks/cart/useCart";
import Link from "next/link";
import { useEffect, useState } from "react";

const FloatingMiniCart = () => {
    const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URI;
    
    return (
        <>
            <div className="container-fluid fixed-bottom bg-light border-top rounded-top-4">
                <div className="row">
                    <div className="col-md-12">
                    <div className="float_content border-bottom">
                            <div className="cart_row mt-2">
                                <div className="d-flex justify-content-center">
                                    <h4>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-cart-check-fill" viewBox="0 0 16 16">
                                            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708"/>
                                        </svg>
                                        محصول مورد نظر با موفقیت به &nbsp;
                                        <Link className="text-decoration-none" href="/cart">
                                        سبد خرید
                                        </Link>
                                        &nbsp;اضافه گردید
                                    </h4>
                                </div>
                            </div>
                        </div>   
                    </div>
                </div>
            </div>
        </>
    )
}

export default FloatingMiniCart;

