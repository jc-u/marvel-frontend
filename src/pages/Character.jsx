import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CharacterComic from "../components/CharacterComic";

const Character = () => {
	const [data, setData] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	const { id } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`https://site--marvel-backend--tfb724g8njkw.code.run/marvel/character/${id}`
				);
				setData(response.data);
				setIsLoading(false);
			} catch (error) {
				console.log(error.message);
			}
		};
		fetchData();
	}, [id]);

	console.log(data);

	return isLoading ? (
		<p>Loading...</p>
	) : (
		<div className="character-container">
			<h1>{data.name}</h1>
			<div className="character-card">
				<div className="comic-card">
					{data.comics.map((comic) => (
						<CharacterComic key={comic} comic={comic} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Character;
