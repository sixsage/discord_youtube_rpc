import express, { Express } from "express";
import cors from "cors";
import { config } from "dotenv";
import { setActivity } from "./rpc.js";
import { getVideoDetails } from "./youtube-video-api.js";

config();

const app: Express = express();
const PORT = 3000;

async function youtubePlaylistApi(playlistId: string) {
	const { YOUTUBE_API_KEY } = process.env;
	const defaultUrl: string =
		`https://www.googleapis.com/youtube/v3/playlistItems?` +
		`key=${YOUTUBE_API_KEY}&part=snippet&part=status&maxResults=50&playlistId=${playlistId}`;
	const headers: RequestInit = {
		method: "GET",
	};
	return await (await fetch(defaultUrl, headers)).json();
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.listen(PORT);
app.get("/playlist/:playlistId", async (request, response): Promise<void> => {
	response.send(await youtubePlaylistApi(request.params.playlistId));
});
app.post("/videoInfo", async (request, response): Promise<void> => {
	const { videoId } = request.body;
	setActivity(await getVideoDetails({ reference: videoId, type: "id" }), videoId as string);
	response.status(200).send({ message: "good request" });
});
