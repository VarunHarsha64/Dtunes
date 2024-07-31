import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlayerContext } from "../context/playerContext";
import { IoTrash } from "react-icons/io5";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-hot-toast";
import axios from "axios";

const DisplayPlayList = () => {
  const { getPlaylistById, getSongByIdForPlaylist, getSongById, playlistQueue, setPlaylistQueue, playlistQueueId, setPlaylistQueueId, setPlayPlaylist } =
    useContext(PlayerContext);
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [userId, setUserId] = useState(null);
  const [isMyPlaylist, setIsMyPlaylist] = useState(false);

  // Decode token and set user ID
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);
    }
  }, []);

  // Fetch playlist and songs
  useEffect(() => {
    const fetchPlaylist = async () => {
      const playlistData = await getPlaylistById(id);
      console.log(playlistData);
      setPlaylist(playlistData);
      const fetchedSongs = await Promise.all(
        playlistData.songs.map((songId) => getSongByIdForPlaylist(songId))
      );
      setSongs(fetchedSongs);
    };
    fetchPlaylist();
  }, [id, getPlaylistById, getSongByIdForPlaylist]);

  // Check if the playlist belongs to the user
  useEffect(() => {
    if (userId && playlist) {
      setIsMyPlaylist(userId === playlist.userId);
    }
  }, [userId, playlist]);

  const handlePlayPlaylist = async () => {
    try {
      console.log(songs);
      setPlaylistQueue(songs);
    } catch (error) {
      
    }

  }

  useEffect(()=>{
    if(playlistQueue != null && playlistQueueId != null) {
      setPlayPlaylist(playlistQueueId);
    }
  },[playlistQueue])

  const handleRemoveFromPlaylist = async (songId, e) => {
    e.stopPropagation(); // Prevent event propagation
    try {
      const response = await axios.post("/api/album/removeFromAlbum", {
        albumId: playlist._id,
        songId: songId,
      });
      if (response.data.success) {
        setSongs(songs.filter((song) => song._id !== songId)); // Update the songs list
        toast.success("Song removed successfully!");
      } else {
        toast.error("Failed to remove song");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  if (!playlist) {
    return <div>Loading...</div>;
  }

  return (
    <div className="playlist-page">
      <div className="playlist-page-header">
        <img
          src={playlist.imageUrl}
          alt=""
          className="playlist-page-header-image"
        />
        <div className="playlist-page-header-content temp-header">
          <div>
            <p>playlist</p>
            <h1>{playlist.name}</h1>
            <p>{playlist.desc}</p>
            <p>
              {playlist.likes} Likes &middot; {playlist.dislikes} Dislikes
            </p>
          </div>
          <div className="playlist-playbutton-div">
            <button className="playlist-play-button" role="button" onClick={handlePlayPlaylist}>
              Play
            </button>
          </div>
        </div>
      </div>
      <div className="playlist-songs-table-header">
        <p>
          <b className="table-column-number">#</b>Title
        </p>
        <p>Artist</p>
        <p>Likes</p>
        <p>Dislikes</p>
      </div>
      {songs.map((song, index) => (
        <div
          onClick={() => getSongById(song._id)}
          key={index}
          className="playlist-songs-table-rows"
        >
          <p>
            <b className="table-column-number">{index + 1}</b>
            {song.title}
          </p>
          <p>{song.artist}</p>
          <p>{song.likes}</p>
          <p>{song.dislikes}</p>
          <div className="playlist-rows-options">
            {isMyPlaylist && (
              <i
                onClick={(e) => {
                  handleRemoveFromPlaylist(song._id, e);
                }}
              >
                <IoTrash />
              </i>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayPlayList;
