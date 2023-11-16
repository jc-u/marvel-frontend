import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Characters = () => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [totalPages, setTotalPages] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const [favorites, setFavorites] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`https://site--marvel-backend--tfb724g8njkw.code.run/marvel/characters?limit=100&skip=${
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

	const handlePageChange = (newPage) => {
		setCurrentPage(newPage);
	};

	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
	};

	return isLoading ? (
		<p>Loading...</p>
	) : (
		<div className="container-characters">
			<h1>Personnages</h1>
			<div className="search-bar">
				<input
					type="text"
					placeholder="Recherche par nom"
					value={searchTerm}
					onChange={handleSearch}
				/>
				<FontAwesomeIcon icon="magnifying-glass" />
			</div>
			<div className="characters">
				{data.map((character) => {
					return (
						<div key={character._id} className="characters-card ">
							<>
								<Link to={`/personnages/${character._id}`}>
									<div className="character-card card">
										<h2>{character.name}</h2>
										<img
											src={`${character.thumbnail.path}/standard_medium.${character.thumbnail.extension}`}
											alt={character.name}
										/>

										<p>{character.description}</p>
									</div>
								</Link>
							</>
							<FontAwesomeIcon
								icon={
									favorites[character._id] ? ["fas", "heart"] : ["far", "heart"]
								}
								onClick={() =>
									handleToggleFavorite(character._id, {
										type: "character",
										name: character.name,
										description: character.description,
										thumbnail: {
											path: character.thumbnail.path,
											extension: character.thumbnail.extension,
										},
									})
								}
							/>
						</div>
					);
				})}
			</div>
			<div className="pagination">
				<FontAwesomeIcon
					className={currentPage === 1 ? "disabled" : ""}
					icon="angle-left"
					fade
					size="2xl"
					onClick={() => handlePageChange(currentPage - 1)}
				/>

				<span>{currentPage}</span>
				{data.length === 100 && (
					<FontAwesomeIcon
						className="pagination-icon"
						icon="angle-right"
						fade
						size="2xl"
						onClick={() => handlePageChange(currentPage + 1)}
					/>
				)}
			</div>
		</div>
	);
};
export default Characters;
