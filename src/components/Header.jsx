import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

const Header = () => {
	return (
		<header>
			<div className="container-header">
				<Link to="/" className="logo">
					<img src={logo} alt="marvel" />
				</Link>
				<nav>
					<Link to="/personnages">Personnages</Link>
					<Link to="/comics">Comics</Link>
					<Link to="/favoris">Favoris</Link>
				</nav>
			</div>
		</header>
	);
};

export default Header;
