import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavorites from './components/AddFavorites';
import RemoveFavorites from './components/RemoveFavorites';

const App = () => {
	const [movies, setMovies] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	//Nothing to see here, bbd 297 e 5, bingo bongo
	const getMovieRequest = async (searchValue) => {
		const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=aaa111a9`

		const response = await fetch(url);
		const responseJson = await response.json();
		
		if(responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

	useEffect(() =>{
		getMovieRequest(searchValue);
	}, [searchValue]);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favorites', JSON.stringify(items))
	};

	const addFavoriteMovie = (movie) => {
		const newFavoriteList = [...favorites, movie];
		setFavorites(newFavoriteList);
		saveToLocalStorage(newFavoriteList);
	};

	const RemoveFavoriteMovie = (movie) => {
		const newFavoriteList = favorites.filter(
			(favorite)=> favorite.imdbID !== movie.imdbID
		);

		setFavorites(newFavoriteList);
	};

	return (
		<div className='container-fluid movie-app'>
			<div className='row'>
				<MovieListHeading heading="Chewie's Movies" />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieList movies={movies} handleFavoritesClick={addFavoriteMovie} favoriteComponent={AddFavorites} />
			</div>
			<div className='container-fluid movie-app'>
				<MovieListHeading heading="Favorites" />
			</div>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieList movies={favorites} handleFavoritesClick={RemoveFavoriteMovie} favoriteComponent={RemoveFavorites} />
			</div>

		</div>
	);
};

export default App;

