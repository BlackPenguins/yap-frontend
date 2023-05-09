import ReactDOM from 'react-dom';
import './Modal.css';
import { ModalHeader } from 'reactstrap';

const Backdrop = ({ closeHandler }) => {
	return <div className="backdrop" onClick={closeHandler}></div>;
};

const ModalWindow = ({ children }) => {
	return (
		<>
			<div className="modal-window">
				<div className="content">{children}</div>
			</div>
		</>
	);
};

const portalElement = document.getElementById('overlays');

const Modal = ({ closeHandler, children }) => {
	const backdrop = ReactDOM.createPortal(<Backdrop closeHandler={closeHandler} />, portalElement);
	const modalWindow = ReactDOM.createPortal(<ModalWindow>{children}</ModalWindow>, portalElement);

	return (
		<>
			{backdrop}
			{modalWindow}
		</>
	);
};

export default Modal;
