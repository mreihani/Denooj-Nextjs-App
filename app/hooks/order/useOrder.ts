import { setMiniCartStatus } from "@/redux/features/shared/openFloatingMiniCart";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import useSWR, { mutate } from "swr";
 
interface OrderParams {
    status: string;
}

// check if user session token exists
async function fetchOrderData(params: OrderParams) {

    const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URI;
    const url = `admin/api/orders?status=${params.status}`;

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

const useOrder = (params: OrderParams) => {
    const {data, error} = useSWR(`order_me?status=${params.status}`, async() => {
        return await fetchOrderData(params);
    });

    return {order : data, error, loading: !data && !error}
}
export default useOrder;


