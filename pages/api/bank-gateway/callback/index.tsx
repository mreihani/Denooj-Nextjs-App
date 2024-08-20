import { NextApiRequest, NextApiResponse } from 'next';
const cors = require('cors');
import { useRouter } from 'next/router';

const corsOptions = {
    origin: 'https://denooj.com',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    optionsSuccessStatus: 200,
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const router = useRouter();

    async function sendCbQuery() {
        const values = req.body;
        const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URI;
        const url = `admin/api/payment/callback?Token=${values.Token}&OrderId=${values.OrderId}&status=${values.status}&STraceNo=${values.STraceNo}&Amount=${values.Amount}`;
       
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

    let response = await sendCbQuery();

   
    if(response.status === 0) {
        router.push('/dashboard');
        return;
    } else {
        router.push('/checkout');
        return;
    }
};
