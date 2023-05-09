const InfoIcons = ({ location }) => {
	const images = [];

	if (location.HasWifi) {
		images.push(<img id="details-wifi" src="images/symbols/wifi.png" />);
	}

	if (location.HasCashOnly) {
		images.push(<img id="details-cash-only" src="images/symbols/cash_only.png" />);
	}

	if (location.HasVegan) {
		images.push(<img id="details-vegan" src="images/symbols/vegan.png" />);
	}

	if (location.HasVegetarian) {
		images.push(<img id="details-vegetarian" src="images/symbols/vegetarian.png" />);
	}

	if (location.HasGlutenFree) {
		images.push(<img id="details-gluten-free" src="images/symbols/gluten_free.png" />);
	}

	if (location.HasLactoseFree) {
		images.push(<img id="details-lactose-free" src="images/symbols/lactose_free.png" />);
	}

	if (location.HasTakeout) {
		images.push(<img id="details-takeout" src="images/symbols/takeout.png" />);
	}

	return <>{images}</>;
};

export default InfoIcons;
