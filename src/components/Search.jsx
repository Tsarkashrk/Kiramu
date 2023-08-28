import React from 'react';

const Search = () => {
  return (
    <div className='search'>
      <input className="search__input" type="text" placeholder='Найди свое аниме...'/>
      <ion-icon className="search__icon" name="search"></ion-icon>
    </div>
  )
}

export default Search;