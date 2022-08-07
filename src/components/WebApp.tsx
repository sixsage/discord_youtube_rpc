import { useState } from "react";
import Player from "./Player";
import SearchBar from "./SearchBar";
import "./WebApp.css";

function WebApp() {
	const [songUrls, setSongUrl] = useState([""]);

	return (
        <div className="web-app-container">
		    <div className="search-bar-container">
                <SearchBar songUrls={songUrls} setSongUrl={setSongUrl} />
            </div>
            <div className="youtube-player-container">
		        <Player songUrls={songUrls} />
            </div>
	    </div> 
    );
}

export default WebApp;