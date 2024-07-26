import React, { useContext }  from 'react';
import { MdOutlineLyrics } from "react-icons/md";
import { TiVolumeUp } from "react-icons/ti";
import Track from "../assets/track.png";
import { PlayerContext } from '../context/playerContext';





const TrackList = () => {

  const { currentSong } = useContext(PlayerContext);

  if (!currentSong) {
    return <div>Loading...</div>;
  }

  return (
    <div className='tracklist'>
        <div className='top'>
            <img src={Track} alt=''/>
            <p className='trackName'>
                {currentSong.title} <span className='trackSpan'>{currentSong.artist}</span>
            </p>
        </div>
      <div className="bottom">
        <i><TiVolumeUp/></i>
        <input type='range'></input>
        <i><MdOutlineLyrics/></i>
      </div>
    </div>
  )
}

export default TrackList
