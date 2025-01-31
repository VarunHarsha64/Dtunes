import React, { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { ImPrevious2 } from "react-icons/im";
import { IoMdPause } from "react-icons/io";
import { IoMdPlay } from "react-icons/io";
import { ImNext2 } from "react-icons/im";
import { PlayerContext } from "../context/playerContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { FaPlus } from "react-icons/fa";

const Player = ({ song }) => {
  const { playNextSong, playPreviousSong, currentSong, audioRef } =
    useContext(PlayerContext);
  const progressBar = useRef();
  const [currentTime, setCurrentTime] = useState(0);
  const [userId, setUserId] = useState();
  const progressBarRef = useRef();
  const [duration, setDuration] = useState(0);
  const [likeStatus, setLikeStatus] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlistId, setPlaylistId] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [showPlaylistOverlay, setShowPlaylistOverlay] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      setUserId(decodedToken.id);
      console.log(userId);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchPlaylists = async () => {
        try {
          console.log(userId);
          const response = await axios.get(`/api/album/userGet/${userId}`);
          setPlaylists(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching playlists:", error);
        }
      };

      fetchPlaylists();
    }
  }, [userId]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      console.log("loading here");
      const handleTimeUpdate = () => {
        console.log("test");
        setCurrentTime(audio.currentTime);
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.current.style.width = `${progress}%`;
      };

      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
      };

      const handleEnded = () => {
        playNextSong();
      };

      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      audio.addEventListener("ended", handleEnded);

      return () => {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audio.removeEventListener("ended", handleEnded);
      };
    }
  }, [currentSong]);

  useEffect(() => {
    if (currentSong) {
      console.log(currentSong);
      const audio = audioRef.current;
      if (audio) {
        audio.src = currentSong.audioUrl;
        if (isPlaying) {
          audio.play().catch((error) => {
            console.log(error);
          });
        }
      }

      const handlePreLikeDislike = async () => {
        const response = await axios.post("/api/song/checkLikeDislike", {
          userId,
          songId: currentSong._id,
        });
        setLikeStatus(response.data.result);
      };
      handlePreLikeDislike();
    }
  }, [currentSong]);

  const handleLike = async () => {
    try {
      const response = await axios.post("/api/song/like", {
        songId: currentSong._id,
        userId,
      });
      setLikeStatus(response.data.result);
    } catch (error) {
      console.error("Error liking song:", error);
      toast.error("Error liking song!");
    }
  };

  async function handleDislike() {
    try {
      const response = await axios.post("/api/song/dislike", {
        songId: currentSong._id,
        userId,
      });
      setLikeStatus(response.data.result);
    } catch (error) {
      console.error("Error disliking song:", error);
      toast.error("Error disliking song!");
    }
  }

  function handlePausePlay() {
    const audio = audioRef.current;
    if (audio) {
      if (!isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
      setIsPlaying(!isPlaying);
    }
  }

  const handleProgressBarClick = (e) => {
    console.log(e.clientX);
    const audio = audioRef.current;
    audio.pause();
    const progressBar1 = progressBarRef.current;
    const rect = progressBar1.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    console.log(offsetX);
    const newTime = (offsetX / rect.width) * audio.duration;
    audio.currentTime = newTime; // Set the new current time
    setCurrentTime(newTime); // Update the state
    progressBar.current.style.width = `${(newTime / audio.duration) * 100}%`; // Update the progress bar
    if (isPlaying) {
      // Only play if it was playing before
      audio.play().catch((error) => {
        console.error("Audio playback failed: ", error);
      });
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const togglePlaylistOverlay = () => {
    setShowPlaylistOverlay(!showPlaylistOverlay);
  };

  const handleAddToPlaylist = async (playlistId) => {
    try {
      const response = await axios.post('/api/album/addToAlbum',{
        albumId : playlistId,
        songId : currentSong._id
      });

      toast.success("Song added to playlist!");
      setShowPlaylistOverlay(false);
    } catch (error) {
      console.error("Error adding song to playlist:", error);
      toast.error("Error adding song to playlist!");
    }
  };

  if (!currentSong) {
    return <div>Loading...</div>;
  }
  return (
    <div className="player">
      <div className="song-image">
        <img className="player-song-image" src={currentSong.imageUrl} alt="" />
      </div>
      <div className="song-attributes">
        <div className="song-attribute-top">
          <div onClick={() => handleLike()} className="like-button">
            {!(likeStatus === 1) ? (
              <i>
                <AiOutlineLike />
              </i>
            ) : (
              <i>
                <AiFillLike />
              </i>
            )}
          </div>
          <div onClick={() => playPreviousSong()} className="prev-button">
            <i>
              <ImPrevious2 />
            </i>
          </div>
          <div onClick={() => handlePausePlay()} className="pause-play-button">
            {isPlaying ? (
              <i>
                <IoMdPause />
              </i>
            ) : (
              <i>
                <IoMdPlay />
              </i>
            )}
          </div>
          <div onClick={() => playNextSong()} className="next-button">
            <i>
              <ImNext2 />
            </i>
          </div>
          <div onClick={() => handleDislike()} className="dislike-button">
            {!(likeStatus === -1) ? (
              <i>
                <AiOutlineDislike />
              </i>
            ) : (
              <i>
                <AiFillDislike />
              </i>
            )}
          </div>

          <div onClick={togglePlaylistOverlay}>
            <i>
              <FaPlus />
            </i>
          </div>
        </div>
        <div className="song-attribute-bottom">
          <div className="current-time">{formatTime(currentTime)}</div>
          {/* <input onClick={(e)=>console.log(e)} type='range' className='progress-bar'></input> */}
          <div
            onClick={handleProgressBarClick}
            ref={progressBarRef}
            className="progress-bar"
          >
            <div ref={progressBar} className="progress-bar-update"></div>
          </div>
          <div className="duration">{formatTime(duration)}</div>
        </div>
        <audio ref={audioRef} src={currentSong.audioUrl}></audio>
      </div>

      {showPlaylistOverlay && (
        <div className="playlist-overlay">
          <div className="playlist-overlay-header">
          <label>Playlist:</label>
          <p onClick={togglePlaylistOverlay}>x</p>
          </div>
          
          <div className="choose-playlist-and-add">
            <select
              value={playlistId}
              onChange={(e) => setPlaylistId(e.target.value)}
              required
            >
              <option value="">Select Playlist</option>
              {playlists.map((playlist) => (
                <option key={playlist._id} value={playlist._id}>
                  {playlist.name}
                </option>
              ))}
            </select>
            <button onClick={()=>handleAddToPlaylist(playlistId)}>Add Song</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;
