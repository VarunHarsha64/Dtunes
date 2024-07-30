import React from 'react';
import { useNavigate } from 'react-router-dom';

const PlayListItem = ({image, name, desc,id,isPrivate}) => {

  const navigate = useNavigate();

  return !isPrivate ? (
    <div onClick={()=>navigate(`/album/${id}`)} className='playlist-card'>
      <img className='playlist-image' src={image} alt='' />
      <p className='playlist-name'>{name}</p>
      <p className='playlist-desc'>{desc}</p>
    
    </div>
  ) : null
}

export default PlayListItem;
