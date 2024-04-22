import "./ReviewPage.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAllReviews } from "../../store/review";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteReviewModal from "../Review/DeleteReviewModal";
import EditReviewModal from './EditReviewModal'

function ReviewPage() {
  const user = useSelector((state) => state.session.user);
  const isAdmin = user?.role === "Admin";
  const dispatch = useDispatch();
  const [loaded, setIsLoaded] = useState(false);
  const reviewList = Object.values(useSelector((state) => state.review));

  const showStars = (stars) => {
    const starIcons = [];
    for (let i = 0; i < stars; i++) {
      starIcons.push(<i className="fa-solid fa-star" key={i}></i>);
    }
    return starIcons;
  };

  useEffect(() => {
    const fetch = async () => {
      await dispatch(getAllReviews());
      setIsLoaded(true);
    };
    fetch();
  }, [dispatch]);

  if (!loaded) return <>Loading...</>;

  return (
    <>
      <div className="AllReviewsContainer">
        <div className="LeftReview">
          <h2>From customers</h2>
          <p>Reviews from people who have ordered here</p>
        </div>
        <div className="RightReview">
          {reviewList &&
            reviewList.map((review) => (
              <div className="EachReview" key={review.id}>
                <div className="ReviewAndUserr">
                  <p className="UserName">{review.User?.first_name} - </p>
                  <p className="Reviewdes">Comment: {review.review}</p>
                </div>
                <div className="SDB">
                  <div className="StarAndDatee">
                    <p>Star Rating:{showStars(review.stars)}</p>
                    <p className="DatePosted">
                      Date Posted:{review.createdAt.slice(0, 10)}
                    </p>
                  </div>
                  <div className="Rvbuttons">
                    {isAdmin || review.user_id === user?.id ? (
                      <OpenModalButton
                        buttonText="Edit"
                        modalComponent={<EditReviewModal preReview={review} />}
                      />
                    ) : null}
                    {isAdmin || review.user_id === user?.id ? (
                      <OpenModalButton
                        buttonText="Delete"
                        modalComponent={<DeleteReviewModal review={review} />}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default ReviewPage;
