import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import Character from "./pages/Character";
import Comics from "./pages/Comics";
import "./App.css";

function App() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/personnages" element={<Characters />} />
				<Route path="/personnages/:id" element={<Character />} />
				<Route path="/comics" element={<Comics />} />
				<Route path="/favoris" element={<h1>Favoris</h1>} />
				<Route path="*" element={<h1>Not Found</h1>} />
			</Routes>
		</Router>
	);
}

export default App;
