import '../styles/MovieList.css';
import { useState, useEffect } from 'react';
import MovieCard from './MovieCard.jsx';
import Modal from './Modal.jsx';


const MovieList = (props) => {

    const [data, setData] = useState(undefined);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [displaySearch, setDisplaySearch] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMovie, setModalMovie] = useState(undefined);
    const [genresList, setGenresList] = useState(undefined);
    const [genre, setGenre] = useState('');
    const [sort, setSort] = useState('');
    const [wholeData, setWholeData] = useState(undefined);
    //const [likedMovies, setLikedMovies] = useState([]);
    //const [watchedMovies, setWatchedMovies] = useState([]);

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TOKEN_AUTH}`
        }
    };

    const sortMoviesSearch = () => {
        if(sort === 'popularity.desc'){
            setData(wholeData?.sort((a, b) => (b.popularity - a.popularity)));
        } else if(sort === 'original_title.asc'){
            setData(wholeData?.sort((a, b) => (a.original_title > b.original_title ? 1 : -1)));
        } else if(sort === 'vote_average.desc'){
            setData(wholeData?.sort((a, b) => (b.vote_average - a.vote_average)));
        } else if(sort === 'vote_average.asc'){
            setData(wholeData?.sort((a, b) => (a.vote_average - b.vote_average)));
        }
    }

    const fetchData = async (URL) => {
        const resp = await fetch(URL + page.toString(), options);
        const Data = await resp.json();

        if (page === 1){
            setData(Data.results);
            setWholeData(Data.results);

            if(genre !== 'Genre'){
                setData(Data.results?.filter(item => item?.genre_ids?.includes(parseInt(genre))));
            } else if(sort !== "Sort"){
                sortMoviesSearch();
            }
        } else {
            setWholeData(prevData => [...prevData, ...filteredData]);
            setData(prevData => [...prevData, ...filteredData]);
            const IDs = wholeData?.map(item => item.id);
            const filteredData = Data.results?.filter(item => !IDs?.includes(item.id));

            if(genre !== 'Genre'){
                setData(wholeData.filter(item => item?.genre_ids?.includes(parseInt(genre))));
            } else if(sort !== "Sort"){
                sortMoviesSearch();
            }
        }
    }

    const fetchDataFiltered = async (URL) => {
        URL += page.toString();
        if(genre !== 'Genre'){
            URL += `&with_genres=${genre}`;
        }
        if(sort !== "Sort"){
            URL += `&sort_by=${sort}`;
        }


        const resp = await fetch(URL, options);

        const Data = await resp.json();

        if (page === 1){
            setData(Data.results);
        } else {
            const IDs = data?.map(item => item.id);
            const filteredData = Data.results?.filter(item => !IDs?.includes(item.id));
            setData(prevData => [...prevData, ...filteredData]);
        }

    }

    const fetchGenresList = async () => {
        const resp = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options);

        const Data = await resp.json();

        setGenresList(Data.genres);
    }

    useEffect(() => {
        if(searchQuery===''){
            if(genre !== 'Genre' || sort !== 'Sort'){
                fetchDataFiltered('https://api.themoviedb.org/3/discover/movie?language=en-US&page=');
            } else if (genre === 'Genre' && sort === 'Sort'){
                fetchData('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=');
            }
        } else {
            fetchData(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&language=en-US&page=`);
        }
    }, [page, genre, sort]);

    useEffect(() => {
        fetchGenresList();
    }, []);

    const handleLoadMore = () => {
        setPage(prevpage => prevpage + 1);
    }

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleSearchSubmit = () => {
        setPage(1);
        setGenre('Genre');
        setSort('Sort');
        setData(undefined);
        if(searchQuery === ''){
            setData(undefined);
        } else {
            fetchData(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&language=en-US&page=`);
        }
    }

    const handleNowPlaying = () => {
        setDisplaySearch(false);
        setSearchQuery('');
        setGenre('Genre');
        setSort('Sort');
        if(page === 1){
            fetchData('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=');
        } else {
            setData(undefined);
            setPage(1);
        }
    }

    const handleSearchButton = () => {
        setDisplaySearch(true);
        setGenre('Genre');
        setSort('Sort');
        setSearchQuery(' ');
        setData(undefined);
        setPage(1);
    }

    const toggleModal = (movie) => {
        if(modalOpen){
            setModalOpen(false);
        } else {
            setModalOpen(!modalOpen);
            setModalMovie(movie.id);
        }
    }

    const genreOnChange = (e) => {
        setGenre(e.target.value);
        setPage(1);
    }

    const sortOnChange = (e) => {
        setSort(e.target.value);
        setPage(1);
    }

    const onLikedFunction = (movie, liked) => {
        props.onLiked(movie, liked);
    }

    const onWatchedFunction = (movie, watched) => {
        props.onWatched(movie, watched);
    }

    return (
        <div>
            <div className='switch-buttons-container'>
                <button className='switch-now-playing' onClick={handleNowPlaying}>Now Playing</button>
                <button className='switch-search' onClick={handleSearchButton}>Search</button>
            </div>
            <div className='inputs-container'>
            <div className={`search-bar-container ${displaySearch ? '' : 'search-bar-container-hide'}`}>
                    <input className='search-bar' type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search for a movie..."/>
                    <button className='search-bar-submit' onClick={handleSearchSubmit}>Submit</button>
                </div>
                <div>
                    <select onChange={genreOnChange} value={genre}>
                        <option value="Genre">Genre</option>
                        {genresList?.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <select onChange={sortOnChange} value={sort}>
                        <option value="Sort">Sort By</option>
                        <option value="popularity.desc">Popularity</option>
                        <option value="original_title.asc">Title</option>
                        <option value="vote_average.desc">Highest Rated</option>
                        <option value="vote_average.asc">Lowest Rated</option>
                    </select>
                </div>
            </div>
            <div className='movie-list-container'>
                {data?.map((movie) => {
                    return (
                        <MovieCard key={movie.id} props={movie} onModalToggle={toggleModal} onLikedFunction={onLikedFunction} onWatchedFunction={onWatchedFunction}/>
                    )
                })}
            </div>
            <div className='movie-load-button-container'>
                <button className='movie-load-button' onClick={handleLoadMore}>Load More</button>
            </div>
            {modalOpen && <Modal movieID={modalMovie} onModalToggle = {toggleModal}/>}
        </div>
    )
}

/*
<div className='switch-buttons-container'>
    <button className='switch-now-playing' onClick={handleNowPlaying}>Now Playing</button>
    <button className='switch-search' onClick={handleSearchButton}>Search</button>
</div>
<div className={`search-bar-container ${displaySearch ? '' : 'search-bar-container-hide'}`}>
*/

export default MovieList;
