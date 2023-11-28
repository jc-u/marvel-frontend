import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";
import CharacterCard from "../components/CharacterCard";
import Autocomplete from "../components/Autocomplete";

const Characters = () => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [totalPages, setTotalPages] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const [favorites, setFavorites] = useState({});
	const [suggestions, setSuggestions] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`https://site--marvel--gkd8pqzc29vb.code.run/marvel/characters?limit=100&skip=${
						(currentPage - 1) * 100
					}&name=${searchTerm}`
				);

				setData(response.data.results);
				setTotalPages(response.data.totalPages);
				setIsLoading(false);
				// Scroll to the top when changing the page
				window.scrollTo(0, 0);
			} catch (error) {
				console.error("Error fetching characters:", error.message);
				setIsLoading(false);
			}
		};

		fetchData();
	}, [currentPage, searchTerm]);

	console.log(favorites, totalPages);

	useEffect(() => {
		// Get favorites from localStorage
		const characterFavorites = JSON.parse(
			localStorage.getItem("characterFavorites") || "{}"
		);

		setFavorites({ ...characterFavorites });
	}, []);

	const handleToggleFavorite = (id, details) => {
		// Get existing favorites from localStorage
		const existingFavorites =
			JSON.parse(localStorage.getItem("characterFavorites")) || {};

		// Toggle the favorite status
		const updatedFavorites = { ...existingFavorites };
		if (updatedFavorites[id]) {
			// Remove the character from favorites
			delete updatedFavorites[id];
		} else {
			// Add the character to favorites with additional details
			updatedFavorites[id] = { ...details };
		}

		// Update state and localStorage
		setFavorites(updatedFavorites);
		localStorage.setItem(
			"characterFavorites",
			JSON.stringify(updatedFavorites)
		);
	};

	const handleSearch = (term) => {
		setSearchTerm(term);
		// Reset page to 1 when a new search is performed
		setCurrentPage(1);
	};

	// Build a list of suggestions from character names
	useEffect(() => {
		const characterNames = data.map((character) => character.name);
		setSuggestions(characterNames);
	}, [data]);

	return isLoading ? (
		<p>Loading...</p>
	) : (
		<div className="container-characters">
			<h1>Personnages</h1>
			<Autocomplete
				onSearch={handleSearch}
				suggestions={searchTerm ? suggestions : []}
			/>

			<div className="characters">
				{data.map((character) => (
					<CharacterCard
						key={character._id}
						character={character}
						isFavorite={favorites[character._id]}
						handleToggleFavorite={handleToggleFavorite}
					/>
				))}
			</div>
			<Pagination
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				data={data}
			/>
		</div>
	);
};

export default Characters;
