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
					`https://site--marvel--gkd8pqzc29vb.code.run/marvel/character/${id}`
				);
				setData(response.data);
				setIsLoading(false);
			} catch (error) {
				console.log(error.message);
			}
		};
		fetchData();
	}, [id]);

	return isLoading ? (
		<p>Loading...</p>
	) : (
		<div className="character-container">
			<img
				className="background"
				src={`${data.thumbnail.path}/portrait_uncanny.${data.thumbnail.extension}`}
				alt={data.name}
			/>
			<h1>{data.name}</h1>
			<p>{data.description}</p>
			<div className="character">
				{data.comics.map((comic) => (
					<CharacterComic key={comic} comic={comic} />
				))}
			</div>
		</div>
	);
};

export default Character;
