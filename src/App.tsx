import { useState } from "react";
import SearchBar from "./SearchBar";
import YoutubePlayer from "./YoutubePlayer";

export interface Ref {
	changeHeaderContent: (songUrl: string) => void;
}

function App() {
	const [songUrls, setSongUrl] = useState([""]);

	return <div>
		<SearchBar songUrls={songUrls} setSongUrl={setSongUrl} />
		<YoutubePlayer songUrls={songUrls} />
	</div> 
}

export default App;
