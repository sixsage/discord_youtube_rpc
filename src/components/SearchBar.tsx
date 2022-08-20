import { useRef } from "react";

interface SearchBarProperties {
	songUrls: string[];
	setSongUrl: (arg0: string[]) => void;
}

function SearchBar(props: SearchBarProperties) {
	const inputElement = useRef<HTMLInputElement>(null);

	function updateSongUrl(event: React.KeyboardEvent<HTMLInputElement>): void {
		if (event.key === "Enter") {
			if (!inputElement.current || inputElement.current.value.length === 0) { return; }
			props.setSongUrl(props.songUrls.concat(inputElement.current.value));
			inputElement.current.value = '';
		}
	}

	return <div>
		<input ref={inputElement} type={"search"} onKeyDown={updateSongUrl}></input>
	</div>
}

export default SearchBar;
