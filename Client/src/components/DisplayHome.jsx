import React, { useContext } from 'react'
import { PlayList } from './PlayList'
import PlayListItem from './PlayListItem'
import { SongList } from './SongList'
import SongItem from './SongItem'
import { PlayerContext } from '../context/playerContext'

const DisplayHome = () => {

  const { songData, playlistData } = useContext(PlayerContext);
  console.log(playlistData);

  return (
    <div className='display-home'>
      <div className='set-1'>
        <h2 className='home-header'>Top Playlists</h2>
        <div className='playlist-container'>
            {

                playlistData ? playlistData.map((item,index)=>{
                    console.log(item);
                    return <PlayListItem key={index} image={item.imageUrl} name={item.name} id={item._id} desc={item.desc}/>
                }):""
            }
        </div>
      </div>
      <div className='set-2'>
        <h2 className='home-header'>Top Songs</h2>
        <div className='songlist-container playlist-container'>
        {
            songData ? songData.map((item,index)=>{
                console.log(item)
                return <SongItem key={index} image={item.imageUrl} name={item.title} id={item._id} desc={item.artist}/>
            }):""
        }
        </div>
      </div>
    </div>
  )
}

export default DisplayHome
