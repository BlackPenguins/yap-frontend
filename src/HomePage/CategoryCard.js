import { Card, CardHeader, ListGroup, ListGroupItem } from 'reactstrap';
import InfoIcons from './InfoIcons';

const CategoryCard = ({ map, locationCollection, setCurrentLocation, distanceFilter, multiFilter }) => {
	return (
		<Card>
			<CardHeader className="location-category">{locationCollection.categoryName}</CardHeader>
			<ListGroup flush>
				{locationCollection.locations.map((location) => {
					const setLocationAs = () => {
						setCurrentLocation(location);
						if (location.Longitude && location.Latitude) {
							if (map) {
								map.panTo({ lat: location.Latitude, lng: location.Longitude });
							}
						}
					};

					if (distanceFilter != null && location.Distance !== distanceFilter) {
						return null;
					}

					if (isNoActiveFilters(multiFilter, location)) {
						return null;
					}

					return (
						<ListGroupItem key={location.LocationID} className="location" onClick={setLocationAs}>
							<div className="top-line">
								<div className="name">{location.Name}</div>
								<div className="distance">{location.Distance}</div>
							</div>

							<div className="description">{location.Description}</div>

							<div id="location-description" className="location-description"></div>
							<div className="location-images">
								<InfoIcons location={location} />
							</div>
						</ListGroupItem>
					);
				})}
			</ListGroup>
		</Card>
	);
};

const isNoActiveFilters = (multiFilter, location) => {
	if (multiFilter.length === 0) {
		return false;
	}

	for (const filter of multiFilter) {
		if (filter === 'hasWifi' && location.HasWifi) {
			return false;
		}
		if (filter === 'hasCashOnly' && location.HasCashOnly) {
			return false;
		}
		if (filter === 'hasVegan' && location.HasVegan) {
			return false;
		}
		if (filter === 'hasVegetarian' && location.HasVegetarian) {
			return false;
		}
		if (filter === 'hasGlutenFree' && location.HasGlutenFree) {
			return false;
		}
		if (filter === 'hasLactoseFree' && location.HasLactoseFree) {
			return false;
		}
		if (filter === 'hasTakeout' && location.HasTakeout) {
			return false;
		}
	}

	return true;
};

export default CategoryCard;
