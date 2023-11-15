import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Comics = () => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [totalPages, setTotalPages] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");

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
				console.log("Error fetching characters:", error.message);
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

	console.log(data);

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
