import './App.css';
import { Col, Row } from 'reactstrap';
import { useCallback, useEffect, useState } from 'react';
import initializeMap from './HomePage/InitializeMap';
import CategoryCard from './HomePage/CategoryCard';
import DetailsSection from './HomePage/DetailsSections';
import { Loader } from '@googlemaps/js-api-loader';

/**
 * Create React App:
 * 1) npx create-react-app yap
 * 2) npm install reactstrap
 * 3) Include CSS in index.html
 * 4) npm start
 */
const HomePage = ({ distanceFilter, multiFilter }) => {
	const loader = new Loader({
		apiKey: 'AIzaSyDUbCAuHXOxpQ3HfgfO-AXcXyZIbRQvzGY',
		version: 'weekly',
		libraries: ['places'],
	});

	const mapOptions = {
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
	};

	const [map, setMap] = useState(null);

	useEffect(() => {
		loader
			.load()
			.then(() => {
				setMap(new window.google.maps.Map(document.getElementById('google-map'), mapOptions));
			})
			.catch((e) => {
				console.error('Failed to load map: ' + e);
			});
	}, []);

	const [currentLocation, setCurrentLocation] = useState({});
	const [locations, setLocations] = useState([]);
	const [reviews, setReviews] = useState([]);

	const fetchReviews = useCallback(async (locationID) => {
		const response = await fetch(`/api/review/${locationID}`);
		const reviews = await response.json();
		console.log('Retrieved Reviews from Server', reviews);
		setReviews(reviews);
	}, []);

	const fetchLocations = useCallback(async () => {
		const response = await fetch(`/api/categoryGroups`);
		const locations = await response.json();
		console.log('Retrieved Locations from Server', locations);
		setLocations(locations);
	}, []);

	useEffect(() => {
		if (map != null && locations.length > 0) {
			var rsa_logo = 'images/rsa_logo.png';
			var mitel_logo = 'images/mitel_logo.png';

			locations.map((category) => {
				category.locations.map((location) => {
					if (location.latitude && location.longitude) {
						const infoWindow = new window.google.maps.InfoWindow({
							content: "<span style='font-weight: bold;'>" + location.Name + '</span>',
						});

						const markerInformation = {
							position: { lat: parseFloat(location.latitude), lng: parseFloat(location.longitude) },
							map,
							title: location.Name,
							label: location.Abbreviation,
						};

						console.log('Location', location);
						console.log('Marker', markerInformation);

						const marker = new window.google.maps.Marker(markerInformation);

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

			new window.google.maps.Marker({
				position: { lat: 43.155012, lng: -77.619447 },
				map: map,
				icon: rsa_logo,
			});

			new window.google.maps.Marker({
				position: { lat: 43.1600687, lng: -77.617108 },
				map: map,
				icon: mitel_logo,
			});
		}
	}, [locations, map]);

	useEffect(() => {
		fetchLocations();
	}, [fetchLocations]);

	return (
		<>
			<Row>
				<Col></Col>
			</Row>
			<Row>
				<Col className="location-section scrollarea" lg={3}>
					{locations.map((location) => {
						return (
							<CategoryCard
								key={location.categoryName}
								map={map}
								locationCollection={location}
								setCurrentLocation={setCurrentLocation}
								fetchReviews={fetchReviews}
								distanceFilter={distanceFilter}
								multiFilter={multiFilter}
							/>
						);
					})}
				</Col>
				<Col lg={9}>
					<DetailsSection currentLocation={currentLocation} reviews={reviews} fetchReviews={fetchReviews} />
					<Row>
						<div id="google-map">Loading map...</div>
					</Row>
				</Col>
			</Row>
		</>
	);
};

export default HomePage;
