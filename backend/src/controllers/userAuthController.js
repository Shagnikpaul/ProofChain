import dotenv from 'dotenv';
import supabase from '../utils/supabase.js';
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })
    if (error) {
        return res.status(error.status).json({ "error_message": error.message });
    }
    else {
        return res.status(200).json({ data: data.session })
    }

};


const registerUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    })

    if (error) {
        res.status(error.status).json({ "message": "Error in authentication part could not sign up", "error_message": error.message })
    }
    else {
        res.status(200).json({ "message": "successfully signed up user", data: data.session })
    }

};


const refreshToken = async (req, res) => {
    const { refreshToken } = req.body;
    const { data, error } = await supabase.auth.refreshSession({ refresh_token: refreshToken })
    if (error) {
        res.status(401).json({ error });
    }
    else {
        console.log("Refreshed token successful.");

        res.status(200).json({ data })
    }

}

export { loginUser, registerUser, refreshToken };