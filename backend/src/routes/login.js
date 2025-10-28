import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router(); 

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY; 

router.post('/login', async (req, res) => {
    
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    // 2. Define the Supabase /token endpoint URL
    const tokenUrl = `${SUPABASE_URL}/auth/v1/token?grant_type=password`;

    try {
        // 3. Forward the credentials to Supabase Auth
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

        // 4. Supabase successfully signed the user in.
        // Respond with the full data (access_token, refresh_token, user, etc.)
        res.status(200).json(supabaseResponse.data);

    } catch (error) {
        // 5. Handle errors (e.g., incorrect password, user not found)
        const status = error.response?.status || 500;
        const msg = error.response?.data?.msg || 'Internal Server Error';

        // Translate Supabase 400 (Bad Request) for invalid credentials into 401 (Unauthorized)
        if (status === 400) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        
        res.status(status).json({ error: msg });
    }
});

export default router;