import type { NextApiRequest, NextApiResponse } from 'next';
import { store } from '@/provider/redux/store';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const state = store.getState();
        const anonStatus = state.SetStatus.name;
        const anonAge = state.SetAge.name;
        const isVerified = anonStatus === "logged-in" && anonAge !== 0;

        res.status(200).json({ isVerified });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
