const initializeMap = (categories, map, google) => {
	return () => {
		map = new google.maps.Map(document.getElementById('google-map'), {
			zoom: 17,
			center: { lat: 43.155814, lng: -77.615362 },
			// Hide clutter on the map - points of interest, bus routes
			styles: [
				{
					featureType: 'poi',
					stylers: [{ visibility: 'off' }],
				},
				{
					featureType: 'transit.station.bus',
					stylers: [{ visibility: 'off' }],
				},
			],
		});

		var rsa_logo = 'images/rsa_logo.png';
		var mitel_logo = 'images/mitel_logo.png';

		categories.map((category) => {
			category.locations.map((location) => {
				if (location.latitude && location.longitude) {
					const infoWindow = new google.maps.InfoWindow({
						content: "<span style='font-weight: bold;'>" + location.name + '</span>',
					});

					const marker = new google.maps.Marker({
						position: { lat: location.latitude, lng: location.longitude },
						map,
						title: location.name,
						label: location.abbreviation,
					});

					marker.addListener('click', () => {
						infoWindow.open({
							anchor: marker,
							map,
							shouldFocus: false,
						});
					});
				}
			});
		});

		new google.maps.Marker({
			position: { lat: 43.155012, lng: -77.619447 },
			map: map,
			icon: rsa_logo,
		});

		new google.maps.Marker({
			position: { lat: 43.1600687, lng: -77.617108 },
			map: map,
			icon: mitel_logo,
		});
	};
};

export default initializeMap;
