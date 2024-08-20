import { NextApiRequest, NextApiResponse } from 'next';
const cors = require('cors');

const corsOptions = {
    origin: 'https://denooj.com',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    optionsSuccessStatus: 200,
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    cors(corsOptions)(req, res, async() => {
       
        async function sendCbQuery() {

            const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URI;
            // const url = `admin/api/payment/callback?Token=${values.Token}&OrderId=${values.OrderId}&TerminalNo=${values.TerminalNo}&RRN=${values.RRN}&status=${values.status}&HashCardNumber=${values.HashCardNumber}&Amount=${values.Amount}&SwAmount=${values.SwAmount}&STraceNo=${values.STraceNo}&DiscountedProduct=${values.DiscountedProduct}`;
            const url = 'admin/api/payment/callback';

            let fetchPostResponse = await fetch(`${domainUrl}${url}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                mode: 'cors',
                body: JSON.stringify(req.body),
            });
            let parsedResponse = await fetchPostResponse.json();

            return parsedResponse.csrfToken;
        }

        let response = await sendCbQuery();

        return res.json(response);

        // if(response.status === -138) {

        // }

    });
};
