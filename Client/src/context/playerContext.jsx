import { Children, createContext, useEffect, useRef } from "react";
import axios from "axios";
import { useState } from "react";

export const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
  const url = "http://localhost:8000";

  const [songData, setSongData] = useState([]);
  const [playlistData, setPlaylistData] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [playlistQueue, setPlaylistQueue] = useState(null);
  const [playlistQueueId, setPlaylistQueueId] = useState(null);
  const [ currentSongIndex, setCurrentSongIndex ] = useState(0);
  const audioRef = useRef();

  const getSongsOfPlaylist = async (id) => {
    try {
        const response = await axios.post(`${url}/api/album/getSongs/${id}`);
        return response.data.songs;
    } catch (error) {
        console.error(error);
    }

  };

  const getSongsData = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      console.log(response.data.songs);
      setSongData(response.data.songs);
      setPlaylistQueue(response.data.songs);
      if (response.data.songs.length > 0) {
        setCurrentSong(response.data.songs[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getSongById = async (id) => {
    console.log(id, "seeeeeee herereerere");
    try {
      const response = await axios.get(`${url}/api/song/get/${id}`);
      setCurrentSong(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getSongByIdForPlaylist = async (id) => {
    console.log(id, "seeeeeee herereerere");
    try {
      const response = await axios.get(`${url}/api/song/get/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getPlaylistData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      setPlaylistData(response.data.albums);
      console.log(response.data.albums);
    } catch (error) {
      console.error(error);
    }
  };

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
      const playlist = await getPlaylistById(id);
      console.log(playlist);
      if (playlist && playlist.songs.length > 0) {
        const result = await getSongsOfPlaylist(id);
        setPlaylistQueue(result);
        setCurrentSongIndex(0);
        setCurrentSong(await getSongByIdForPlaylist(playlist.songs[0]));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const playNextSong = () => {
    console.log(currentSongIndex, playlistQueue.length - 1)
    if (currentSongIndex < playlistQueue.length - 1) {
      const nextIndex = currentSongIndex + 1;
      setCurrentSongIndex(nextIndex);
      setCurrentSong(playlistQueue[nextIndex]);
    }
  };

  const playPreviousSong = () => {
    if (currentSongIndex > 0) {
      const previousIndex = currentSongIndex - 1;
      setCurrentSongIndex(previousIndex);
      setCurrentSong(playlistQueue[previousIndex]);
    }
  };

  useEffect(() => {
    getSongsData();
    getPlaylistData();
  }, []);

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
    audioRef,
    playNextSong,
    playPreviousSong,
    currentSongIndex,
    setCurrentSongIndex,
  };
  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
