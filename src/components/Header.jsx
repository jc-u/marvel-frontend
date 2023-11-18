import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import BurgerMenu from "./BurgerMenu";

const Header = () => {
	const [isMenuOpen, setMenuOpen] = useState(false);
	const toggleMenu = () => {
		setMenuOpen(!isMenuOpen);
	};

	const closeMenu = () => {
		setMenuOpen(false);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			// Closes menu if click is not inside menu
			if (isMenuOpen && !event.target.closest(".burger-menu")) {
				setMenuOpen(false);
			}
		};

		// Adds event listener to component assembly
		window.addEventListener("click", handleClickOutside);

		// Clean event listener when unmounting component
		return () => {
			window.removeEventListener("click", handleClickOutside);
		};
	}, [isMenuOpen]);

	return (
		<header>
			<div className="container-header">
				<Link to="/" className="logo" onClick={closeMenu}>
					<img src={logo} alt="marvel" />
				</Link>
				<div className={`burger-menu ${isMenuOpen ? "open" : ""}`}>
					<BurgerMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
					{isMenuOpen && (
						<div className="container-mobile neon-border">
							<nav>
								<Link to="/personnages" onClick={closeMenu}>
									Personnages
								</Link>
								<Link to="/comics" onClick={closeMenu}>
									Comics
								</Link>
								<Link to="/favoris" onClick={closeMenu}>
									Favoris
								</Link>
							</nav>
						</div>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
