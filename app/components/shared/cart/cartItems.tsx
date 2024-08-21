import { addToCartApi } from "@/app/hooks/cart/addToCartApi";
import { removeFromCartApi } from "@/app/hooks/cart/removeFromCart";
import useCart from "@/app/hooks/cart/useCart";
import Link from "next/link";
import useSWR, { mutate } from "swr";
import { useEffect, useState } from "react";
import { clearFromCartApi } from "@/app/hooks/cart/clearFromCart";


const CartItems = () => {
    const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URI;
    let cartItemHtml;

    const [loading, setLoading] = useState(false); // State to manage loading

    const { cart } = useCart();
    let cartItems = cart?.cart;
    
    if (!cartItems || Object.keys(cartItems).length === 0) {
        cartItemHtml = <div className="alert alert-light" role="alert">
            سبد خرید خالی است!
        </div>;   

        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {cartItemHtml}     
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        cartItemHtml = cartItems.map((value :any, key :any) => (
            <div className="float_content border-bottom" key={key}>
                <div className="cart_row d-flex justify-content-center align-items-stretch">
                    <Link href={`/product/${value[1]['item'].productSlug}`} className="d-flex align-items-center">
                        <img 
                            src={domainUrl +'admin/products/images/'+ value[1]['item'].images.image_275x454}
                            alt="product"
                            style={{height: "50px"}}
                        />
                    </Link>
                    <div className="cart_detail d-md-flex align-items-center justify-content-between">
                        <span className="cart_title">
                            <Link href={`/product/${value[1]['item'].productSlug}`} className="text-decoration-none">
                                {value[1]['item'].productTitle}
                            </Link>
                        </span>
                        
                        { 
                            (value[1]['item'].productDiscountedPrice !== "" && value[1]['item'].productDiscountedPrice !== 0) ?
                            <div className="d-flex justify-content-center align-items-center cost_num_holder mt-0">
                                <span className="cart_count">{value[1]['qty']}</span>
                                <div className="costs">
                                    <div className="cost" style={{fontSize: "12pt"}}>{value[1]['item'].productDiscountedPrice} تومان</div>
                                    <div className="cost_off" style={{fontSize: "12pt"}}>{value[1]['item'].productPrice} تومان</div>
                                </div>
                            </div>
                            :
                            <div className="d-flex">
                                <span className="cart_count">{value[1]['qty']}</span>
                                <span className="cart_cost">{value[1]['item'].productPrice} تومان</span>
                            </div>
                        }
                    </div>
                    <div className="cart_row d-flex justify-content-center flex-column text-center border-bottom-0">
                        <span className="cart_title">
                            <Link href="#" className="text-decoration-none">
                                قیمت جزء
                            </Link>
                        </span>
                        <div style={{width: "150px"}}>
                            {value[1].price}
                            &nbsp;
                            تومان
                        </div>
                    </div>
                    <div className="cart_control d-flex align-items-center justify-content-center flex-wrap">
                        <i onClick={() => handleAddItemToCart(value[1]['item']._id)} className="fal fa-circle-plus green"></i>
                        <i onClick={() => handleRemoveItemToCart(value[1]['item']._id)} className="fal fa-circle-minus green"></i>
                        <i onClick={() => handleClearItemToCart(value[1]['item']._id)} className="fal fa-times-circle red"></i>
                    </div>
                </div>
            </div>
        ));
    }

    const handleAddItemToCart = async(id :string) => {
        setLoading(true); // Set loading to true when adding item to cart
        await addToCartApi(id, 1);
        mutate('cart_me'); // Re-fetch cart data
        setLoading(false); // Set loading back to false after adding item
    }

    const handleRemoveItemToCart = async(id :string) => {
        setLoading(true); // Set loading to true when adding item to cart
        await removeFromCartApi(id, 1);
        mutate('cart_me'); // Re-fetch cart data
        setLoading(false); // Set loading back to false after adding item
    }

    const handleClearItemToCart = async(id :string) => {
        setLoading(true); // Set loading to true when adding item to cart
        await clearFromCartApi(id);
        mutate('cart_me'); // Re-fetch cart data
        setLoading(false); // Set loading back to false after adding item
    }

    // calculate total price
    const calculateTotalPrice = cartItems.reduce((accumulator :any, item :any) => {
        return accumulator += item[1].price;
    }, 0)

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        {loading ? (
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">
                                    در حال بارگذاری...
                                </span>
                            </div>
                        ) : (
                            cartItemHtml
                        )}
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12 d-flex justify-content-end">
                        <h4>
                            جمع کل:
                            &#8202;                               
                            {calculateTotalPrice}
                            &#8202;
                            تومان
                        </h4>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartItems;

