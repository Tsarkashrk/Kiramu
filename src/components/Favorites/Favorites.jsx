import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Preloader from '../ui/Preloader/Preloader';
import Heading from '../Heading/Heading';

const FavoritesComponent = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:1000/api/profile/favorites', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch favorites');
        }

        setFavorites(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching favorites:', error.message);
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="favorites">
      <Heading title="ЛЮБИМЫЕ" />

      {loading ? (
        <Preloader />
      ) : (
        <ul className="favorites__list">
          {favorites.map((favorite, index) => (
            <Link className="favorites__item" key={index} to={`/anime/${favorite.animeCode}`}>
              <img src={favorite.animeImg} alt="" className="favorites__image" />
              <p className="favorites__title">{favorite.animeName}</p>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesComponent;
