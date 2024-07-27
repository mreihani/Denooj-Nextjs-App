import { addItemToCart } from '@/app/hooks/cart/useCart';
import { useProduct } from '@/app/hooks/product/useProduct';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const MainContent = () => {
    const { product, categoryHierarchyArray } = useProduct();
    const { handleOpenMiniCart } = addItemToCart();
    const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URI;

    return (
        <>
            <div className="product_holder">
                <div className="sug_holder">
                    <div className="product_img animation_set animation_fade_in_up animation_delay_1 animation_start">
                        <a href="#">
                            {product && (
                                <img 
                                    src={`${domainUrl}admin/products/images/${product.images.image_275x454}`}
                                    alt="rice3"
                                    width={200}
                                    height={350}
                                />
                            )}
                        </a>
                        {product 
                        && product.productDiscountedPrice 
                        && product.productDiscountedPrice != 0
                        && product.productDiscountedPrice != "" &&
                        (
                            <div className="discount_holder">
                                <span className="item_discount">
                                    {100 - Math.ceil(product.productDiscountedPrice / product.productPrice * 100)}%
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="product_detail animation_set animation_fade_in_up animation_delay_2 animation_start">
                        <div className="address">
                            {categoryHierarchyArray && categoryHierarchyArray.map((value, key) => (
                                <a key={key} href="#" className='text-decoration-none'>
                                    {value.categoryTitle}
                                    {key !== categoryHierarchyArray.length - 1 && ' /'}
                                </a>
                            ))}
                        </div>
                        {product && product.productTitle && (
                            <h1 className="product_title">{product.productTitle}</h1>
                        )}
                        {product && product.productWeight && (
                            <div className="product_type">
                                <a className="archive_btn btn_selected text-decoration-none">
                                    {product.productWeight} &nbsp;کیلوگرم
                                </a>
                            </div>
                        )}
                        {product && (
                            <div className="mt-2 cost_num_holder">
                                {
                                    product 
                                    && product.productDiscountedPrice 
                                    && product.productDiscountedPrice != 0
                                    && product.productDiscountedPrice != "" ?
                                    (<div className="costs">
                                        <div className="cost">{product.productDiscountedPrice} تومان</div>
                                        <div className="cost_off">{product.productPrice} تومان</div>
                                    </div>) :
                                    <div className="costs">
                                        <div className="cost">{product.productPrice} تومان</div>
                                    </div>
                                }
                            </div>
                        )}
                        {product && (
                            <div className="cost_num_holder">
                                افزودن به سبد خرید
                                <a href="javascript: false" onClick={() => handleOpenMiniCart(product._id)} className="plus text-decoration-none">
                                    +
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {product && product.shortDesc && (
                <div className="blog_holder animation_set animation_fade_in_up animation_delay_3 animation_start">
                    <h2 className="blog_title">جزییات محصول</h2>
                    <div className="blog_content">
                        <ReactQuill value={JSON.parse(product.shortDesc)} readOnly={true} theme={"bubble"} />
                    </div>
                </div>
            )}
            {product && product.longDesc && (
                <div className="blog_holder animation_set animation_fade_in_up animation_delay_3 animation_start">
                    <h2 className="blog_title">توضیحات بیشتر</h2>
                    <div className="blog_content">
                        <ReactQuill value={JSON.parse(product.longDesc)} readOnly={true} theme={"bubble"} />
                    </div>
                </div>
            )}
        </>
    );
};

export default MainContent;