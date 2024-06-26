import { useState, useEffect } from 'react';
import '../styles/Modal.css';

const Modal = ({movieID, onModalToggle}) => {
    const [movie, setMovie] = useState(undefined);
    const [youtube, setYoutube] = useState(undefined);

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN_AUTH}`
        }
    };

    const fetchMovie = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?language=en-US`, options);
        const responseYT = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/videos?language=en-US`, options);
        const data = await response.json();
        const dataYT = await responseYT.json();
        setMovie(data);
        setYoutube(dataYT.results[0].key);
    }

    useEffect(() => {
        fetchMovie();
    }, [])

    const imageURL = `http://image.tmdb.org/t/p/original`;

    return (
        <div className='modal-container'>
            <div className="modal-overlay" onClick={onModalToggle}>
            </div>
            <div className='modal-content'>
                <div className='modal-content-img-text'>
                    <div className='modal-main-content'>
                        <div>
                            <h1>{movie?.title}</h1>
                        </div>
                        <div>
                            <img className='modal-poster' src={`${imageURL}${movie?.poster_path}`} alt=""/>
                        </div>
                    </div>
                    <div className='modal-description-content-container'>
                        <div className='modal-description-content'>
                            <div>
                                <h2>Release Date</h2>
                                <p>{movie?.release_date}</p>
                            </div>
                            <div>
                                <h2>Overview</h2>
                                <p>{movie?.overview}</p>
                            </div>
                            <div>
                                <h2>Genre</h2>
                                <p>{movie?.genres.map(item => item.name).join(', ')}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h2>Trailer</h2>
                    <iframe className='trailer' src={`https://www.youtube.com/embed/${youtube}?si=PiOSpkScLbVDwND8`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    )
}

export default Modal;
