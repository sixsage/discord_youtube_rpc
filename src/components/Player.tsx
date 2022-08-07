import { useEffect, useRef } from "react";

function Player(props: { songUrls: string[] } ) {
    const headerRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (!headerRef.current) { return; }
        headerRef.current.innerText = props.songUrls.join("\n");
    });

    return <div><h1 ref={headerRef}></h1></div>
}

export default Player;