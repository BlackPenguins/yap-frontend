import { Link, Route, Routes } from 'react-router-dom';
import MultiFilterButton from '../HomePage/MultiFilterButton';
import DistanceFilterButton from '../HomePage/DistanceFilterButton';
import { useEffect, useState } from 'react';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';

// TODO: Move these states into a Provider so we don't need to prop-drill
const HomePageFilters = ({ distanceFilter, setDistanceFilter, multiFilter, setMultiFilter }) => {
	return (
		<>
			<MultiFilterButton icon="wifi" filterName="hasWifi" multiFilter={multiFilter} setMultiFilter={setMultiFilter} />
			<MultiFilterButton icon="cash_only" filterName="hasCashOnly" multiFilter={multiFilter} setMultiFilter={setMultiFilter} />
			<MultiFilterButton icon="vegan" filterName="hasVegan" multiFilter={multiFilter} setMultiFilter={setMultiFilter} />
			<MultiFilterButton icon="vegetarian" filterName="hasVegetarian" multiFilter={multiFilter} setMultiFilter={setMultiFilter} />
			<MultiFilterButton icon="gluten_free" filterName="hasGlutenFree" multiFilter={multiFilter} setMultiFilter={setMultiFilter} />
			<MultiFilterButton icon="lactose_free" filterName="hasLactoseFree" multiFilter={multiFilter} setMultiFilter={setMultiFilter} />
			<MultiFilterButton icon="takeout" filterName="hasTakeout" multiFilter={multiFilter} setMultiFilter={setMultiFilter} />
			<DistanceFilterButton icon="directions_walk" distanceName="Walking" distanceFilter={distanceFilter} setDistanceFilter={setDistanceFilter} />
			<DistanceFilterButton icon="pedal_bike" distanceName="Short Drive" distanceFilter={distanceFilter} setDistanceFilter={setDistanceFilter} />
			<DistanceFilterButton icon="airport_shuttle" distanceName="Long Drive" distanceFilter={distanceFilter} setDistanceFilter={setDistanceFilter} />
		</>
	);
};

const Header = ({ distanceFilter, setDistanceFilter, multiFilter, setMultiFilter }) => {
	const [token, setToken] = useState(null);
	const [name, setName] = useState(null);
	const [isAdmin, setIsAdmin] = useState(false);

	const [showLoginModal, setShowLoginModal] = useState(false);
	const showLoginModalHandler = () => setShowLoginModal(true);
	const hideLoginModalHandler = () => setShowLoginModal(false);

	const [showSignUpModal, setShowSignUpModal] = useState(false);
	const showSignUpModalHandler = () => setShowSignUpModal(true);
	const hideSignUpModalHandler = () => setShowSignUpModal(false);

	const logoutHandler = () => {
		setToken(null);
		localStorage.removeItem('token');
	};

	useEffect(() => {
		// If you refresh the page, we need to get that token back into the state so we hide the login button
		const tokenFromStorage = localStorage.getItem('token');
		setToken(tokenFromStorage);

		const response = fetch(`http://localhost:4591/checkuser`, {
			method: 'POST',
			headers: {
				// This is required. NodeJS server won't know how to read it without it.
				'Content-Type': 'application/json',
				Authorization: `Bearer ${tokenFromStorage}`,
			},
		});
		response
			.then((response) => {
				return response.json();
			})
			.then((json) => {
				if (json.message) {
					console.error('Error getting user information: ', json.message);
					setName(null);
					setIsAdmin(false);
				} else {
					console.log('Retrieved user information:', json);
					setName(json.name);
					setIsAdmin(json.isAdmin);
				}
			});
	}, []);

	return (
		<div className="header-section-2">
			{showLoginModal && <LoginModal setToken={setToken} closeModalHandler={hideLoginModalHandler} showSignUpModal={showSignUpModalHandler} />}
			{showSignUpModal && <SignUpModal closeModalHandler={hideSignUpModalHandler} />}
			<div className="header-contents">
				<div className="header-contents-left">
					<div className="logo-2">
						<img alt="logo" src="images/yap_logo.png" />
					</div>

					<Link className="header-link" to="home">
						<span>Home</span>
					</Link>
					<Link className="header-link" to="about">
						<span>About</span>
					</Link>
					{isAdmin && (
						<Link className="header-link" to="admin">
							<span>Admin</span>
						</Link>
					)}
				</div>

				<div className="header-contents-right">
					<Routes>
						<Route
							path="home"
							element={
								<HomePageFilters
									distanceFilter={distanceFilter}
									setDistanceFilter={setDistanceFilter}
									multiFilter={multiFilter}
									setMultiFilter={setMultiFilter}
								/>
							}
						/>
					</Routes>

					{!token && (
						<a href="#" onClick={showLoginModalHandler} className="header-link">
							<span>Login</span>
						</a>
					)}
					{token && (
						<a href="#" onClick={logoutHandler} className="header-link">
							<span>({name}) Logout</span>
						</a>
					)}
				</div>
			</div>
		</div>
	);
};

export default Header;
