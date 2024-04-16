import './Review.css'
import { useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import DeleteReviewModal from './DeleteReviewModal';

function Review({ reviewList }) {
    const user = useSelector((state) => state.session.user);
    const isAdmin = user?.role === 'Admin'
    const shortReviewList = reviewList.slice(0,5)

    const showStars = (stars) => {
        const starIcons = [];
        for (let i = 0; i < stars; i++) {
            starIcons.push(<i className="fa-solid fa-star" key={i}></i>);
        }
        return starIcons;
    };

    return (
        <div className='ReviewsContainer'>
            <h1>Member Reviews</h1>
            {shortReviewList && shortReviewList.map(review =>
                <div className='ReviewDetails' key={review.id}>
                    <div className='ReviewAndUser'>
                        <p className='Reviewdes'>{review.review}-</p>
                        <p className='UserName'>{review.User.first_name}</p>
                    </div>
                    <div className='StarAndDate'>
                        <p>Star Rating:{showStars(review.stars)}</p>
                        <p className='Date'>{review.createdAt.slice(0,10)}</p>
                        {isAdmin  && (
                            <OpenModalButton
                                buttonText="Delete"
                                modalComponent={
                                    <DeleteReviewModal
                                    review={review}
                                    />
                                }
                            />
                        )}
                    </div>
                </div>
            )}
            <div className='GoReviews'>
                <a href='/reviews'>See All Members Reviews</a>
            </div>
        </div>
    )
}


export default Review
