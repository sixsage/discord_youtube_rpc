import express, { Express } from 'express';
import cors from 'cors';
import { config } from 'dotenv';

config()

const app: Express = express();
const PORT = 3000;

async function youtubePlaylistApi() {
    const { YOUTUBE_API_KEY } = process.env;
    const defaultUrl: string = `https://www.googleapis.com/youtube/v3/playlistItems?` +
    `key=${YOUTUBE_API_KEY}&part=snippet&maxResults=50&playlistId=PLCnkz7la5RxOzT8OjGQ4Hsa-mnc3gsPyx`;
    const headers: RequestInit = {
        method: 'GET'
    };
    return await (await fetch(defaultUrl, headers)).json();
}

app.use(express.json());
app.use(cors());
app.listen(PORT)
app.get('/', async (request, response): Promise<void> => {
    response.send(await youtubePlaylistApi())
})