import './App.css';
import { Col, Row } from 'reactstrap';
import { useCallback, useEffect, useState } from 'react';
import initializeMap from './HomePage/InitializeMap';
import CategoryCard from './HomePage/CategoryCard';
import DetailsSection from './HomePage/DetailsSections';

/**
 * Create React App:
 * 1) npx create-react-app yap
 * 2) npm install reactstrap
 * 3) Include CSS in index.html
 * 4) npm start
 */
const google = window.google;
var map = null;

const HomePage = ({ distanceFilter, multiFilter }) => {
	const [currentLocation, setCurrentLocation] = useState({});

	const fetchLocations = useCallback(async () => {
		const response = await fetch(`http://localhost:4590/categoryGroups`);
		const locations = await response.json();
		console.log('Retrieved Locations from Server', locations);
		setLocations(locations);
		google.maps.event.addDomListener(window, 'load', initializeMap(locations, map, google));
	}, []);

	useEffect(() => {
		fetchLocations();
	}, [fetchLocations]);

	const [locations, setLocations] = useState([]);

	console.log('locations', locations);
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
								key={location.LocationID}
								map={map}
								locationCollection={location}
								setCurrentLocation={setCurrentLocation}
								distanceFilter={distanceFilter}
								multiFilter={multiFilter}
							/>
						);
					})}
				</Col>
				<Col lg={9}>
					<DetailsSection currentLocation={currentLocation} />
					<Row>
						<div id="google-map">Loading map...</div>
					</Row>
				</Col>
			</Row>
		</>
	);
};

export default HomePage;
