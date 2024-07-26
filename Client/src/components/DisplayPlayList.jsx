import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlayList } from "./PlayList";
import { SongList } from "./SongList";
import { PlayerContext } from "../context/playerContext";

const DisplayPlayList = () => {

  const { getPlaylistById, getSongById,getSongByIdForPlaylist } = useContext(PlayerContext);
  console.log(useParams())
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [songs, setSongs] = useState(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      const playlistData = await getPlaylistById(id);
      setPlaylist(playlistData);
      console.log(playlistData);
      const songIds = playlistData.songs;


      const fetchedSongs = await Promise.all(
        songIds.map(async (songId) => {
          console.log(songId);
          const songData = await getSongByIdForPlaylist(songId);
          console.log(songData, 'seehere')
          return songData;
        })
      );
      console.log(fetchedSongs);
      setSongs(fetchedSongs);
      console.log(songs);
    };
    fetchPlaylist();
  }, [id]);

  if (!playlist || !songs) {
    return <div>Loading...</div>;
  }
  console.log(songs);
  return (
    <div className="playlist-page">
      <div className="playlist-page-header">
        <img src={playlist.image} alt="" />
        <div className="playlist-page-header-content">
          <p>playlist</p>
          <h1>{playlist.name}</h1>
          <p>{playlist.desc}</p>
          <p>
            {playlist.likes} Likes &middot; {playlist.dislikes} Dislikes
          </p>
        </div>
      </div>
      <div className="playlist-songs-table-header">
        <p>
          <b className="table-column-number">#</b>Title
        </p>
        <p>Artist</p>
        <p>Likes</p>
      </div>
      {songs.map((song, index) => (
        <div onClick={()=>getSongById(song._id)} key={index} className="playlist-songs-table-rows">
          <p>
            <b className="table-column-number">{index + 1}</b>
            {song.title}
          </p>
          <p>{song.artist}</p>
          <p>{song.likes}</p>
        </div>
      ))}
    </div>
  );
};

export default DisplayPlayList;
