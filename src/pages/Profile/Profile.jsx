import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [data, setData] = useState('');

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
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchData();
  }, []);

  return <div>{data ? JSON.stringify(data) : ''}</div>;
};

export default Profile;
