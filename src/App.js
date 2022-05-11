import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

const App = () => {
	const [movies, setMovies] = useState([]);
	const [favourites, setFavourites] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	const getMovieRequest = async (searchValue) => {
		const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=bbd297e5`

		const response = await fetch(url);
		const responseJson = await response.json();
		
		if(responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

	useEffect(() =>{
		getMovieRequest(searchValue);
	}, [searchValue]);

	const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
	};

	const RemoveFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite)=> favourite.imdbID !== movie.imdbID
		);

		setFavourites(newFavouriteList);
	};

	return (
		<div className='container-fluid movie-app'>
			<div className='row'>
				<MovieListHeading heading="Chewie's Movies" />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieList movies={movies} handleFavouritesClick={addFavouriteMovie} favouriteComponent={AddFavourites} />
			</div>
			<div className='container-fluid movie-app'>
				<MovieListHeading heading="Favorites" />
			</div>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieList movies={favourites} handleFavouritesClick={RemoveFavouriteMovie} favouriteComponent={RemoveFavourites} />
			</div>

		</div>
	);
};

export default App;
