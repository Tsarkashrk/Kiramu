import React, { useState, useEffect } from 'react';

const FavoriteButton = ({ animeCode, animeId, animeImg, animeLink, animeName }) => {
  const [textState, setTextState] = useState('В любимое');

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:1000/api/anime/${animeCode}/check`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setTextState('Добавлено');
        }
      } catch (error) {
        console.error('Error checking favorite status:', error.message);
      }
    };

    checkFavoriteStatus();
  }, [animeCode]);

  const addFavorite = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:1000/api/anime/${animeCode}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          animeId,
          animeName,
          animeCode,
          animeLink,
          animeImg,
        }),
      });

      if (response.ok) {
        setTextState('Добавлено');
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Failed to add favorite');
      }
    } catch (error) {
      console.error('Error adding favorite:', error.message);
    }
  };

  const removeFavorite = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:1000/api/anime/${animeCode}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setTextState('В любимое');
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Failed to remove favorite');
      }
    } catch (error) {
      console.error('Error removing favorite:', error.message);
    }
  };

  const handleButtonClick = () => {
    if (textState === 'Добавлено') {
      removeFavorite();
    } else {
      addFavorite();
    }
  };

  return (
    <>
      <button onClick={handleButtonClick} className={`favorite-btn button button--secondary ${textState === 'В любимое' ? 'favorite-btn--secondary' : ''}`}>
        <ion-icon name="heart"></ion-icon> {textState}
      </button>
    </>
  );
};

export default FavoriteButton;
