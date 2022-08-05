import { useEffect, useRef, useState } from "react";
import SearchBar from "./SearchBar";
import YoutubePlayer from "./YoutubePlayer";

export interface Ref {
	changeHeaderContent: (songUrl: string) => void;
}

function App() {
	const [songUrl, setSongUrl] = useState("");
	const youtubePlayerRef = useRef<Ref>(null);

	useEffect(() => {
		if (!youtubePlayerRef.current) { return; }
		youtubePlayerRef.current.changeHeaderContent(songUrl);
	});

	return <div>
		<SearchBar setSongUrl={setSongUrl} />
		<YoutubePlayer ref={youtubePlayerRef} />
	</div> 
}

export default App;
