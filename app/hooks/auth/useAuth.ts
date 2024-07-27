import useSWR from "swr";
 
// check if user session token exists
async function fetchUserSessionToken() {

    const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URI;
    const url = "admin/api/auth/token";

    let fetchAuthResponse = await fetch(`${domainUrl}${url}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        mode: 'cors'
    });
    let parsedResponse = await fetchAuthResponse.json();

    // return back token
    return parsedResponse;
}

const useAuth = () => {
    const {data, error} = useSWR('user_me', async() => {
        return await fetchUserSessionToken();
    });

    return {user : data, error, loading: !data && !error}
}

export default useAuth;