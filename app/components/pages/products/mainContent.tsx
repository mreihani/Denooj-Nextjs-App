import Link from "next/link";
import { useEffect, useState } from "react";
import { Product, PaginatedProduct, PriceTagComponentProps } from '../../../contracts/product/index';
import Pagination from "@/app/components/shared/pagination/products/pagination";
import { useRouter } from "next/router";
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

const MainContent = () => {

    const router = useRouter();
    const { query } = router;

    const [paginatedProduct, setPaginatedProduct] = useState<PaginatedProduct>();

    // get all products from server through api
    async function getProductList(page :number): Promise<PaginatedProduct> {

        const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URI;
        const url = `api/products?page=${page}`;

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
       
        setPaginatedProduct(parsedResponse);

        return parsedResponse;
    }

    useEffect(() => {
        if (query.page) {
            getProductList(Number(query.page));
        } else {
            getProductList(1);
        }
    }, [query.page]);

    const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URI;

    if(paginatedProduct == undefined) {
        return;
    }

    return (
        <>
            <div className="archive_filter animation_set animation_fade_in_up animation_delay_1 animation_start">
                <div className="container">
                    <a className="archive_btn text-decoration-none">
                        <i className="fal fa-sort-amount-desc"></i>
                    </a>
                    <a className="archive_btn text-decoration-none">
                        <i className="fal fa-filter"></i> فیلتر 
                    </a>
                    <div className="archive_search">
                        {/* <input type="text" placeholder="جستجوی محصولات"> */}
                        <i className="fal fa-search"></i>
                    </div>
                    <div className="clear"></div>
                </div>
            </div>
            <div className="product_archive animation_set animation_fade_in_up animation_delay_2 animation_start">
                <div className="container">
                    {paginatedProduct && paginatedProduct.docs.map(product => (
                        <div key={product._id} className="product_item">
                            <div className="product_img">
                                <Link href={`/product/${product.productSlug}`}>
                                    <img 
                                        src={domainUrl +'products/images/'+ product.images.image_275x454}
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
                    {paginatedProduct.docs.length === 0 && (
                        <div className="alert alert-secondary mt-5 mb-5" role="alert">
                            هیچ محصولی یافت نشد!
                        </div>
                    )}
                </div>
            </div>
         
            <Pagination totalPages={paginatedProduct.totalPages} page={paginatedProduct.page} />
        </>
    )
}

export default MainContent;