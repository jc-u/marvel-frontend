import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Comics = () => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [totalPages, setTotalPages] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const [favorites, setFavorites] = useState({});

	const customSort = (a, b) => {
		// Fonction pour extraire la partie lettre du titre
		const getLetterPart = (str) => str.replace(/[0-9]/g, "");

		const letterPartA = getLetterPart(a.title.toUpperCase());
		const letterPartB = getLetterPart(b.title.toUpperCase());

		// Comparaison des parties lettres en fonction du titre
		if (letterPartA < letterPartB) {
			return -1;
		}
		if (letterPartA > letterPartB) {
			return 1;
		}
		return 0; // Les parties lettres sont égales
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`https://site--marvel-backend--tfb724g8njkw.code.run/marvel/comics?limit=100&skip=${
						(currentPage - 1) * 10
					}&title=${searchTerm}`
				);
				const sortedData = response.data.results.sort(customSort);

				setData(sortedData);
				setTotalPages(response.data.totalPages);
				setIsLoading(false);
				// Scroll to the top when changing the page
				window.scrollTo(0, 0);
			} catch (error) {
				console.log("Error fetching comics:", error.message);
				setIsLoading(false);
			}
		};

		fetchData();
	}, [currentPage, searchTerm]);
	console.log(data);
	console.log(favorites);
	console.log(totalPages);

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
			<div className="container-comics">
				<h1>Comics</h1>
				<div className="search-bar">
					<input
						type="text"
						placeholder="Recherche par nom"
						value={searchTerm}
						onChange={handleSearch}
					/>
					<FontAwesomeIcon icon="magnifying-glass" />
				</div>
				<div className="comics">
					{data.map((comic) => {
						return (
							<div key={comic._id} className="comics-card ">
								<>
									<Link to={`/comics/${comic._id}`} key={comic._id}>
										<div className="comic-card card">
											<img
												src={`${comic.thumbnail.path}/portrait_medium.${comic.thumbnail.extension}`}
												alt={comic.title}
												onError={(e) => {
													e.target.src = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
												}}
											/>
											<h2>{comic.title}</h2>
											<p>{comic.description}</p>
										</div>
									</Link>
								</>
								<FontAwesomeIcon
									icon={
										favorites[comic._id] ? ["fas", "heart"] : ["far", "heart"]
									}
									onClick={() =>
										handleToggleFavorite(comic._id, {
											type: "comic",
											name: comic.title,
											description: comic.description,
											thumbnail: {
												path: comic.thumbnail.path,
												extension: comic.thumbnail.extension,
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
		</>
	);
};

export default Comics;
