const MultiFilterButton = ({ icon, filterName, multiFilter, setMultiFilter }) => {
	const classes = ['filter-button'];
	const isDisabled = multiFilter.indexOf(filterName) === -1;

	const setFilter = () => {
		if (isDisabled) {
			setMultiFilter([...multiFilter, filterName]);
		} else {
			setMultiFilter(multiFilter.filter((m) => m !== filterName));
		}
	};

	if (isDisabled) {
		classes.push('disabled');
	}

	return (
		<div onClick={setFilter} className={classes.join(' ')} title="Supports Wi-Fi" id="wifi_button">
			<img alt={icon} src={`images/symbols/${icon}.png`} />
		</div>
	);
};

export default MultiFilterButton;
