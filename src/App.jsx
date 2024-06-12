import { useState, useEffect } from 'react'
import './App.css'
import MovieList from './components/MovieList'

//import.meta.env.VITE_API_KEY

const App = () => {

  return(
    <div className="App">
      <header className='App-header'>
        <h1>Flixster</h1>
      </header>
      <main>
        <MovieList />
      </main>
      <footer className='App-footer'>

      </footer>
    </div>
  )
}

export default App
