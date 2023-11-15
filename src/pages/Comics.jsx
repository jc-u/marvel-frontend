import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Comics = () => {
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
					`https://site--marvel-backend--tfb724g8njkw.code.run/marvel/comics?limit=100&skip=${
						(currentPage - 1) * 10
					}&title=${searchTerm}`
				);
				// Tri des comics par ordre alphabétique du titre
				const sortedData = response.data.results.sort((a, b) =>
					a.title.localeCompare(b.title)
				);

				setData(sortedData);
				setTotalPages(response.data.totalPages);
				setIsLoading(false);
			} catch (error) {
				console.log("Error fetching comics:", error.message);
				setIsLoading(false);
			}
		};

		fetchData();
	}, [currentPage, searchTerm]);

	console.log(favorites);

	useEffect(() => {
		// Get favorites from localStorage
		const comicFavorites = JSON.parse(
			localStorage.getItem("comicFavorites") || "{}"
		);
		setFavorites({ ...comicFavorites });
	}, []);

	const handleToggleFavorite = (id, details) => {
		// Get existing favorites from localStorage
		const existingFavorites =
			JSON.parse(localStorage.getItem("comicFavorites")) || {};

		// Toggle the favorite status
		const updatedFavorites = { ...existingFavorites };
		if (updatedFavorites[id]) {
			// Remove the comic from favorites
			delete updatedFavorites[id];
		} else {
			// Add the comic to favorites with additional details
			updatedFavorites[id] = { ...details };
		}

		// Update state and localStorage
		setFavorites(updatedFavorites);
		localStorage.setItem("comicFavorites", JSON.stringify(updatedFavorites));
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
		<>
			<div className="search-bar">
				<input
					type="text"
					placeholder="Search by name"
					value={searchTerm}
					onChange={handleSearch}
				/>
			</div>
			<div className="comics-container">
				{data.map((comic) => {
					return (
						<>
							<button
								onClick={() =>
									handleToggleFavorite(comic._id, {
										name: comic.name,
										description: comic.description,
										thumbnail: {
											path: comic.thumbnail.path,
											extension: comic.thumbnail.extension,
										},
									})
								}>
								LOVE
							</button>
							<Link to={`/comics/${comic._id}`} key={comic._id}>
								<div className="comics-card">
									<img
										src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
										alt={comic.title}
										onError={(e) => {
											e.target.src = "/path/to/placeholder-image.jpg";
										}}
									/>
									<h2>{comic.title}</h2>
									<p>{comic.description}</p>
								</div>
							</Link>
						</>
					);
				})}

				<div className="pagination">
					<button
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={currentPage === 1}>
						Previous
					</button>
					<span>{currentPage}</span>
					<button
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === totalPages}>
						Next
					</button>
				</div>
			</div>
		</>
	);
};

export default Comics;
