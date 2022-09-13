import { useEffect, useRef } from "react";
import YouTube from "react-youtube";
import { SetStateFunc } from "../global-types";

async function getVideoInfo(e: any, videoId: string) {
	const headers: RequestInit = {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			videoId,
		}),
	};
	const response: Response = await fetch("http://localhost:3000/videoInfo", headers);
}

function Player(props: { songUrls: string[]; setSongUrl: SetStateFunc<string[]> }) {
	const { songUrls, setSongUrl } = props;
	if (!songUrls[0] && songUrls.length) {
	}
	const opts = {
		playerVars: {
			autoplay: 1,
		},
	};

	function handleInitialState() {
		if (songUrls.length === 1) {
			return 0;
		}
		return 1;
	}

	function removeFrontSong(e: any) {
		setSongUrl(songUrls.slice(1));
	}
	return (
		<YouTube
			videoId={songUrls[handleInitialState()]}
			onPlay={(e: any) => {
				getVideoInfo(e, songUrls[handleInitialState()]);
			}}
			onEnd={removeFrontSong}
			opts={opts}
		/>
	);
}

export default Player;
