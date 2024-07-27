import { getTaggedProduct } from "@/app/hooks/product/taggedProducts";
import { useEffect, useState } from "react";
import {Product, Images, PriceTagComponentProps} from '../../../../contracts/product/index';
import Link from "next/link";
import { addItemToCart } from "@/app/hooks/cart/useCart";

const NoDiscountPriceTag: React.FC<PriceTagComponentProps> = (props) => {

    const {product} = props;
    const productPrice = product.productPrice;
    const { handleOpenMiniCart } = addItemToCart();
   
    return (
        <>
            <div className="cost_num_holder" style={{paddingBottom: "16px"}}>
                <a className="plus text-decoration-none">
                    <a href="javascript: false" onClick={() => handleOpenMiniCart(product._id)} className="text-decoration-none">
                        +
                    </a>
                </a>
                <div className="costs">
                    <span className="cost">{productPrice} تومان</span>
                </div>
            </div>
        </>
    );
}

const WithDiscountPriceTag: React.FC<PriceTagComponentProps> = (props) => {

    const {product} = props;
    const productPrice = product.productPrice;
    const productDiscountedPrice = product.productDiscountedPrice;
    const { handleOpenMiniCart } = addItemToCart();

    return (
        <>
            <div className="cost_num_holder">
                <a className="plus text-decoration-none">
                    <a href="javascript: false" onClick={() => handleOpenMiniCart(product._id)} className="text-decoration-none">
                        +
                    </a>
                </a>
                <div className="costs">
                    <span className="cost">{productDiscountedPrice} تومان</span>
                    <span className="cost_off">{productPrice} تومان</span>
                </div>
            </div>
        </>
    );
}

const NorthProduct = () => {
    
    const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URI;
    const [northProduct, setNorthProduct] = useState<Product[]>([]);

    useEffect(() => {
        const fetchNorthProductData = async () => {
            const northProduct = await getTaggedProduct('northProduct');
            setNorthProduct(northProduct);
        };
        fetchNorthProductData();
    }, []);

    return (
        <>
            <div className="product_scroll">
                <div className="container">
                    <div className="scroll_header">
                        <i className="fas fa-wheat scroll_header_icon"></i>
                        <span className="scroll_header_title">محصولات شمال</span>
                        <a href="#" className="scroll_left_icon"><i className="fal fa-arrow-left"></i></a>
                    </div>
                    <div className="scroll_holder">
                        <div className="scroll_scroller" style={{width: 'calc(145px * 10);'}}>

                            {northProduct && northProduct.map(product => (
                                <div key={product._id} className="product_item">
                                    <div className="product_img">
                                        <Link href={`/product/${product.productSlug}`}>
                                            <img 
                                                src={domainUrl +'admin/products/images/'+ product.images.image_275x454}
                                                alt="rice3"
                                                width={120}
                                                height={120}
                                            />
                                        </Link>
                                        {
                                            (product.productDiscountedPrice != 0 
                                            && product.productDiscountedPrice != "") &&
                                            <div className="discount_holder">
                                                <span className="item_discount">
                                                    {100 - Math.ceil(product.productDiscountedPrice / product.productPrice * 100)}%
                                                </span>
                                            </div>
                                        }
                                    </div>
                                    <div className="product_detail">
                                        <Link href={`/product/${product.productSlug}`} className="product_title text-decoration-none">
                                            {product.productTitle}
                                        </Link>
                                        {
                                            (product.productDiscountedPrice == 0 
                                            || product.productDiscountedPrice == "") ?
                                            <NoDiscountPriceTag product={product} />:
                                            <WithDiscountPriceTag product={product} />
                                        }
                                    </div>
                                </div>
                            ))}
                            
                            {northProduct.length === 0 && (
                                <div className="alert alert-secondary mt-5 mb-5" role="alert">
                                    هیچ محصولی یافت نشد!
                                </div>
                            )}
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default NorthProduct;