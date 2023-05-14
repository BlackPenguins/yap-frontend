import { useCallback, useContext, useEffect, useState } from 'react';
import { Button, Table } from 'reactstrap';
import './AdminPage.css';
import EnabledIcon from './AdminPage/EnabledIcon';
import EditLocationModal from './AdminPage/EditLocationModal';
import { Navigate } from 'react-router-dom';
import AuthContext from './store/auth-context';

const AdminPage = () => {
	const authContext = useContext(AuthContext);
	const fetchLocations = useCallback(async () => {
		const response = await fetch(`/api/locations`);
		const locations = await response.json();
		console.log('Retrieved Locations from Server', locations);
		setLocations(locations);
	}, []);

	useEffect(() => {
		fetchLocations();
	}, [fetchLocations]);

	const [locations, setLocations] = useState([]);
	const [showEditLocationModal, setShowEditLocationModal] = useState(false);

	const hideEditLocationModalHandler = () => setShowEditLocationModal(false);
	const [currentEditLocation, setCurrentEditLocation] = useState(null);

	const showAddLocationModalHandler = () => {
		setShowEditLocationModal(true);
		setCurrentEditLocation(null);
	};

	if (!authContext.isAdmin) {
		// Kick their butt back home
		return <Navigate to="/home" />;
	}

	return (
		<>
			{showEditLocationModal && (
				<EditLocationModal currentEditLocation={currentEditLocation} fetchLocations={fetchLocations} closeModalHandler={hideEditLocationModalHandler} />
			)}
			<Button onClick={showAddLocationModalHandler}>Add</Button>
			<Table bordered striped>
				<thead>
					<tr>
						<th>Name</th>
						<th>Category</th>
						<th>Distance</th>
						<th>Abbreviation</th>
						<th>Latitude</th>
						<th>Longitude</th>
						<th>Quadrant</th>
						<th>Vegan</th>
						<th>Vegetarian</th>
						<th>Gluten-Free</th>
						<th>Lactose-Free</th>
						<th>Takeout</th>
						<th>Wifi</th>
						<th>Cash-Only</th>
						<th>Is Plan</th>
						<th>&nbsp;</th>
					</tr>
				</thead>
				<tbody>
					{locations.map((location) => {
						const showEditLocationModalHandler = () => {
							console.log('Showing', location.Name);
							setShowEditLocationModal(true);
							setCurrentEditLocation(location);
						};

						return (
							<tr key={location.LocationID}>
								<td>{location.Name}</td>
								<td>{location.CategoryName}</td>
								<td>{location.Distance}</td>
								<td>{location.Abbreviation}</td>
								<td>{location.latitude}</td>
								<td>{location.longitude}</td>
								<td>{location.Quadrant}</td>
								<td>
									<EnabledIcon isEnabled={location.HasVegan} />
								</td>
								<td>
									<EnabledIcon isEnabled={location.HasVegetarian} />
								</td>
								<td>
									<EnabledIcon isEnabled={location.HasGlutenFree} />
								</td>
								<td>
									<EnabledIcon isEnabled={location.HasLactoseFree} />
								</td>
								<td>
									<EnabledIcon isEnabled={location.HasTakeout} />
								</td>
								<td>
									<EnabledIcon isEnabled={location.HasWifi} />
								</td>
								<td>
									<EnabledIcon isEnabled={location.HasCashOnly} />
								</td>
								<td>
									<EnabledIcon isEnabled={location.IsPlan} />
								</td>
								<td>
									<Button className="edit-book-button" onClick={showEditLocationModalHandler}>
										Edit
									</Button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</>
	);
};

export default AdminPage;
