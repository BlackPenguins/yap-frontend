const DistanceFilterButton = ({ icon, distanceName, distanceFilter, setDistanceFilter }) => {
	const classes = ['filter-button', 'distance-filter-button'];

	const setFilter = () => {
		if (distanceFilter === null) {
			setDistanceFilter(distanceName);
		} else {
			setDistanceFilter(null);
		}
	};

	if (distanceFilter !== distanceName) {
		classes.push('disabled');
	}

	return (
		<div onClick={setFilter} className={classes.join(' ')} title="Supports Wi-Fi" id="short_button">
			<i className="material-icons">{icon}</i>
		</div>
	);
};

export default DistanceFilterButton;
