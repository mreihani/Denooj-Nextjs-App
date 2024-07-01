import { getTaggedProduct } from "@/app/hooks/product/taggedProducts";
import { useEffect, useState } from "react";
import {Product, Images} from '../../../../contracts/product/index';
import Link from "next/link";
import { addItemToCart } from "@/app/hooks/cart/useCart";

const RecommendedProduct = () => {

    const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URI;
    const [recommendedProduct, setRecommendedProduct] = useState<Product | undefined>(undefined);
    const { handleOpenMiniCart } = addItemToCart();

    useEffect(() => {
        const fetchRecommendedProductData = async () => {
            const recommendedProduct = await getTaggedProduct('recommendedProduct');
            setRecommendedProduct(recommendedProduct[0]);
        };
        fetchRecommendedProductData();
    }, []);

    return (
        <>
            <div className="product_sug">
                <div className="sug_holder">
                    <div className="product_img animation_set animation_fade_in_up animation_delay_1 animation_start">
                        {recommendedProduct && (
                            <Link href={`/product/${recommendedProduct.productSlug}`}>
                                <img 
                                    src={`${domainUrl}products/images/${recommendedProduct.images.image_275x454}`}
                                    alt="rice3"
                                    width={200}
                                    height={350}
                                />
                            </Link>
                        )}
                        {recommendedProduct 
                        && recommendedProduct.productDiscountedPrice 
                        && recommendedProduct.productDiscountedPrice != 0
                        && recommendedProduct.productDiscountedPrice != "" &&
                        (
                            <div className="discount_holder">
                                <span className="item_discount">
                                {100 - Math.ceil(recommendedProduct.productDiscountedPrice / recommendedProduct.productPrice * 100)}%
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="product_detail animation_set animation_fade_in_up animation_delay_2 animation_start">
                        <div className="tag">
                            <span>
                                برنج پیشنهادی
                            </span>
                        </div>
                        {recommendedProduct && recommendedProduct.productTitle && (
                            <div className="product_name">
                                {recommendedProduct.productTitle}
                            </div>
                        )}
                        <div className="cost_num_holder">
                            {/* <a className="plus text-decoration-none" >
                                <span>+</span>
                            </a> */}
                            {recommendedProduct && (
                                <div className="cost_num_holder">
                                    <a href="javascript: false" onClick={() => handleOpenMiniCart(recommendedProduct._id)} className="plus text-decoration-none">
                                        +
                                    </a>
                                </div>
                            )}
                            {recommendedProduct && (
                                <div className="mt-2 cost_num_holder">
                                    {
                                        recommendedProduct 
                                        && recommendedProduct.productDiscountedPrice 
                                        && recommendedProduct.productDiscountedPrice != 0
                                        && recommendedProduct.productDiscountedPrice != "" ?
                                        (<div className="costs">
                                            <div className="cost">{recommendedProduct.productDiscountedPrice} تومان</div>
                                            <div className="cost_off">{recommendedProduct.productPrice} تومان</div>
                                        </div>) :
                                        <div className="costs">
                                            <div className="cost">{recommendedProduct.productPrice} تومان</div>
                                        </div>
                                    }
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default RecommendedProduct;