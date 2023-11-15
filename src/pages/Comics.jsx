import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Comics = () => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					"https://site--marvel-backend--tfb724g8njkw.code.run/marvel/comics/"
				);

				// Tri des comics par ordre alphabétique du titre
				const sortedData = response.data.results.sort((a, b) =>
					a.title.localeCompare(b.title)
				);

				setData(sortedData);
				setIsLoading(false);
			} catch (error) {
				console.log("Error fetching characters:", error.message);
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	console.log(data);

	return isLoading ? (
		<p>Loading...</p>
	) : (
		<div className="container-comics">
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
		</div>
	);
};

export default Comics;
