import { useState, useEffect } from "react";
import axios from "axios";

const CharacterComic = ({ comic }) => {
	console.log(comic);
	const [data, setData] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`https://site--marvel-backend--tfb724g8njkw.code.run/marvel/comic/${comic}`
				);
				setData(response.data);
				setIsLoading(false);
			} catch (error) {
				console.log(error.message);
			}
		};
		fetchData();
	}, [comic]);

	console.log(data);

	return isLoading ? (
		<p>Loading...</p>
	) : (
		<div className="comic-card">
			<h2>{data.title}</h2>
			<img
				src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
				alt={data.title}
			/>
			<p>{data.description}</p>
		</div>
	);
};

export default CharacterComic;
