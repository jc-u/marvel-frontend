import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Header from "./components/Header";

// Pages
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import Character from "./pages/Character";
import Comics from "./pages/Comics";
import Comic from "./pages/Comic";
import Favorites from "./pages/Favorites";

// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart as fasFaHeart } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faHeart as fasrFaHeart } from "@fortawesome/free-regular-svg-icons";
library.add(
	fasFaHeart,
	fasrFaHeart,
	faAngleRight,
	faAngleLeft,
	faMagnifyingGlass
);

function App() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/personnages" element={<Characters />} />
				<Route path="/personnages/:id" element={<Character />} />
				<Route path="/comics" element={<Comics />} />
				<Route path="/comics/:id" element={<Comic />} />
				<Route path="/favoris" element={<Favorites />} />
				<Route path="*" element={<h1>Not Found</h1>} />
			</Routes>
		</Router>
	);
}

export default App;
