import React, { useContext } from 'react';
import { PlayerContext } from '../context/playerContext';

const SongItem = ({image, name, desc,id}) => {

  const { getSongById } = useContext(PlayerContext);

  function handleSongClick(){
    getSongById(id);
  }


  return (
    <div onClick={handleSongClick} className='playlist-card'>
      <img className='playlist-image' src={image} alt='' />
      <p className='playlist-name'>{name}</p>
      <p className='playlist-desc'>{desc}</p>
    
    </div>
  )
}

export default SongItem;
