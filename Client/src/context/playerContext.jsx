import { Children, createContext, useEffect, useRef } from "react";
import axios from "axios";
import { useState } from "react";



export const PlayerContext = createContext();

const PlayerContextProvider = ({children}) => {
    const url = 'http://localhost:8000'

    const [songData, setSongData] = useState([]);
    const [playlistData, setPlaylistData] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const [playlistQueue, setPlaylistQueue] = useState(null);
    const [playlistQueueId, setPlaylistQueueId]= useState(null);
    const audioRef = useRef();





    const getSongsData = async () => {
        try {
          const response = await axios.get(`${url}/api/song/list`);
          setSongData(response.data.songs);
          if (response.data.songs.length > 0) {
            setCurrentSong(response.data.songs[0]);
          }
        } catch (error) {
          console.error(error);
        }
    };

    const getSongById = async (id) => {
        console.log(id, 'seeeeeee herereerere');
        try {
            const response = await axios.get(`${url}/api/song/get/${id}`);
            setCurrentSong(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const getSongByIdForPlaylist = async (id) => {
        console.log(id, 'seeeeeee herereerere');
        try {
            const response = await axios.get(`${url}/api/song/get/${id}`);
            console.log(response.data);
            return response.data;
           
        } catch (error) {
            console.error(error);
        }
    }

    const getPlaylistData = async ()=>{
        try {
            const response = await axios.get(`${url}/api/album/list`);
            setPlaylistData(response.data.albums);
            console.log(response.data.albums);
        } catch (error) {
            console.error(error);
        }
    }

    const getPlaylistById = async (id) => {
        try {
          const response = await axios.get(`${url}/api/album/get/${id}`);
          console.log(response.data);
          return response.data;
        } catch (error) {
          console.error(error);
          return null;
        }
    };

    const setPlayPlaylist = async (id) => {
        try {
            if(playlistQueue) {
                setCurrentSong(playlistQueue[0]);
            }
        } catch (error) {
            
        }
    }


    useEffect(()=>{
        getSongsData();
        getPlaylistData();
    },[])

    const contextValue = {
        songData,
        playlistData,
        currentSong,
        setCurrentSong,
        getSongsData,
        getPlaylistData,
        getSongById,
        getPlaylistById,
        getSongByIdForPlaylist,
        playlistQueue,
        setPlaylistQueue,
        playlistQueueId,
        setPlaylistQueueId,
        setPlayPlaylist,
        audioRef
    }
    return (
        <PlayerContext.Provider value={contextValue}>
            {children}
        </PlayerContext.Provider>
    )

}

export default PlayerContextProvider;
