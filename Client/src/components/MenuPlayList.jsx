import React, {useContext, useState} from 'react';
import { FaPlus } from "react-icons/fa";
import { PlayList } from './PlayList';
import { MdMusicNote } from "react-icons/md";
import { IoTrash } from "react-icons/io5";
import { PlayerContext } from '../context/playerContext';



const MenuPlayList = () => {

    const { playlistData } = useContext(PlayerContext);
    console.log( playlistData );

    const [activeIndex, setActiveIndex] = useState(0);

    const handleItemClick = (index)=>{
        setActiveIndex(index);
    }

  return (
    <div className='playlist-container'>
      <div className="name-container">
        <p>My PlayList</p>
        <i><FaPlus/></i>
      </div>
      <div className="playlist-scroll">
        
        {
            playlistData ? playlistData.map((list,index)=>{
              
                return <div onClick={()=>handleItemClick(index)} key={index} className={`playlist ${index === activeIndex ? 'active' : ''}`}>
                    <i className='list'><MdMusicNote/></i>
                    <p>{list.name}</p>
                    <i className='trash'><IoTrash/></i>
                </div>
            }) : null
        }
      </div>
    </div>
  )
}

export default MenuPlayList
