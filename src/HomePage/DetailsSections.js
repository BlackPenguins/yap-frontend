import { Button, Col, Row } from 'reactstrap';
import InfoIcons from './InfoIcons';
import AuthContext from '../store/auth-context';
import { useContext, useState } from 'react';
import { Review } from './Review';
import EditReviewModal from './EditReviewModal';

const DetailsSection = ({ currentLocation, reviews, fetchReviews }) => {
	const authContext = useContext(AuthContext);
	const currentReview = reviews.find((review) => review.UserID === authContext.userID);
	const buttonLabel = currentReview ? 'Edit Review' : 'Add Review';

	const [showReviewModal, setShowReviewModal] = useState(false);

	const hideReviewModalHandler = () => setShowReviewModal(false);
	const showReviewModalHandler = () => setShowReviewModal(true);
	const fetchReviewsForLocation = () => fetchReviews(currentLocation.LocationID);

	return (
		<Row>
			{showReviewModal && (
				<EditReviewModal
					currentLocation={currentLocation}
					currentReview={currentReview}
					closeModalHandler={hideReviewModalHandler}
					fetchReviews={fetchReviewsForLocation}
				/>
			)}
			<Col className="details-col details-end-col" lg={5}>
				<div className="details-name-container">
					<span id="details-name">{currentLocation?.Name}</span>
					<span className="details-cost">{'$'.repeat(currentLocation.Cost)}</span>
				</div>
				<div>
					<span className="details-type">{currentLocation.FoodType}</span>
					<a className="details-menu" href="#" data-ss1681521909="1">
						{currentLocation.MenuFileName}
					</a>
				</div>
				{currentLocation?.Description && (
					<div id="details-description" className="details-description">
						{currentLocation?.Description}
					</div>
				)}
				<div className="details-images-container">
					<InfoIcons location={currentLocation} />
				</div>
			</Col>

			<Col className="details-col details-middle-col" lg={3}>
				<Row>
					<Col>
						<span className="details-time-container">
							<span>{currentLocation?.TravelTime} MIN</span>
						</span>
						<div className="details-time-label">Travel Time</div>
					</Col>
					<Col>
						<span className="details-time-container">
							<span>{currentLocation?.WaitTime} MIN</span>
						</span>
						<div className="details-time-label">Wait Time</div>
					</Col>
				</Row>
				<div id="details-types-container">
					<div id="details-distance-container">
						<span className="details-label">Distance: </span>
						<span>{currentLocation?.Distance}</span>
					</div>
					<div id="details-quadrant-container">
						<span className="details-label">Quadrant: </span>
						<span>{currentLocation?.Quadrant}</span>
					</div>
					<div id="details-parking-container">
						<span className="details-label">Parking: </span>
						<span>{currentLocation?.Parking}</span>
					</div>
				</div>
				<div id="details-frequency-container">
					<span>Visited {currentLocation?.FrequencyCount || 0}x</span>
				</div>
				{currentLocation.DeathDateFormatted && (
					<div id="details-death-date-container">
						Date of Death:
						<span>{currentLocation.DeathDateFormatted}</span>
					</div>
				)}
			</Col>

			<Col className="details-col details-end-col" lg={4}>
				<div className="details-review-container">
					{reviews.map((review) => {
						const isYourReview = review.UserID == authContext.userID;

						return <Review review={review} isYourReview={isYourReview} />;
					})}
					{authContext.token && (
						<Button className="edit-review-button" onClick={showReviewModalHandler}>
							{buttonLabel}
						</Button>
					)}
				</div>
			</Col>
		</Row>
	);
};

export default DetailsSection;
