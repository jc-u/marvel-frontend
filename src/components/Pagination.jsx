import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Pagination = ({ currentPage, setCurrentPage, data }) => {
	console.log(data, currentPage);

	const handlePageChange = (newPage) => {
		setCurrentPage(newPage);
	};

	return (
		<div className="pagination">
			<FontAwesomeIcon
				className={currentPage === 1 ? "disabled" : ""}
				icon="angle-left"
				fade
				size="2xl"
				onClick={() => handlePageChange(currentPage - 1)}
			/>

			<span>{currentPage}</span>

			{data.length === 100 && (
				<FontAwesomeIcon
					className="pagination-icon"
					icon="angle-right"
					fade
					size="2xl"
					onClick={() => handlePageChange(currentPage + 1)}
				/>
			)}
		</div>
	);
};

export default Pagination;
