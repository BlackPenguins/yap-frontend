import InfoIcons from './InfoIcons';
import { useCallback, useContext, useState } from 'react';
import AuthContext from '../store/auth-context';

export const Review = ({ review, isYourReview }) => {
	const authContext = useContext(AuthContext);
	const users = authContext.users;
	const reviewer = users.find((user) => user.userID === review.UserID);
	const reviewerName = reviewer?.name || 'Unknown Reviewer';

	const reviewClasses = ['review'];

	if (isYourReview) {
		reviewClasses.push('owner');
	}

	return (
		<div className={reviewClasses.join(' ')}>
			<div className="details-review-name">
				{reviewerName} ({review.Rating} stars)
			</div>
			{review.Notes && (
				<div className="details-review-data">
					<i>"{review.Notes}"</i>
				</div>
			)}
			{review.Likes && (
				<div className="details-review-data">
					<u>Likes:</u> {review.Likes}
				</div>
			)}
			{review.Dislikes && (
				<div className="details-review-data">
					<u>Dislikes:</u> {review.Dislikes}
				</div>
			)}
		</div>
	);
};
