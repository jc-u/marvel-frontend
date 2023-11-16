import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CharacterComic = ({ comic }) => {
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

	return isLoading ? (
		<p>Loading...</p>
	) : (
		<Link to={`/comics/${comic}`} key={comic._id}>
			<div className="comic-card card">
				<h2>{data.title}</h2>
				<img
					src={`${data.thumbnail.path}/portrait_xlarge.${data.thumbnail.extension}`}
					alt={data.title}
					onError={(e) => {
						e.target.src = `${data.thumbnail.path}.${data.thumbnail.extension}`;
					}}
				/>
				<p>{data.description}</p>
			</div>
		</Link>
	);
};

export default CharacterComic;
