import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState(0);

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, searchType, setSearchType }}>
      {children}
    </SearchContext.Provider>
  );
};
