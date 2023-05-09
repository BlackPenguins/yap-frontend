import { useState } from 'react';
import { Button, Input, InputGroup, InputGroupText } from 'reactstrap';
import Modal from '../Common/Modal';

const LoginModal = ({ setToken, closeModalHandler, showSignUpModal }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const signUpHandler = () => {
		closeModalHandler();
		showSignUpModal();
	};

	const loginHandler = async () => {
		const credentialsJSON = {
			username,
			password,
		};

		console.log('SENDING', credentialsJSON);
		const response = await fetch('http://localhost:4591/login', {
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
			closeModalHandler();

			// Set token in the localStorage so on page refresh we know we are still logged in
			localStorage.setItem('token', token);

			// Set token in state so the login page disappears
			setToken(token);
		}
	};

	return (
		<>
			<Modal closeHandler={closeModalHandler}>
				<div className="modal-title">Welcome back!</div>
				<InputGroup>
					<InputGroupText>Username</InputGroupText>
					<Input
						maxLength={30}
						type="text"
						onChange={(e) => {
							setUsername(e.target.value);
						}}
						value={username}
					/>
				</InputGroup>
				<InputGroup>
					<InputGroupText>Password</InputGroupText>
					<Input
						maxLength={30}
						type="password"
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						value={password}
					/>
				</InputGroup>
				<div>{errorMessage}</div>
				<div>
					Not a user?{' '}
					<a href="#" onClick={signUpHandler}>
						Sign up now!
					</a>
				</div>
				<div className="save-button">
					<Button onClick={loginHandler}>Sign In</Button>
				</div>
			</Modal>
		</>
	);
};

export default LoginModal;
