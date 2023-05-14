import React, { useEffect, useState } from 'react';

const AuthContext = React.createContext({
	// Dummy data to VS Code has auto-complete
	isAdmin: false,
	token: null,
	name: null,
	loginHandler: (username, password, setErrorMessage, closeModalFunction) => {},
	logoutHandler: () => {},
});

export const AuthContextProvider = ({ children }) => {
	const [token, setToken] = useState(null);
	const [name, setName] = useState(null);
	const [isAdmin, setIsAdmin] = useState(false);

	const loginHandler = async (username, password, setErrorMessage, closeModalFunction) => {
		const credentialsJSON = {
			username,
			password,
		};

		console.log('SENDING', credentialsJSON);
		const response = await fetch('/auth/login', {
			method: 'POST',
			body: JSON.stringify(credentialsJSON),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const data = await response.json();

		if (response.status !== 200) {
			setErrorMessage(data.message);
		} else {
			const token = data.token;
			closeModalFunction();

			// Set token in the localStorage so on page refresh we know we are still logged in
			localStorage.setItem('token', token);

			// Set token in state so the login page disappears
			setToken(token);
		}
	};

	const logoutHandler = () => {
		setToken(null);
		localStorage.removeItem('token');
	};

	useEffect(() => {
		// If you refresh the page, we need to get that token back into the state so we hide the login button
		const tokenFromStorage = localStorage.getItem('token');
		setToken(tokenFromStorage);
		fetchUserData();
	}, []);

	useEffect(() => {
		// If that token changes, or is set, fetch that user information
		fetchUserData();
	}, [token]);

	const fetchUserData = () => {
		const response = fetch(`/auth/checkuser`, {
			method: 'POST',
			headers: {
				// This is required. NodeJS server won't know how to read it without it.
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
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
	};

	return (
		<AuthContext.Provider
			value={{
				isAdmin,
				token,
				name,
				loginHandler,
				logoutHandler,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
