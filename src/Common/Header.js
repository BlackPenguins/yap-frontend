import { Link, Route, Routes } from 'react-router-dom';
import MultiFilterButton from '../HomePage/MultiFilterButton';
import DistanceFilterButton from '../HomePage/DistanceFilterButton';
import { useContext, useState } from 'react';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import AuthContext from '../store/auth-context';

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
	const authContext = useContext(AuthContext);

	const [showLoginModal, setShowLoginModal] = useState(false);
	const showLoginModalHandler = () => setShowLoginModal(true);
	const hideLoginModalHandler = () => setShowLoginModal(false);

	const [showSignUpModal, setShowSignUpModal] = useState(false);
	const showSignUpModalHandler = () => setShowSignUpModal(true);
	const hideSignUpModalHandler = () => setShowSignUpModal(false);

	const nameDisplay = authContext.name ? `(${authContext.name})` : '';
	return (
		<div className="header-section-2">
			{showLoginModal && <LoginModal closeModalHandler={hideLoginModalHandler} showSignUpModal={showSignUpModalHandler} />}
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
					{authContext.isAdmin && (
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
					{!authContext.token && (
						<a href="#" onClick={showLoginModalHandler} className="header-link">
							<span>Login</span>
						</a>
					)}
					{authContext.token && (
						<a href="#" onClick={authContext.logoutHandler} className="header-link">
							<span>{nameDisplay} Logout</span>
						</a>
					)}
				</div>
			</div>
		</div>
	);
};

export default Header;
