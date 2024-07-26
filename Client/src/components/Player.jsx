import React, { useContext, useEffect, useRef, useState } from 'react';
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { ImPrevious2 } from "react-icons/im";
import { IoMdPause } from "react-icons/io";
import { IoMdPlay } from "react-icons/io";
import { ImNext2 } from "react-icons/im";
import { PlayerContext } from '../context/playerContext';

const Player = ({song}) => {

    const { getSongsData ,songData, playlistData, currentSong, setCurrentSong } = useContext(PlayerContext);
    
    
    const progressBar = useRef();
    const audioRef = useRef();
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const progressBarRef = useRef();
    const [duration, setDuration] = useState(0);
    const [isLike, setIsLike] = useState(false);
    const [isDislike, setIsDislike] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            console.log('loading here');
          const handleTimeUpdate = () => {
            console.log('test')
            setCurrentTime(audio.currentTime);
            const progress = (audio.currentTime / audio.duration) * 100;
            progressBar.current.style.width = `${progress}%`;
          };
    
          const handleLoadedMetadata = () => {
            setDuration(audio.duration);
          };
    
          audio.addEventListener('timeupdate', handleTimeUpdate);
          audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    
          return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
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
              audio.play().catch(error => {
                console.log(error);
              });
            }
          }
        }
      }, [currentSong]);

      

    function handleLike(){

        if(isDislike) {
            setIsDislike(false);
        }
        if(isLike){
            setIsLike(false);
        } else {
            setIsLike(true);
        }
        
    }

    function handleDislike(){
        if(isLike) {
            setIsLike(false);
        }
        if(isDislike){
            setIsDislike(false);
        } else {
            setIsDislike(true);
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
        audio.currentTime = newTime;  // Set the new current time
        setCurrentTime(newTime);  // Update the state
        progressBar.current.style.width = `${(newTime / audio.duration) * 100}%`;  // Update the progress bar
        if (isPlaying) {  // Only play if it was playing before
          audio.play().catch(error => {
            console.error("Audio playback failed: ", error);
          });
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      };

      if (!currentSong) {
        return <div>Loading...</div>;
      }
  return (
    
    <div className='player'>
      <div className='song-image'>
        <img className='player-song-image' src={currentSong.imageUrl} alt=''/>
      </div>
      <div className="song-attributes">
        <div className='song-attribute-top'>
            <div onClick={()=>handleLike()} className='like-button'>
                {!isLike ? <i><AiOutlineLike/></i>:<i><AiFillLike/></i>}
            </div>
            <div className='prev-button'>
                <i><ImPrevious2/></i>
            </div>
            <div onClick={()=>handlePausePlay()} className='pause-play-button'>
                {
                    isPlaying ? <i><IoMdPause/></i> : <i><IoMdPlay/></i>
                }            
            </div>
            <div className='next-button'>
                <i><ImNext2/></i>
            </div>
            <div onClick={()=>handleDislike()} className='dislike-button'>
                {
                    !isDislike ? <i><AiOutlineDislike/></i>:<i><AiFillDislike/></i>
                }
            </div>
        </div>
        <div className="song-attribute-bottom">
            <div className='current-time'>{formatTime(currentTime)}</div>
            {/* <input onClick={(e)=>console.log(e)} type='range' className='progress-bar'></input> */}
            <div onClick={handleProgressBarClick} ref={progressBarRef} className='progress-bar'>
                <div ref={progressBar} className='progress-bar-update'>
                </div>
            </div>
            <div className="duration">{formatTime(duration)}</div>
        </div>
        <audio ref={audioRef} src={currentSong.audioUrl}></audio>
      </div>
    </div>
  )
}

export default Player
