import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    // const sendToken = async () => {
    //     const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URI;
    //     const url = "admin/api/payment/callback";
    //     const values = req;

    //     const response = await fetch(`${domainUrl}${url}`, {
    //         method: 'GET',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         credentials: 'include',
    //         mode: 'cors',
    //         body: JSON.stringify(values),
    //     });

    //     const data = await response.json();
    //     return data.csrfToken;
    // };

    // await sendToken();

    return res.json('hello');
}