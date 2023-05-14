import { useContext, useState } from 'react';
import { Button, Input, InputGroup, InputGroupText } from 'reactstrap';
import Modal from '../Common/Modal';
import AuthContext from '../store/auth-context';

const LoginModal = ({ closeModalHandler, showSignUpModal }) => {
	const authContext = useContext(AuthContext);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const signUpHandler = () => {
		closeModalHandler();
		showSignUpModal();
	};

	const loginHandler = () => authContext.loginHandler(username, password, setErrorMessage, closeModalHandler);

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
