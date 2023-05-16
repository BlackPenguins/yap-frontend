import './App.css';
import HomePage from './HomePage';
import AdminPage from './AdminPage';
import NotFoundPage from './NotFoundPage';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './Common/Header';
import { useState } from 'react';
import AboutPage from './AboutPage';

/**
 * Create React App:
 * 1) npx create-react-app yap
 * 2) npm install reactstrap
 * 3) npm install react-router-dom
 * 4) Include CSS in index.html
 * 5) npm start
 */

function App() {
	const [distanceFilter, setDistanceFilter] = useState(null);
	const [multiFilter, setMultiFilter] = useState([]);

	return (
		<div>
			<Header distanceFilter={distanceFilter} setDistanceFilter={setDistanceFilter} multiFilter={multiFilter} setMultiFilter={setMultiFilter} />
			<div className="app">
				<Routes>
					<Route path="/" element={<Navigate to="home" />} />
					<Route path="home" element={<HomePage distanceFilter={distanceFilter} multiFilter={multiFilter} />} />
					<Route path="about" element={<AboutPage />} />
					<Route path="admin" element={<AdminPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
