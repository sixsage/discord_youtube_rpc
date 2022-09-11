import { useRef } from "react";
import { SetStateFunc } from "../global-types";

interface VideoInfo {
	snippet: {
		resourceId: {
			videoId: string;
		};
	};
	status: {
		privacyStatus: "public" | "private" | "unlisted";
	};
}

interface PlaylistItems {
	items?: VideoInfo[];
}

function getPlaylistId(playlistUrl: string) {
	if (playlistUrl.includes("list=")) {
		return playlistUrl.split("list=")[1].split("&")[0];
	}
	return "";
}

async function getPlaylistDetails(playlistId: string): Promise<PlaylistItems> {
	const response: Response = await fetch(`http://localhost:3000/playlist/${playlistId}`, { method: "GET" });
	return await response.json();
}

async function getPlaylistData(jsonData: Promise<any>) {
	return await jsonData;
}

function getVideoId(videoUrl: string) {
	if (videoUrl.includes("v=") && videoUrl.includes("&")) {
		return videoUrl.split("v=")[1].split("&")[0];
	}
	return "";
}

async function getIDsFromUrl(inputUrl: string, videos: string[], setVideos: SetStateFunc<string[]>) {
	// check if playlist - if video specified play that video first, if not specified play top video
	const playlistId = getPlaylistId(inputUrl);
	const videoId = getVideoId(inputUrl);
	if (playlistId) {
		const jsonData = await getPlaylistDetails(playlistId);
		if (typeof jsonData.items === undefined) {
			return;
		}
		let videoIds: string[] = jsonData.items!.flatMap((videoInfo: VideoInfo) => {
			return videoInfo.status.privacyStatus !== "public" ? [] : videoInfo.snippet.resourceId.videoId;
		});
		if (videoId) {
			videoIds = videoIds.splice(videoIds.indexOf(videoId)).concat(videoIds);
			console.log(videoIds);
			setVideos(videos.concat(videoIds));
		} else {
			setVideos(videos.concat(videoIds));
		}
	} else {
		setVideos(videos.concat(videoId));
	}
}

function SearchBar(props: { songUrls: string[]; setSongUrl: SetStateFunc<string[]> }) {
	const { songUrls, setSongUrl } = props;
	function updateSongUrl(event: React.KeyboardEvent<HTMLInputElement>): void {
		if (event.key === "Enter") {
			if (!event.currentTarget || event.currentTarget.value.length === 0) {
				return;
			}
			getIDsFromUrl(event.currentTarget.value, songUrls, setSongUrl);
			event.currentTarget.value = "";
		}
	}

	return (
		<div>
			<input type={"search"} onKeyDown={updateSongUrl}></input>
		</div>
	);
}

export default SearchBar;
