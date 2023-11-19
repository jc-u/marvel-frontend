import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CharacterCard = ({ character, isFavorite, handleToggleFavorite }) => {
	const getImagePath = (type, character) => {
		const baseImagePath = character.thumbnail.path;
		const extension = character.thumbnail.extension;

		// Get screen width
		const windowWidth = window.innerWidth;

		// Image path according to screen width
		let imagePath;
		if (windowWidth < 600) {
			imagePath = `${baseImagePath}/standard_medium.${extension}`;
		} else if (windowWidth < 1200) {
			imagePath = `${baseImagePath}/standard_xlarge.${extension}`;
		} else {
			imagePath = `${baseImagePath}/standard_fantastic.${extension}`;
		}

		return imagePath;
	};

	return (
		<div className="characters-card">
			<Link to={`/personnages/${character._id}`}>
				<div className="character-card card neon-border">
					<h3>{character.name}</h3>
					<img
						src={getImagePath(character.type, character)}
						alt={character.name}
					/>
					<div className="character-description">
						{character.description && <p> {character.description}</p>}
					</div>
				</div>
			</Link>
			<FontAwesomeIcon
				icon={isFavorite ? ["fas", "heart"] : ["far", "heart"]}
				onClick={() =>
					handleToggleFavorite(character._id, {
						type: "character",
						name: character.name,
						description: character.description,
						thumbnail: {
							path: character.thumbnail.path,
							extension: character.thumbnail.extension,
						},
					})
				}
			/>
		</div>
	);
};

export default CharacterCard;
