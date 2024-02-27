import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [data, setData] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get('http://localhost:1000/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
        setBio(response.data.bio);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchData();
  }, []);

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleSaveBio = async () => {
    try {
      const token = localStorage.getItem('token');

      await axios.patch(
        'http://localhost:1000/profile',
        { bio },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setData((prevData) => ({ ...prevData, bio }));
    } catch (error) {
      console.error('Ошибка при обновлении описания профиля:', error);
    }
  };

  const logOut = () => {
    localStorage.removeItem('token');
  };

  return (
    <main className="profile">
      <div className="profile__background">
        <div className="profile__wrapper">
          <img className="profile__picture" src="images/msg853484107-62724.jpg" alt="" />
        </div>
      </div>
      <div className="profile__details">
        <p className="profile__username">{data?.username}</p>
        <p className="profile__bio">{data?.bio}</p>
        <textarea
          className="profile__textarea"
          onChange={handleBioChange}
          placeholder="Введите описание профиля"
        />
        <NavLink className="profile__button button button--secondary" onClick={handleSaveBio}>
          Сохранить
        </NavLink>
        <NavLink
          className="profile__button profile__button--secondary button button--secondary"
          to="/"
          onClick={logOut}>
          Выйти
        </NavLink>
      </div>
    </main>
  );
};

export default Profile;
