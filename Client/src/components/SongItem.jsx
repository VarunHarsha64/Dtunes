import React, { useContext } from 'react';
import { PlayerContext } from '../context/playerContext';

const SongItem = ({image, name, desc,id,likes,dislikes}) => {

  const { getSongById } = useContext(PlayerContext);

  function handleSongClick(){
    getSongById(id);
  }


  return (
    <div onClick={handleSongClick} className='playlist-card'>
      <img className='playlist-image' src={image} alt='' />
      <p className='playlist-name'>{name}</p>
      <p className='playlist-desc'>{desc}</p>
      <div className='likes-dislikes-div'>
        <p className='likes-dislikes'>Likes: {likes} &middot; Dislikes: {dislikes}</p>
      </div>
    </div>
  )
}

export default SongItem;
