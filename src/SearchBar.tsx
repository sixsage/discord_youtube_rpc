import { useRef } from "react";

interface SearchBarProperties {
	setSongUrl: (arg0: string) => void;
}

function SearchBar(props: SearchBarProperties) {
	const inputElement = useRef<HTMLInputElement>(null);

	function updateSongUrl(event: React.KeyboardEvent<HTMLInputElement>): void {
		if (event.key === "Enter") {
			props.setSongUrl(inputElement.current?.value ?? "");
		}
	}

	return <div>
		<input ref={inputElement} type={"search"} onKeyDown={updateSongUrl}></input>
	</div>
}

export default SearchBar;
