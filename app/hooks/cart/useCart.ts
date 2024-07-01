import { setMiniCartStatus } from "@/redux/features/shared/openFloatingMiniCart";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import useSWR, { mutate } from "swr";
import { addToCartApi } from '@/app/hooks/cart/addToCartApi';
 
// check if user session token exists
async function fetchCartData() {

    const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URI;
    const url = "api/cart";

    let fetchCartResponse = await fetch(`${domainUrl}${url}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        mode: 'cors'
    });
    let parsedResponse = await fetchCartResponse.json();

    // return back token
    return parsedResponse;
}

const useCart = () => {
    const {data, error} = useSWR('cart_me', async() => {
        return await fetchCartData();
    });

    return {cart : data, error, loading: !data && !error}
}
export default useCart;

// add item to cart and refetch cart data
export const addItemToCart = () => {
    const dispatch = useDispatch<AppDispatch>();

    const handleOpenMiniCart = async (id: string) => {
        // display floading mini cart
        dispatch(setMiniCartStatus(true));

        // add item to cart through api
        await addToCartApi(id, 1);

        mutate('cart_me'); // Re-fetch cart data
    };

    return { handleOpenMiniCart };
};


