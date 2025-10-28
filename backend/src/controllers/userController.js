import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const tokenUrl = `${SUPABASE_URL}/auth/v1/token?grant_type=password`;

    try {
        const supabaseResponse = await axios.post(
            tokenUrl,
            { email, password },
            {
                headers: {
                    'apikey': SUPABASE_ANON_KEY,
                    'Content-Type': 'application/json',
                },
            }
        );

        res.status(200).json(supabaseResponse.data);

    } catch (error) {
        const status = error.response?.status || 500;
        const msg = error.response?.data?.msg || 'Internal Server Error';

        if (status === 400) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        res.status(status).json({ error: msg });
    }
};


const registerUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const signupUrl = `${SUPABASE_URL}/auth/v1/signup`;

    try {
        // Send signup request to Supabase
        const supabaseResponse = await axios.post(
            signupUrl,
            { email, password },
            {
                headers: {
                    'apikey': SUPABASE_ANON_KEY,
                    'Content-Type': 'application/json',
                },
            }
        );

        // Return Supabase’s response (which includes the access token)
        res.status(200).json(supabaseResponse.data);

    } catch (error) {
        const status = error.response?.status || 500;
        const msg = error.response?.data?.msg || error.response?.data?.error_description || 'Internal Server Error';

        if (status === 400) {
            return res.status(400).json({ error: msg });
        }

        res.status(status).json({ error: msg });
    }
};

export { loginUser, registerUser };