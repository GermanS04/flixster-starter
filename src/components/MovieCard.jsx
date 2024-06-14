import '../styles/MovieCard.css';
import { FaHeart } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { useState, useEffect } from 'react';


const MovieCard = ({props: movie, onModalToggle, onLikedFunction, onWatchedFunction}) => {
    const imageURL = `http://image.tmdb.org/t/p/original${movie.poster_path}`;
    const [liked, setLiked] = useState(false);
    const [watched, setWatched] = useState(false);

    const likedToggle = () => {
        setLiked(!liked);
    }

    const watchedToggle = () => {
        setWatched(!watched);
    }

    return(
        <div className='card-main'>
            <div className='card-container'>
                <div className='card-img-container'>
                    <img className='card-img' src={imageURL}/>
                </div>
                <div className='card-info'>
                    <h2 className='card-movie-title'>{movie.title}</h2>
                    <h3>{movie.vote_average}</h3>
                </div>
            </div>
            <div className='card-overlay' onClick={() => onModalToggle(movie)}/>
            <span>
                <FaHeart className={`heart-icon ${liked ? 'heart-icon-selected' : ''}`} onClick={() =>{likedToggle(); onLikedFunction(movie,liked); }} size={70}/>
            </span>
            <span>
                <FaRegEye className={`eye-icon ${watched ? 'eye-icon-selected' : ''}`} onClick={() => {watchedToggle(); onWatchedFunction(movie, watched)}} size={70}/>
            </span>

        </div>
    )
}

export default MovieCard;
