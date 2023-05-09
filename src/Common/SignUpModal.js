import { useState } from 'react';
import { Button, Input, InputGroup, InputGroupText } from 'reactstrap';
import Modal from './Modal';

const SignUpModal = ({ closeModalHandler }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [name, setName] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const signUpHandler = async () => {
		const credentialsJSON = {
			username,
			password,
			passwordConfirm,
			name,
		};

		console.log('SENDING', credentialsJSON);
		const response = await fetch('http://localhost:4591/register', {
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
			closeModalHandler();
		}
	};

	return (
		<>
			<Modal closeHandler={closeModalHandler}>
				<div className="modal-title">Join Penguinore!</div>
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
				<InputGroup>
					<InputGroupText>Password Confirm</InputGroupText>
					<Input
						maxLength={30}
						type="password"
						onChange={(e) => {
							setPasswordConfirm(e.target.value);
						}}
						value={passwordConfirm}
					/>
				</InputGroup>
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
				<div>{errorMessage}</div>
				<div className="save-button">
					<Button onClick={signUpHandler}>Sign Up!</Button>
				</div>
			</Modal>
		</>
	);
};

export default SignUpModal;
