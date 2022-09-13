import { Client } from "discord-rpc";
import { config } from "dotenv";
import { YoutubeVideoDetails, videoIdToYoutubeUrl } from "./youtube-video-api.js";

config();

const { DISCORD_CLIENT_ID } = process.env;
const rpc = new Client({ transport: "ipc" });

export async function setActivity(videoData: YoutubeVideoDetails, videoId: string) {
	await rpc.setActivity({
		details: `Listening to ${videoData.title}`,
		buttons: [{ label: "Play on Youtube", url: videoIdToYoutubeUrl(videoId) }],
	});
}

rpc.login({ clientId: DISCORD_CLIENT_ID! });
