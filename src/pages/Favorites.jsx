import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Favorites = () => {
	const [favorites, setFavorites] = useState({});

	useEffect(() => {
		// Get favorites from localStorage
		const characterFavorites = JSON.parse(
			localStorage.getItem("characterFavorites") || "{}"
		);
		const comicFavorites = JSON.parse(
			localStorage.getItem("comicFavorites") || "{}"
		);
		setFavorites({ ...characterFavorites, ...comicFavorites });
	}, []);

	console.log(favorites);

	const getImagePath = (id, type) => {
		const baseImagePath = favorites[id].thumbnail.path;
		const extension = favorites[id].thumbnail.extension;
		const windowWidth = window.innerWidth;
		let imagePath;

		if (windowWidth < 600) {
			imagePath =
				type === "character"
					? `${baseImagePath}/standard_medium.${extension}`
					: `${baseImagePath}/portrait_medium.${extension}`;
		} else if (windowWidth < 1200) {
			imagePath = `${baseImagePath}/standard_xlarge.${extension}`;
		} else if (windowWidth > 1200) {
			imagePath = `${baseImagePath}/standard_fantastic.${extension}`;
		} else {
			imagePath = `${baseImagePath}/portrait_fantastic.${extension}`;
		}

		return imagePath;
	};

	return (
		<div className="container-favorites">
			<h1>Favorites</h1>
			<div className="favorites">
				<h2>Personnages</h2>
				<div className="characters">
					{Object.keys(favorites).map(
						(id) =>
							favorites[id].type === "character" && (
								<Link to={`/personnages/${id}`} key={id}>
									<div className="favorite-card card">
										<h3>{favorites[id].name}</h3>
										<img
											src={getImagePath(id, favorites[id].type)}
											alt={favorites[id].name}
										/>

										<p>{favorites[id].description}</p>
									</div>
								</Link>
							)
					)}
				</div>

				<h2>Comics</h2>
				<div className="comics">
					{Object.keys(favorites).map(
						(id) =>
							favorites[id].type === "comic" && (
								<Link to={`/comics/${id}`} key={id}>
									<div className="favorite-card card">
										<img
											src={getImagePath(id, favorites[id].type)}
											alt={favorites[id].title}
										/>
										<h3>{favorites[id].name}</h3>
										<p>{favorites[id].description}</p>
									</div>
								</Link>
							)
					)}
				</div>
			</div>
		</div>
	);
};

export default Favorites;
