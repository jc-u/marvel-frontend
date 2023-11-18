import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "../components/Pagination";

const Comics = () => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [totalPages, setTotalPages] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const [favorites, setFavorites] = useState({});

	const customSort = (a, b) => {
		// Function to extract the letter part of the title
		const getLetterPart = (str) => str.replace(/[0-9]/g, "");

		const letterPartA = getLetterPart(a.title.toUpperCase());
		const letterPartB = getLetterPart(b.title.toUpperCase());

		// Comparison of letter parts by title
		if (letterPartA < letterPartB) {
			return -1;
		}
		if (letterPartA > letterPartB) {
			return 1;
		}
		return 0; // Letter parts are equal
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

	const getImagePath = (type, comic) => {
		const baseImagePath = comic.thumbnail.path;
		const extension = comic.thumbnail.extension;

		// Get screen width
		const windowWidth = window.innerWidth;

		// Image path according to screen widthn
		let imagePath;
		if (windowWidth < 600) {
			imagePath = `${baseImagePath}/portrait_medium.${extension}`;
		} else if (windowWidth < 1200) {
			imagePath = `${baseImagePath}/portrait_xlarge.${extension}`;
		} else {
			imagePath = `${baseImagePath}/portrait_fantastic.${extension}`;
		}

		return imagePath;
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
										<div className="comic-card card neon-border">
											<img
												src={getImagePath(comic.type, comic)}
												alt={comic.name}
												onError={(e) => {
													e.target.src = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
												}}
											/>
											<h3>{comic.title}</h3>
											<div className="comic-description">
												{comic.description && <p> {comic.description}</p>}
											</div>
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
				<Pagination
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					data={data}
				/>
			</div>
		</>
	);
};

export default Comics;
