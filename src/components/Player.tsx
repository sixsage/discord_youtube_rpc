import { useEffect, useRef } from 'react';
import YouTube from 'react-youtube'

function Player(props: {songUrls: string[], setSongUrl: (arg0: string[]) => void}) {



    const opts = {
        playerVars: {
            autoplay: 1
        }
    }

    function handleInitialState() { //testing purpose
        if (props.songUrls.length === 1) {
            return 0;
        }
        return 1;
    }
    

    function getVideoId(songUrl: string) {
        if (songUrl.includes('v=') && songUrl.includes('&')) {
            return songUrl.split('v=')[1].split('&')[0];
        }
        return '';
    }

    function removeFrontSong(e: any) {
        console.log(e.data)
        console.log(e.target.getVolume())
        props.setSongUrl(props.songUrls.slice(1))

        //altering videoId by a little doesnt work
    }

    return <YouTube videoId={getVideoId(props.songUrls[handleInitialState()])} onEnd={removeFrontSong} opts={opts} />
}

export default Player;