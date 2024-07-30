import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SearchContext } from "../context/searchContext";
import SongItem from "./SongItem";
import PlayListItem from "./PlayListItem";
import { BsPersonAdd } from "react-icons/bs";
import { BsPersonFillAdd } from "react-icons/bs";

const DisplaySearch = () => {
  const { searchQuery, searchType, setSearchType } = useContext(SearchContext);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchQuery && searchQuery != "") {
      console.log(searchQuery);
      console.log(searchType);
      const fetchSearchResults = async () => {
        try {
          const response = await axios.get("/api/search", {
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
          className={`artist-redirect-header ${
            searchType === 0 ? "active" : ""
          }`}
          onClick={() => setSearchType(0)}
        >
          Songs
        </div>
        <div
          className={`artist-redirect-header ${
            searchType === 1 ? "active" : ""
          }`}
          onClick={() => setSearchType(1)}
        >
          Playlists
        </div>
        <div
          className={`artist-redirect-header ${
            searchType === 2 ? "active" : ""
          }`}
          onClick={() => setSearchType(2)}
        >
          Users
        </div>
      </nav>
      {searchType === 0 ? (
        <div className="songlist-container search-playlist-container">
          {searchQuery !="" && searchResults && searchResults.length > 0
            ? searchResults.map((item, index) => {
                console.log(item);
                return (
                  <SongItem
                    key={index}
                    image={item.imageUrl}
                    name={item.title}
                    id={item._id}
                    desc={item.artist}
                    likes={item.likes}
                    dislikes={item.dislikes}
                  />
                );
              })
            : <div className="no-results">No results found</div>}
        </div>
      ) : searchType === 1 ? (
        <div className="search-playlist-container">
          {searchQuery !="" && searchResults && searchResults.length > 0
            ? searchResults.map((item, index) => {
                console.log(item);
                return (
                  <PlayListItem
                    isPrivate={item.privateStatus}
                    key={index}
                    image={item.imageUrl}
                    name={item.name}
                    id={item._id}
                    desc={item.desc}
                    likes={item.likes}
                    dislikes={item.dislikes}
                  />
                );
              })
            : <div className="no-results">No results found</div>}
        </div>
      ) : (
        <div>
          {searchQuery !="" && searchResults && searchResults.length > 0 ? searchResults.map((result, index) => (
            <div key={index} className="playlist-songs-table-rows search-rows">
              <div className="search-rows-first">
                <img
                  className="search-users-image"
                  src={result.profilePhoto}
                  alt=""
                />
                <p>{result.name}</p>
              </div>

              <div className="search-rows-options">
                <i><BsPersonAdd /></i>
                <i><BsPersonFillAdd /></i>
              </div>
            </div>
          )): <div className="no-results">No results found</div> }
        </div>
      )}
    </div>
  );
};

export default DisplaySearch;
