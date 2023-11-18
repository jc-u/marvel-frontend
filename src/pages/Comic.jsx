import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Comic = () => {
	const [data, setData] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	const { id } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`https://site--marvel-backend--tfb724g8njkw.code.run/marvel/comic/${id}`
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
		<div className="comic-container">
			<img
				className="background"
				src={`${data.thumbnail.path}/portrait_uncanny.${data.thumbnail.extension}`}
				alt={data.name}
			/>
			<h1>{data.title}</h1>
			<div className="comic">
				<p>{data.description}</p>
			</div>
		</div>
	);
};

export default Comic;
