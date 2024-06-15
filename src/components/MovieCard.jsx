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
                    <div>
                        <h2 className='card-movie-title'>
                            {movie?.title.length > 17 ? `${movie?.title.slice(0, 17)}...` : movie?.title}
                        </h2>
                    </div>
                    <div className='rating-container'>
                        <p>Rating: ⭐{movie.vote_average}</p>
                    </div>
                </div>
            </div>
            <div className='card-overlay' onClick={() => onModalToggle(movie)}/>
            <div className='icons-list-watch-container'>
                <div>
                    <FaHeart className={`heart-icon ${liked ? 'heart-icon-selected' : ''}`} onClick={() =>{likedToggle(); onLikedFunction(movie,liked); }} size={70}/>
                </div>
                <div>
                    <FaRegEye className={`eye-icon ${watched ? 'eye-icon-selected' : ''}`} onClick={() => {watchedToggle(); onWatchedFunction(movie, watched)}} size={70}/>
                </div>
            </div>

        </div>
    )
}

export default MovieCard;
