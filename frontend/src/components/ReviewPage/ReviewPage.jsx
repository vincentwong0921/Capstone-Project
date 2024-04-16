import "./ReviewPage.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAllReviews } from "../../store/review";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteReviewModal from "../Review/DeleteReviewModal";

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

  console.log(reviewList)

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
        <img
          className="ARP"
          src="https://images.unsplash.com/photo-1585909695284-32d2985ac9c0?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <div className="AllReviewsDetail">
          <h2>The Phone Hub Member Reviews</h2>
          {reviewList &&
            reviewList.map((review) => (
              <div className="ReviewDetails" key={review.id}>
                <div className="ReviewAndUser">
                  <p className="Reviewdes">{review.review}-</p>
                  <p className="UserName">{review.User.first_name}</p>
                </div>
                <div className="StarAndDate">
                  <p>Star Rating:{showStars(review.stars)}</p>
                  <p className="Date">{review.createdAt.slice(0, 10)}</p>
                  {isAdmin && (
                    <OpenModalButton
                      buttonText="Delete"
                      modalComponent={<DeleteReviewModal review={review} />}
                    />
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default ReviewPage;
