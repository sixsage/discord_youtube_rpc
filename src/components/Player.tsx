import { useEffect, useRef } from "react";
import YouTube from "react-youtube";
import { SetStateFunc } from "../global-types";

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
		console.log(e.data);
		console.log(e.target.getVolume());
		setSongUrl(songUrls.slice(1));
		console.log(songUrls);
	}
	console.log(songUrls);
	return <YouTube videoId={songUrls[handleInitialState()]} onEnd={removeFrontSong} opts={opts} />;
}

export default Player;
