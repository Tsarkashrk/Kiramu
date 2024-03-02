import React, { useState, useEffect } from 'react';
import Heading from '../Heading/Heading';
import Preloader from '../ui/Preloader/Preloader';

const Comments = ({ animeId, animeCode }) => {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAuth = localStorage.getItem('token');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:1000/anime/${animeCode}/comments`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }

        setComments(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching comments:', error.message);
        setLoading(false);
      }
    };

    fetchComments();
  }, [comments]);

  const formatTimeAgo = (commentDate) => {
    const now = new Date();
    const diffInMs = now - new Date(commentDate);
    if (diffInMs < 60000) {
      return 'Только что';
    } else if (diffInMs < 3600000) {
      const minutes = Math.floor(diffInMs / 60000);
      return `${minutes} минут назад`;
    } else if (diffInMs < 86400000) {
      const hours = Math.floor(diffInMs / 3600000);
      return `${hours} часов назад`;
    } else {
      const days = Math.floor(diffInMs / 86400000);
      return `${days} дней назад`;
    }
  };

  const handleCommentSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:1000/anime/${animeCode}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ animeId, animeCode, comment: commentText }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Failed to add comment');
      }

      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error.message);
    }
  };

  return (
    <div className="comments">
      <div className="comments__heading">
        <Heading title="КОММЕНТАРИИ" />
      </div>

      {isAuth ? (
        <>
          <div className="comments__add">
            <input
              className="search__input"
              placeholder="Напишите комментарий"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <ion-icon name="arrow-forward-circle" onClick={handleCommentSubmit}></ion-icon>
          </div>
        </>
      ) : (
        <div className="comments__attention">
          <ion-icon name="alert-circle"></ion-icon>
          <p className="comments__warning">
            Зарегистрируйтесь или войдите, чтобы оставить комментарий
          </p>
        </div>
      )}

      {loading ? (
        <Preloader />
      ) : (
        <ul className="comments__list">
          {comments.length !== 0 ? (
            comments.map((comment, index) => (
              <li className="comments__item" key={index}>
                <img className="comments__avatar" src="/images/msg853484107-62724.jpg" alt="" />
                <div className="comments__info">
                  <div className="comments__line">
                    <p className="comments__username">{comment.username}</p>
                    <p className="comments__date">{formatTimeAgo(comment.createdAt)}</p>
                  </div>
                  <p className="comments__comment">{comment.comment}</p>
                </div>
              </li>
            ))
          ) : (
            <p className="comments__empty">
              Будьте первым, кто напишет комментарий под этим тайтлом!
            </p>
          )}
        </ul>
      )}
    </div>
  );
};

export default Comments;
