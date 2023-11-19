import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ComicCard = ({ comic, isFavorite, handleToggleFavorite }) => {
	const getImagePath = (type, comic) => {
		const baseImagePath = comic.thumbnail.path;
		const extension = comic.thumbnail.extension;

		// Get screen width
		const windowWidth = window.innerWidth;

		// Image path according to screen widthn
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

	return (
		<div className="comics-card">
			<Link to={`/comics/${comic._id}`}>
				<div className="comic-card card neon-border">
					<img
						src={getImagePath(comic.type, comic)}
						alt={comic.name}
						onError={(e) => {
							e.target.src = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
						}}
					/>
					<h3>{comic.title}</h3>
					<div className="comic-description">
						{comic.description && <p> {comic.description}</p>}
					</div>
				</div>
			</Link>
			<FontAwesomeIcon
				icon={isFavorite ? ["fas", "heart"] : ["far", "heart"]}
				onClick={() =>
					handleToggleFavorite(comic._id, {
						type: "comic",
						name: comic.title,
						description: comic.description,
						thumbnail: {
							path: comic.thumbnail.path,
							extension: comic.thumbnail.extension,
						},
					})
				}
			/>
		</div>
	);
};

export default ComicCard;
