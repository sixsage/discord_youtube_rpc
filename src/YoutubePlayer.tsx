import { ForwardedRef, forwardRef, useImperativeHandle, useRef } from "react";
import { Ref } from "./App";

const YoutubePlayer = forwardRef<Ref, {}>((props: {}, ref: ForwardedRef<Ref>) => {
    const headerRef = useRef<HTMLHeadingElement>(null);
    
    const changeHeaderContent = (songUrl: string): void => {
        if (!headerRef.current) { return; }
        headerRef.current.innerText = songUrl;
    };

    useImperativeHandle(ref, () => ({ changeHeaderContent }));

    return <div>
        <h1 ref={headerRef}></h1>
    </div>
})

export default YoutubePlayer;