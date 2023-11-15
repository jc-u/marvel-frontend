import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Characters = () => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [totalPages, setTotalPages] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");

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
			} catch (error) {
				console.error("Error fetching characters:", error.message);
				setIsLoading(false);
			}
		};

		fetchData();
	}, [currentPage, searchTerm]);

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
			<h1>Characters</h1>
			<div className="search-bar">
				<input
					type="text"
					placeholder="Search by name"
					value={searchTerm}
					onChange={handleSearch}
				/>
			</div>
			<div className="characters">
				{data.map((character) => (
					<Link to={`/personnages/${character._id}`} key={character._id}>
						<div className="characters-card">
							<img
								src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
								alt={character.name}
								onError={(e) => {
									e.target.src = "/path/to/placeholder-image.jpg";
								}}
							/>
							<h2>{character.name}</h2>
							<p>{character.description}</p>
						</div>
					</Link>
				))}
			</div>
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
	);
};
export default Characters;
