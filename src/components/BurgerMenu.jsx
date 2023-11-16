const BurgerMenu = ({ isOpen, toggleMenu }) => {
	return (
		<div className={`burger-menu ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
			<div className="bar"></div>
			<div className="bar"></div>
			<div className="bar"></div>
		</div>
	);
};

export default BurgerMenu;
