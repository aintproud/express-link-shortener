import { Router } from 'express';
import {getShortid, isUrl} from './utils.js';
import {createClient} from 'redis';
import {config} from 'dotenv';
config();
const { SERVER_PORT, REDIS_URL } = process.env;

const client = createClient({ url: REDIS_URL })
await client.connect();

export const router = Router();
router.post("/shortId", async (req, res) => {
    const { url } = req.body
    if (!isUrl(url)) {
        res.status(400).end('Invalid URL')
        return
    }
    const shortId = getShortid(url);
    await client.set(shortId, url)
    const shortUrl = `http://localhost:${SERVER_PORT}/${shortId}`
    res.json({ shortUrl })
})
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const originalLink = await client.get(id)
    if (!originalLink){
        res.status(404).end('Link not found')
        return
    }
    res.redirect(originalLink);
})