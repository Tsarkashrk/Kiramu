import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get(import.meta.env.VITE_SERVER_URL_PROFILE, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchData();
  }, []);

  return <div>{data ? JSON.stringify(data) : ''}</div>;
};

export default Profile;
