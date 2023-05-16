const InfoIcons = ({ location }) => {
	const images = [];

	if (location.HasWifi) {
		images.push(<img key="wifi" alt="wifi" id="details-wifi" src="images/symbols/wifi.png" />);
	}

	if (location.HasCashOnly) {
		images.push(<img key="cash" alt="cash" id="details-cash-only" src="images/symbols/cash_only.png" />);
	}

	if (location.HasVegan) {
		images.push(<img key="vegan" alt="vegan" id="details-vegan" src="images/symbols/vegan.png" />);
	}

	if (location.HasVegetarian) {
		images.push(<img key="veg" alt="veg" id="details-vegetarian" src="images/symbols/vegetarian.png" />);
	}

	if (location.HasGlutenFree) {
		images.push(<img key="gluten" alt="gluten" id="details-gluten-free" src="images/symbols/gluten_free.png" />);
	}

	if (location.HasLactoseFree) {
		images.push(<img key="lactose" alt="lactose" id="details-lactose-free" src="images/symbols/lactose_free.png" />);
	}

	if (location.HasTakeout) {
		images.push(<img key="takeout" alt="takeout" id="details-takeout" src="images/symbols/takeout.png" />);
	}

	return <>{images}</>;
};

export default InfoIcons;
