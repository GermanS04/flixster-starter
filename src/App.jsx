import { useState, useEffect } from 'react'
import './App.css'
import MovieList from './components/MovieList'
import Drawer from '@mui/material/Drawer';
import { FiAlignLeft } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";

//import.meta.env.VITE_API_KEY

const App = () => {
    const [likedMovies, setLikedMovies] = useState([]);
    const [watchedMovies, setWatchedMovies] = useState([]);

    const onLiked = (movie, liked) => {
      if(!liked){
          setLikedMovies(prevData => [...prevData, movie]);
      } else {
          setLikedMovies(prevData => prevData.filter((item) => item !== movie));
      }
  }

  const onWatched = (movie, watched) => {
      if(!watched){
          setWatchedMovies(prevData => [...prevData, movie]);
      } else {
          setWatchedMovies(prevData => prevData.filter((item) => item !== movie));
      }
  }

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <div className='drawer-container'>
      <div className='liked-container'>
        <h2>Liked</h2>
        <div className='sidebar-list-container'>
          {likedMovies.map((movie) => (
            <div key={movie.id} className='sidebar-movie-card'>
              <div className='sidebar-image-container'>
                <img className='sidebar-poster' src={`http://image.tmdb.org/t/p/original${movie.poster_path}`} alt=''/>
              </div>
              <div className='sidebar-poster-info'>
                <p>{movie.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='watched-container'>
        <h2>Watched</h2>
        <div className='sidebar-list-container'>
          {watchedMovies.map((movie) => (
            <div key={movie.id} className='sidebar-movie-card'>
              <div className='sidebar-image-container'>
                <img className='sidebar-poster' src={`http://image.tmdb.org/t/p/original${movie.poster_path}`} alt=''/>
              </div>
              <div className='sidebar-poster-info'>
                <p>{movie.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );


  return(
    <div className="App">
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <header className='App-header'>
        <div>
          <FiAlignLeft className='icon-three-lines' onClick={toggleDrawer(true)} size={40}/>
        </div>
        <h1>Flixster</h1>
      </header>
      <main>
        <MovieList onLiked={onLiked} onWatched={onWatched}/>
      </main>
      <footer className='App-footer'>
        <div className='footer-about'>
          <h4>
            About
          </h4>
          <p>
            Flixster is a movie app that allows you to search for movies and see details about them. You can also save movies to your liked list and watchlist.
          </p>
        </div>
        <div>
          <h4>
            Contact
          </h4>
          <p>
            germansm@meta.com
          </p>
          <a href='https://www.instagram.com/german_gsm/'>
            <FaInstagram size={30}/>
          </a>
        </div>
        <div>
          <h4>
            Copyright © 2024 Flixter
          </h4>
        </div>
      </footer>
    </div>
  )
}

export default App
