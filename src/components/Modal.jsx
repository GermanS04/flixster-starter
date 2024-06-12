import { useState, useEffect } from 'react';
import '../styles/Modal.css';

const Modal = ({movieID, onModalToggle}) => {
    const [movie, setMovie] = useState(undefined);

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN_AUTH}`
        }
    };

    const fetchMovie = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?language=en-US`, options);
        const data = await response.json();
    }

    useEffect(() => {
        fetchMovie()
    }, [])

    return (
        <div className="modal-overlay" onClick={onModalToggle}>

        </div>
    )
}

export default Modal;
