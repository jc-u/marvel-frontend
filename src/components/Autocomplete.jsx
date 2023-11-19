import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Autocomplete = ({ onSearch, suggestions }) => {
	const [inputValue, setInputValue] = useState("");
	const [showSuggestions, setShowSuggestions] = useState(false);
	const autocompleteRef = useRef(null);

	const handleItemClick = (suggestion) => {
		setInputValue(suggestion);
		onSearch(suggestion); // Calls up the search function with the suggestion
		setShowSuggestions(false); // Hide suggestion list
	};

	const handleClickOutside = (event) => {
		if (
			autocompleteRef.current &&
			!autocompleteRef.current.contains(event.target)
		) {
			setShowSuggestions(false); // Hide suggestion list if clicked outside Autocomplete
		}
	};

	useEffect(() => {
		document.body.addEventListener("click", handleClickOutside);

		return () => {
			document.body.removeEventListener("click", handleClickOutside);
		};
	}, []); // Add and remove event on component assembly/disassembly

	return (
		<div ref={autocompleteRef} className="search-bar">
			<input
				type="text"
				placeholder="Recherche par nom"
				value={inputValue}
				onChange={(e) => {
					setInputValue(e.target.value);
					onSearch(e.target.value);
					setShowSuggestions(true); // Display list of suggestions during input
				}}
			/>
			<FontAwesomeIcon icon="magnifying-glass" />
			{showSuggestions && (
				<ul>
					{suggestions.map((suggestion, index) => (
						<li key={index} onClick={() => handleItemClick(suggestion)}>
							{suggestion}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Autocomplete;
