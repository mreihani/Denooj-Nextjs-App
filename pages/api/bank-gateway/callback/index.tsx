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
            const url = "admin/api/payment/callback";
            const values = req.body;

            let fetchPostResponse = await fetch(`${domainUrl}${url}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                mode: 'cors',
                body: JSON.stringify(values),
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
