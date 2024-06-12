import '../styles/MovieList.css';
import { useState, useEffect } from 'react';
import MovieCard from './MovieCard.jsx';

const MovieList = () => {

    const [data, setData] = useState(undefined);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [displaySearch, setDisplaySearch] = useState(false);

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TOKEN_AUTH}`
        }
    };

    const reset = () => {
        setPage(1);
        setData(undefined);
    }

    const fetchData = async (URL) => {
        console.log('fetching page: ' + page);
        const resp = await fetch(URL + page.toString(), options);

        const Data = await resp.json();

        if (page === 1){
            reset();
            setData(Data.results);
        } else {
            const IDs = data?.map(item => item.id);
            const filteredData = Data.results?.filter(item => !IDs?.includes(item.id));
            setData(prevData => [...prevData, ...filteredData]);
        }
    }

    useEffect(() => {
        console.log('use effect page trigger: ' + page);
        if(!displaySearch){
            console.log('displaySearch fetch page: ' + page);
            fetchData('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=');
        } else {
            fetchData(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&language=en-US&page=`);
        }
    }, [page]);

    const handleLoadMore = () => {
        setPage(page + 1);

    }

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleSearchSubmit = () => {
        setPage(1);
        if(searchQuery === ''){
            reset();
        } else {
            fetchData(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&language=en-US&page=`);
        }
    }

    const handleNowPlaying = () => {
        setDisplaySearch(false);
        reset();
    }

    const handleSearchButton = () => {
        reset();
        setDisplaySearch(true);
    }

    return (
        <div>
            <div className='switch-buttons-container'>
                <button className='switch-now-playing' onClick={handleNowPlaying}>Now Playing</button>
                <button className='switch-search' onClick={handleSearchButton}>Search</button>
            </div>
            <div className={`search-bar-container ${displaySearch ? '' : 'search-bar-container-hide'}`}>
                <input className='search-bar' type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search for a movie..."/>
                <button className='search-bar-submit' onClick={handleSearchSubmit}>Submit</button>
            </div>
            <div className='movie-list-container'>
                {data?.map((movie) => {
                    return (
                        <MovieCard key={movie.id} props={movie}/>
                    )
                })}
            </div>
            <div className='movie-load-button-container'>
                <button className='movie-load-button' onClick={handleLoadMore}>Load More</button>
            </div>
        </div>
    )
}

export default MovieList;
