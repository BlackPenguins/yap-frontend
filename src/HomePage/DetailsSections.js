import { Col, Row } from 'reactstrap';
import InfoIcons from './InfoIcons';

const DetailsSection = ({ currentLocation }) => {
	return (
		<Row>
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
				<div id="details-description" className="details-description">
					{currentLocation?.Description}
				</div>
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
					<span>{currentLocation?.Frequency}</span>
				</div>
				<div id="details-death-date-container">
					Date of Death:
					<span>{currentLocation?.DeathDate}</span>
				</div>
			</Col>

			<Col className="details-col details-end-col" lg={4}>
				<div className="details-review-container">
					<div className="details-review-name">NAME ★ ★ ★</div>
					<div className="details-review-data">Likes, Dislikes</div>
				</div>
			</Col>
		</Row>
	);
};

export default DetailsSection;
