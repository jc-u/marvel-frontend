import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Characters = () => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					"https://site--marvel-backend--tfb724g8njkw.code.run/marvel/characters/"
				);
				setData(response.data.results);
				setIsLoading(false);
			} catch (error) {
				console.log("Error fetching characters:", error.message);
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	return isLoading ? (
		<p>Loading...</p>
	) : (
		<div className="container-characters">
			<h1>Characters</h1>
			<div className="characters-container">
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
		</div>
	);
};
export default Characters;
