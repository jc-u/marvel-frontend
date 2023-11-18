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

	const getImagePath = (type, comic) => {
		const baseImagePath = comic.thumbnail.path;
		const extension = comic.thumbnail.extension;

		// Obtenir la largeur de l'écran
		const windowWidth = window.innerWidth;

		// Chemin d'image en fonction de la largeur de l'écran
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

	return isLoading ? (
		<p>Loading...</p>
	) : (
		<Link to={`/comics/${comic}`} key={comic._id}>
			<div className="comic-card card">
				<img
					src={getImagePath(data.type, data)}
					alt={data.title}
					onError={(e) => {
						e.target.src = `${data.thumbnail.path}.${data.thumbnail.extension}`;
					}}
				/>
				<h3>{data.title}</h3>
				<p>{data.description}</p>
			</div>
		</Link>
	);
};

export default CharacterComic;
