import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';
import more from './more.png';

const Card = ({ id, title, created_at, upvotes }) => {
  return (
    <div className="Card">
      <div>
        <Link to={`/post/${id}`}>
          <img className="moreButton" alt="edit button" src={more} />
        </Link>
      </div>
      <p className="created_at">Posted {created_at}</p>
      <h1 className="title">{title}</h1>
      <p className="upvotes">{upvotes} upvotes</p>
    </div>
  );
};

export default Card;