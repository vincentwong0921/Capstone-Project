import './Review.css'

function Review({ reviewList }) {
    console.log(reviewList)

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
            {reviewList && reviewList.map(review =>
                <div className='ReviewDetails' key={review.id}>
                    <p>{review.review} - {review.User.first_name}</p>
                    <p>Star Rating:{showStars(review.stars)}</p>
                </div>
            )}
        </div>
    )
}


export default Review
