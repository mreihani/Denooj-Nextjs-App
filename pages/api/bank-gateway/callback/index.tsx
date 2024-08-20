import { NextApiRequest, NextApiResponse } from 'next';
const cors = require('cors');

const corsOptions = {
    origin: 'https://denooj.com',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    optionsSuccessStatus: 200,
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {

    async function fetchCsrfToken() {

        const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URI;
        const url = "admin/api/payment/callback";

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

        // return back token
        return parsedResponse.csrfToken;
    }

    cors(corsOptions)(req, res, async() => {

        async function sendCbQuery() {

            let token = await fetchCsrfToken();
            const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URI;
            // const url = `admin/api/payment/callback?Token=${values.Token}&OrderId=${values.OrderId}&TerminalNo=${values.TerminalNo}&RRN=${values.RRN}&status=${values.status}&HashCardNumber=${values.HashCardNumber}&Amount=${values.Amount}&SwAmount=${values.SwAmount}&STraceNo=${values.STraceNo}&DiscountedProduct=${values.DiscountedProduct}`;
            const url = 'admin/api/payment/callback';

            let fetchPostResponse = await fetch(`${domainUrl}${url}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'xsrf-token': token
                },
                credentials: 'include',
                mode: 'cors',
                body: JSON.stringify(req.body),
            });

            let parsedResponse = await fetchPostResponse.json();

            return parsedResponse;
        }

        let response = await sendCbQuery();

        return res.json(response);

        // if(response.status === -138) {

        // }

    });
};
