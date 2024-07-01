// get all products from server through api
export const getTaggedProduct = async(type: string) => {

    const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URI;
    const url = `api/products/tagged?type=${type}`;
    
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
   
    return parsedResponse;
}