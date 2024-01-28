import { useCallback, useContext, useEffect, useState } from 'react';
import { Button, Col, FormGroup, Input, InputGroup, InputGroupText, Label, Row } from 'reactstrap';
import Modal from '../Common/Modal';
import AuthContext from '../store/auth-context';

const EditReviewModal = ({ currentLocation, currentReview, fetchReviews, closeModalHandler }) => {
	const authContext = useContext(AuthContext);

	const [likes, setLikes] = useState('');
	const [dislikes, setDislikes] = useState('');
	const [notes, setNotes] = useState('');
	const [rating, setRating] = useState(1);
	const [reviewID, setReviewID] = useState(0);

	const updateReview = async (reviewID, reviewJSON) => {
		console.log('Updating review', reviewJSON);

		const tokenFromStorage = authContext.token;

		const response = await fetch(`/api/review/${reviewID}`, {
			method: 'PATCH',
			body: JSON.stringify(reviewJSON),
			headers: {
				// This is required. NodeJS server won't know how to read it without it.
				'Content-Type': 'application/json',
				Authorization: `Bearer ${tokenFromStorage}`,
			},
		});
		const data = await response.json();

		if (response.status === 200) {
			console.log('Review updated successfully.', data);
			closeModalHandler();
			fetchReviews();
		}
	};

	const addReview = useCallback(
		async (reviewJSON) => {
			console.log('Adding review', reviewJSON);

			const tokenFromStorage = localStorage.getItem('token');

			const response = await fetch(`/api/review`, {
				method: 'PUT',
				body: JSON.stringify({ ...reviewJSON, locationID: currentLocation.LocationID }),
				headers: {
					// This is required. NodeJS server won't know how to read it without it.
					'Content-Type': 'application/json',
					Authorization: `Bearer ${tokenFromStorage}`,
				},
			});
			const data = await response.json();

			if (response.status === 200) {
				console.log('Review added successfully.', data);
				closeModalHandler();
				fetchReviews();
			} else {
				console.error(data);
			}
		},
		[currentLocation]
	);

	const saveReviewHandler = async () => {
		const reviewJSON = {
			likes,
			dislikes,
			notes,
			rating,
			reviewID,
			userID: authContext.userID,
		};

		if (currentReview == null) {
			addReview(reviewJSON);
		} else {
			updateReview(currentReview.ReviewID, reviewJSON);
		}
	};

	useEffect(() => {
		setLikes(currentReview?.Likes);
		setDislikes(currentReview?.Dislikes);
		setNotes(currentReview?.Notes);
		setRating(currentReview?.Rating || 1);
		setReviewID(currentReview?.ReviewID);
	}, [currentReview]);

	return (
		<>
			<Modal closeHandler={closeModalHandler}>
				<div className="modal-title">Review</div>
				<InputGroup>
					<InputGroupText>Rating</InputGroupText>
					<div className="star-container">
						<Input
							type="range"
							min={1}
							max={10}
							step={1}
							onChange={(e) => {
								setRating(e.target.value);
							}}
							value={rating}
						/>
						<span
							style={{
								left: `${(rating - 0.7) * 10}%`,
							}}
							className="star-slider"
						>
							{rating}
						</span>
					</div>
				</InputGroup>
				<InputGroup>
					<InputGroupText>Likes</InputGroupText>
					<Input
						maxLength={30}
						type="text"
						onChange={(e) => {
							setLikes(e.target.value);
						}}
						value={likes}
					/>
				</InputGroup>
				<InputGroup>
					<InputGroupText>Dislikes</InputGroupText>
					<Input
						maxLength={30}
						type="text"
						onChange={(e) => {
							setDislikes(e.target.value);
						}}
						value={dislikes}
					/>
				</InputGroup>
				<InputGroup>
					<InputGroupText>Notes</InputGroupText>
					<Input
						maxLength={250}
						type="textarea"
						rows="3"
						onChange={(e) => {
							setNotes(e.target.value);
						}}
						value={notes}
					/>
				</InputGroup>

				<div className="save-button">
					<Button onClick={saveReviewHandler}>Save</Button>
				</div>
			</Modal>
		</>
	);
};

export default EditReviewModal;
