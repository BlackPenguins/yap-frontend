const initMap = (categories, map, google) => {
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
	};
};

export default initMap;
