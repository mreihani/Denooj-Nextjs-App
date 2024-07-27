export const addToCartApi = async(id :string, quantity :number) => {
    const fetchCsrfToken = async () => {
        const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URI;
        const url = "admin/api/cart";

        const response = await fetch(`${domainUrl}${url}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            mode: 'cors'
        });

        const data = await response.json();
        return data.csrfToken;
    };

    const addSingleProductToCart :any = async (values: any) => {
        const token = await fetchCsrfToken();
        const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URI;
        const url = "admin/api/cart/add";

        const response = await fetch(`${domainUrl}${url}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'xsrf-token': token
            },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify(values),
        });

        return await response.json();
    };

    await addSingleProductToCart({ id, quantity });
}