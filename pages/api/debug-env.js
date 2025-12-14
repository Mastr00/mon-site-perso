
export default function handler(req, res) {
    res.status(200).json({
        AUTH0_BASE_URL: process.env.AUTH0_BASE_URL,
        AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
        AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
        AUTH0_CLIENT_SECRET_PREFIX: process.env.AUTH0_CLIENT_SECRET ? process.env.AUTH0_CLIENT_SECRET.substring(0, 5) : 'MISSING',
        AUTH0_SECRET_PREFIX: process.env.AUTH0_SECRET ? process.env.AUTH0_SECRET.substring(0, 5) : 'MISSING',
    });
}
