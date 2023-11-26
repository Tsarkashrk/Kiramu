import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [text, setText] = useState();

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setText(e.target.value);
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    navigate(`/search/${text}`);
  }

  return (
    <div className='search'>
      <input className='search__input' name='input' type='text' placeholder='Найди свое аниме...' value={text || ' '} onChange={handleInputChange} onKeyDown={handleKeyPress}/>
      
      <button className='search__button' onClick={handleSearch}>
        <ion-icon name='search'></ion-icon>
      </button>
      
    </div>
  )
}

export default Search;