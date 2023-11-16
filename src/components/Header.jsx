import { useState } from "react";
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

	return (
		<header>
			<div className="container-header">
				<Link to="/" className="logo" onClick={closeMenu}>
					<img src={logo} alt="marvel" />
				</Link>
				<nav>
					<Link to="/personnages">Personnages</Link>
					<Link to="/comics">Comics</Link>
					<Link to="/favoris">Favoris</Link>
				</nav>
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
		</header>
	);
};

export default Header;
