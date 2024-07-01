export const clearAllCartApi = async() => {
    const fetchCsrfToken = async () => {
        const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URI;
        const url = "api/cart";

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

    const clearAllCart :any = async (values: any) => {
        const token = await fetchCsrfToken();
        const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URI;
        const url = "api/cart";

        const response = await fetch(`${domainUrl}${url}`, {
            method: 'DELETE',
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

    await clearAllCart();
}