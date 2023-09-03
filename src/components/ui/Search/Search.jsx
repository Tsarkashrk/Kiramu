import React from 'react';

const Search = () => {
  return (
    <div className='search'>
      <input className='search__input' type='text' placeholder='Найди свое аниме...'/>
      
      <button className='search__button'>
        <ion-icon name='search'></ion-icon>
      </button>
      
    </div>
  )
}

export default Search;