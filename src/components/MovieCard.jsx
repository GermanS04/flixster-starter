import '../styles/MovieCard.css';
import PropTypes from 'prop-types';
import Modal from './Modal';

const MovieCard = ({props: movie, onModalToggle, getMovieID}) => {
    const imageURL = `http://image.tmdb.org/t/p/original${movie.poster_path}`;

    return(
        <>
            <div className='card-container' onClick={() => onModalToggle(movie)}>
                <div className='card-img-container'>
                    <img className='card-img' src={imageURL}/>
                </div>
                <div className='card-info'>
                    <h2>{movie.title}</h2>
                    <h3>{movie.vote_average}</h3>
                </div>
            </div>
        </>
    )
}

export default MovieCard;
