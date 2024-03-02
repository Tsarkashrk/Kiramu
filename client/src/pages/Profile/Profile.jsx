import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Favorites from '../../components/Favorites/Favorites';

const Profile = () => {
  const [data, setData] = useState('');
  const [bio, setBio] = useState('');
  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get('https://kiramu.vercel.app/api/profile', {
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
        'https://kiramu.vercel.app/api/profile',
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

  const handleOpenEdit = () => {
    setOpenEdit((prev) => !prev);
  };

  return (
    <main className="profile">
      <div className="profile__background">
        <div className="profile__wrapper">
          <img className="profile__picture" src="images/msg853484107-62724.jpg" alt="" />
          <button className="profile__edit button button--secondary" onClick={handleOpenEdit}>
            <ion-icon name="create-outline"></ion-icon>
          </button>
        </div>
      </div>
      <div className="profile__details">
        <p className="profile__username">{data?.username}</p>
        <p className="profile__bio">{data?.bio}</p>
        {openEdit ? (
          <>
            <input
              className="profile__input"
              onChange={handleBioChange}
              placeholder="Введите описание профиля"
            />
            <button className="profile__button button button--secondary" onClick={handleSaveBio}>
              Сохранить
            </button>
          </>
        ) : (
          ''
        )}
        <NavLink
          className="profile__button profile__button--secondary button button--secondary"
          to="/"
          onClick={logOut}>
          Выйти
        </NavLink>
      </div>

      <Favorites />
    </main>
  );
};

export default Profile;
