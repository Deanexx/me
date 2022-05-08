import { FC, useEffect, useRef, useState } from "react"
import Marquee from "../Marquee/Marquee"
import useEffectNoFirstRender from "../../customHooks/useEffectNoFirstRender"
const sourceFile = require("../../assets/songs/MissU.mp3")
const sourceFile_2 = require("../../assets/songs/Dakooka.mp3")
const sourceFile_3 = require("../../assets/songs/Luna.mp3")

// const songs = [sourceFile, sourceFile2]

const songs = [
    {
        name: "Dakooka - Get dry from water",
        song: sourceFile_2
    },
    {
        name: "Rolling stone - Miss You",
        song: sourceFile
    },
    {
        name: "Luna - Sad dance",
        song: sourceFile_3
    }
]

const AudioPlayer: FC = () => {
    const audio = useRef<HTMLAudioElement>(null)
    const [currSong, setCurrSong] = useState<number>(0)
    const isPlaying = useRef(false)

    function play_song() {
        if (isPlaying.current)
            audio.current?.pause()
        else audio.current?.play()
        isPlaying.current = !isPlaying.current
    }
    
    function next_song(next: number) {
        if (audio && audio.current) {
            audio.current?.pause()
            if (currSong + next >= songs.length) setCurrSong(0)
            else if (currSong + next < 0) setCurrSong(songs.length - 1)
            else setCurrSong(oldVal => oldVal + next)
        }
    }

    const stopPlay = () => {
        audio.current?.load()
        audio.current?.play()
    }
    useEffectNoFirstRender(stopPlay, currSong)
    return <div>
        <Marquee text={songs[currSong]["name"]}/>
        <audio ref={audio} src={songs[currSong]["song"]} typeof="audio/mp3"/>
        <button onClick={ () => next_song(-1) }>Prev</button>
        <button onClick={ () => play_song() }>Play</button>
        <button onClick={ () => next_song(1)}>Next</button>
    </div>
}

export default AudioPlayer