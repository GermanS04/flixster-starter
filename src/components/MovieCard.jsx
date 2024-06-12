import '../styles/MovieCard.css';
import PropTypes from 'prop-types';



const MovieCard = (props) => {
    const imageURL = `http://image.tmdb.org/t/p/original${props.props.poster_path}`;

    return(
        <div>
            <div className='card-container'>
                <div className='card-img-container'>
                    <img className='card-img' src={imageURL}/>
                </div>
                <div className='card-info'>
                    <h2>{props.props.title}</h2>
                    <h3>{props.props.vote_average}</h3>
                </div>
            </div>
        </div>
    )
}

export default MovieCard;
