import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SearchContext } from "../context/searchContext";
import SongItem from "./SongItem";
import PlayListItem from "./PlayListItem";

const DisplaySearch = () => {
  const { searchQuery, searchType, setSearchType } = useContext(SearchContext);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchQuery && searchQuery!= "") {
      console.log(searchQuery);
      console.log(searchType);
      const fetchSearchResults = async () => {
        try {
          const response = await axios.get('/api/search', {
            params: {
              type: searchType,
              query: searchQuery,
            },
          });
          setSearchResults(response.data);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchSearchResults();
    }
  }, [searchQuery, searchType]);

  return (
    <div className="artist-page">
      <nav className="artist-navbar">
        <div
          className={`artist-redirect-header ${searchType === 0 ? "active" : ""}`}
          onClick={() => setSearchType(0)}
        >
          Songs
        </div>
        <div
          className={`artist-redirect-header ${searchType === 1 ? "active" : ""}`}
          onClick={() => setSearchType(1)}
        >
          Playlists
        </div>
        <div
          className={`artist-redirect-header ${searchType === 2 ? "active" : ""}`}
          onClick={() => setSearchType(2)}
        >
          Users
        </div>
      </nav>
      {
        searchType === 0 ? <div className='songlist-container playlist-container'>
        {
            searchResults ? searchResults.map((item,index)=>{
                console.log(item)
                return <SongItem key={index} image={item.imageUrl} name={item.title} id={item._id} desc={item.artist}/>
            }):""
        }
        </div> : searchType === 1 ? 
        <div className='playlist-container'>
        {

            searchResults ? searchResults.map((item,index)=>{
                console.log(item);
                return <PlayListItem isPrivate={item.privateStatus} key={index} image={item.imageUrl} name={item.name} id={item._id} desc={item.desc}/>
            }):""
        }
    </div>
     : 
     <div style={{color: "white"}} className="artist-search-results">
     {searchResults.map((result, index) => (
       <div key={index} className="artist-result-item">
         <p>{result.name || result.title || result.userId}</p>
       </div>
     ))}
   </div>
      }
  </div>
  );
};

export default DisplaySearch;
