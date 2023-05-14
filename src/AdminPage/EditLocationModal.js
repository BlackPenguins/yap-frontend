import { useCallback, useContext, useEffect, useState } from 'react';
import { Button, Col, FormGroup, Input, InputGroup, InputGroupText, Label, Row } from 'reactstrap';
import Modal from '../Common/Modal';
import './EditLocationModal.css';
import AuthContext from '../store/auth-context';

const EditLocationModal = ({ currentEditLocation, fetchLocations, closeModalHandler }) => {
	const authContext = useContext(AuthContext);

	const [name, setName] = useState('');
	const [categoryID, setCategoryID] = useState(0);
	const [distanceID, setDistanceID] = useState(0);
	const [cost, setCost] = useState(0);
	const [description, setDescription] = useState('');
	const [punchline, setPunchline] = useState('');
	const [abbreviation, setAbbreviation] = useState('');
	const [travelTime, setTravelTime] = useState('');
	const [waitTime, setWaitTime] = useState('');
	const [deathDate, setDeathDate] = useState('');
	const [foodType, setFoodType] = useState('');
	const [parkingType, setParkingType] = useState('');
	const [quadrant, setQuadrant] = useState('');
	const [latitude, setLatitude] = useState('');
	const [longitude, setLongitude] = useState('');
	const [menuFileName, setMenuFileName] = useState('');
	const [hasVegan, setHasVegan] = useState(false);
	const [hasVegetarian, setHasVegetarian] = useState(false);
	const [hasGlutenFree, setHasGlutenFree] = useState(false);
	const [hasLactoseFree, setHasLactoseFree] = useState(false);
	const [hasTakeout, setHasTakeout] = useState(false);
	const [hasWifi, setHasWifi] = useState(false);
	const [hasCashOnly, setHasCashOnly] = useState(false);
	const [isPlan, setIsPlan] = useState(false);

	const updateLocation = async (locationID, locationJSON) => {
		console.log('Updating location', locationJSON);

		const tokenFromStorage = authContext.token;

		const response = await fetch(`/api/locations/${locationID}`, {
			method: 'PATCH',
			body: JSON.stringify(locationJSON),
			headers: {
				// This is required. NodeJS server won't know how to read it without it.
				'Content-Type': 'application/json',
				Authorization: `Bearer ${tokenFromStorage}`,
			},
		});
		const data = await response.json();

		if (response.status === 200) {
			console.log('Location updated successfully.', data);
			closeModalHandler();
			fetchLocations();
		}
	};

	const addLocation = async (locationJSON) => {
		console.log('Updating location', locationJSON);

		// Take defaults if not configured
		if (locationJSON.categoryID === null) {
			locationJSON.categoryID = categories[0].CategoryID;
		}

		if (locationJSON.distanceID === null) {
			locationJSON.distanceID = distances[0].DistanceID;
		}

		const tokenFromStorage = localStorage.getItem('token');

		const response = await fetch(`/api/locations`, {
			method: 'PUT',
			body: JSON.stringify(locationJSON),
			headers: {
				// This is required. NodeJS server won't know how to read it without it.
				'Content-Type': 'application/json',
				Authorization: `Bearer ${tokenFromStorage}`,
			},
		});
		const data = await response.json();

		if (response.status === 200) {
			console.log('Recipe updated successfully.', data);
			closeModalHandler();
			fetchLocations();
		}
	};

	const saveLocationHandler = async () => {
		const locationJSON = {
			name,
			categoryID,
			distanceID,
			cost,
			description,
			punchline,
			abbreviation,
			travelTime,
			waitTime,
			deathDate,
			foodType,
			parkingType,
			quadrant,
			latitude,
			longitude,
			menuFileName,
			hasVegan,
			hasVegetarian,
			hasGlutenFree,
			hasLactoseFree,
			hasTakeout,
			hasWifi,
			hasCashOnly,
			isPlan,
		};

		if (currentEditLocation == null) {
			addLocation(locationJSON);
		} else {
			updateLocation(currentEditLocation.LocationID, locationJSON);
		}
	};

	useEffect(() => {
		setName(currentEditLocation?.Name);
		setCategoryID(currentEditLocation?.CategoryID || null);
		setDistanceID(currentEditLocation?.DistanceID || null);
		setCost(currentEditLocation?.cost || 1);
		setDescription(currentEditLocation?.Description);
		setPunchline(currentEditLocation?.Punchline);
		setAbbreviation(currentEditLocation?.Abbreviation);
		setTravelTime(currentEditLocation?.TravelTime || 0);
		setWaitTime(currentEditLocation?.WaitTime || 0);
		let deathDateFormatted = currentEditLocation?.DeathDate;
		if (deathDateFormatted) {
			deathDateFormatted = deathDateFormatted.split('T')[0];
		}
		setDeathDate(deathDateFormatted);
		setFoodType(currentEditLocation?.FoodType);
		setParkingType(currentEditLocation?.ParkingType);
		setQuadrant(currentEditLocation?.Quadrant);
		setLatitude(currentEditLocation?.latitude);
		setLongitude(currentEditLocation?.longitude);
		setMenuFileName(currentEditLocation?.MenuFileName);
		setIsPlan(currentEditLocation?.IsPlan === 1);
		setHasVegan(currentEditLocation?.HasVegan === 1);
		setHasVegetarian(currentEditLocation?.HasVegetarian === 1);
		setHasGlutenFree(currentEditLocation?.HasGlutenFree === 1);
		setHasLactoseFree(currentEditLocation?.HasLactoseFree === 1);
		setHasTakeout(currentEditLocation?.HasTakeout === 1);
		setHasWifi(currentEditLocation?.HasWifi === 1);
		setHasCashOnly(currentEditLocation?.HasCashOnly === 1);
	}, [currentEditLocation]);

	const [categories, setCategories] = useState([]);

	const fetchCategories = useCallback(async () => {
		const response = await fetch('/api/categories');
		const categories = await response.json();
		setCategories(categories);
	}, []);

	const [distances, setDistances] = useState([]);

	const fetchDistances = useCallback(async () => {
		const response = await fetch('/api/distances');
		const distances = await response.json();
		setDistances(distances);
	}, []);

	useEffect(() => {
		fetchCategories();
		fetchDistances();
	}, [fetchCategories, fetchDistances]);

	const categoryOptions = categories.map((category) => {
		return (
			<option key={category.CategoryID} value={category.CategoryID}>
				{category.Name}
			</option>
		);
	});

	const distanceOptions = distances.map((distance) => {
		return (
			<option key={distance.DistanceID} value={distance.DistanceID}>
				{distance.Name}
			</option>
		);
	});

	return (
		<>
			<Modal closeHandler={closeModalHandler}>
				<div className="modal-title">Add/Edit Location</div>
				<InputGroup>
					<InputGroupText>Name</InputGroupText>
					<Input
						maxLength={30}
						type="text"
						onChange={(e) => {
							setName(e.target.value);
						}}
						value={name}
					/>
				</InputGroup>
				<InputGroup>
					<InputGroupText>Category</InputGroupText>
					<Input
						type="select"
						onChange={(e) => {
							setCategoryID(e.target.value);
						}}
						value={categoryID}
					>
						{categoryOptions}
					</Input>
				</InputGroup>
				<InputGroup>
					<InputGroupText>Distance</InputGroupText>
					<Input
						type="select"
						onChange={(e) => {
							setDistanceID(e.target.value);
						}}
						value={distanceID}
					>
						{distanceOptions}
					</Input>
				</InputGroup>
				<InputGroup>
					<InputGroupText>Cost</InputGroupText>
					<Input
						type="select"
						onChange={(e) => {
							setCost(e.target.value);
						}}
						value={cost}
					>
						<option value="1">Cheap</option>
						<option value="2">Average</option>
						<option value="3">Expensive</option>
					</Input>
				</InputGroup>
				<InputGroup>
					<InputGroupText>Description</InputGroupText>
					<Input
						maxLength={250}
						type="textarea"
						rows="3"
						onChange={(e) => {
							setDescription(e.target.value);
						}}
						value={description}
					/>
				</InputGroup>
				<InputGroup>
					<InputGroupText>Punchline</InputGroupText>
					<Input
						maxLength={250}
						type="text"
						onChange={(e) => {
							setPunchline(e.target.value);
						}}
						value={punchline}
					/>
				</InputGroup>
				<Row>
					<Col>
						<InputGroup>
							<InputGroupText>Travel Time</InputGroupText>
							<Input
								type="number"
								onChange={(e) => {
									setTravelTime(e.target.value);
								}}
								value={travelTime}
							/>
						</InputGroup>
					</Col>
					<Col>
						<InputGroup>
							<InputGroupText>Wait Time</InputGroupText>
							<Input
								type="number"
								onChange={(e) => {
									setWaitTime(e.target.value);
								}}
								value={waitTime}
							/>
						</InputGroup>
					</Col>
				</Row>
				<Row>
					<Col>
						<InputGroup>
							<InputGroupText>Food Type</InputGroupText>
							<Input
								maxLength={50}
								type="text"
								onChange={(e) => {
									setFoodType(e.target.value);
								}}
								value={foodType}
							/>
						</InputGroup>
					</Col>
					<Col>
						<InputGroup>
							<InputGroupText>Death Date</InputGroupText>
							<Input
								id="exampleDate"
								name="date"
								placeholder="date placeholder"
								type="date"
								onChange={(e) => {
									setDeathDate(e.target.value);
								}}
								value={deathDate}
							/>
						</InputGroup>
					</Col>
				</Row>
				<Row>
					<Col>
						<InputGroup>
							<InputGroupText>Parking Type</InputGroupText>
							<Input
								maxLength={50}
								type="text"
								onChange={(e) => {
									setParkingType(e.target.value);
								}}
								value={parkingType}
							/>
						</InputGroup>
					</Col>
					<Col>
						<InputGroup>
							<InputGroupText>Quadrant</InputGroupText>
							<Input
								maxLength={50}
								type="text"
								onChange={(e) => {
									setQuadrant(e.target.value);
								}}
								value={quadrant}
							/>
						</InputGroup>
					</Col>
				</Row>
				<Row>
					<Col>
						<InputGroup>
							<InputGroupText>Latitude</InputGroupText>
							<Input
								maxLength={25}
								type="text"
								onChange={(e) => {
									setLatitude(e.target.value);
								}}
								value={latitude}
							/>
						</InputGroup>
					</Col>
					<Col>
						<InputGroup>
							<InputGroupText>Longitude</InputGroupText>
							<Input
								maxLength={25}
								type="text"
								onChange={(e) => {
									setLongitude(e.target.value);
								}}
								value={longitude}
							/>
						</InputGroup>
					</Col>
				</Row>
				<Row>
					<Col>
						<InputGroup>
							<InputGroupText>Menu</InputGroupText>
							<Input
								maxLength={40}
								type="text"
								onChange={(e) => {
									setMenuFileName(e.target.value);
								}}
								value={menuFileName}
							/>
						</InputGroup>
					</Col>
					<Col>
						<InputGroup>
							<InputGroupText>Abbreviation</InputGroupText>
							<Input
								maxLength={2}
								type="text"
								onChange={(e) => {
									setAbbreviation(e.target.value);
								}}
								value={abbreviation}
							/>
						</InputGroup>
					</Col>
				</Row>
				<Row>
					<Col>
						<FormGroup switch>
							<Input
								type="switch"
								checked={hasVegan}
								onClick={() => {
									setHasVegan(!hasVegan);
								}}
							/>
							<Label check>Vegan</Label>
						</FormGroup>
					</Col>
					<Col>
						<FormGroup switch>
							<Input
								type="switch"
								checked={hasVegetarian}
								onClick={() => {
									setHasVegetarian(!hasVegetarian);
								}}
							/>
							<Label check>Has Vegetarian</Label>
						</FormGroup>
					</Col>
				</Row>
				<Row>
					<Col>
						<FormGroup switch>
							<Input
								type="switch"
								checked={hasGlutenFree}
								onClick={() => {
									setHasGlutenFree(!hasGlutenFree);
								}}
							/>
							<Label check>Gluten Free</Label>
						</FormGroup>
					</Col>
					<Col>
						<FormGroup switch>
							<Input
								type="switch"
								checked={hasLactoseFree}
								onClick={() => {
									setHasLactoseFree(!hasLactoseFree);
								}}
							/>
							<Label check>Lactose Free</Label>
						</FormGroup>
					</Col>
				</Row>
				<Row>
					<Col>
						<FormGroup switch>
							<Input
								type="switch"
								checked={hasTakeout}
								onClick={() => {
									setHasTakeout(!hasTakeout);
								}}
							/>
							<Label check>Takeout</Label>
						</FormGroup>
					</Col>
					<Col>
						<FormGroup switch>
							<Input
								type="switch"
								checked={hasWifi}
								onClick={() => {
									setHasWifi(!hasWifi);
								}}
							/>
							<Label check>Has Wifi</Label>
						</FormGroup>
					</Col>
				</Row>
				<Row>
					<Col>
						<FormGroup switch>
							<Input
								type="switch"
								checked={hasCashOnly}
								onClick={() => {
									setHasCashOnly(!hasCashOnly);
								}}
							/>
							<Label check>Cash-Only</Label>
						</FormGroup>
					</Col>
					<Col>
						<FormGroup switch>
							<Input
								type="switch"
								checked={isPlan}
								onClick={() => {
									setIsPlan(!isPlan);
								}}
							/>
							<Label check>Is Plan</Label>
						</FormGroup>
					</Col>
				</Row>

				<div className="save-button">
					<Button onClick={saveLocationHandler}>Save</Button>
				</div>
			</Modal>
		</>
	);
};

export default EditLocationModal;
