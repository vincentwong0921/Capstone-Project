import './EditReviewModal.css'
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { useState } from 'react';
import { getAllReviews, updateReview } from '../../store/review';

function EditReviewModal({ preReview }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [stars, setStars] = useState(preReview.stars);
    const [hover, setHover] = useState(null);
    const [errors, setErrors] = useState({});
    const [review, setReview] = useState(preReview.review);

    const handleSubmit = async (e) => {
        try {
          e.preventDefault();
          const errs = {};
          if (review.length < 10) {
            errs.review = "Minimum 10 characters for a review!!";
            setErrors(errs);
          } else if (!stars) {
            errs.stars = 'Please select star rating'
            setErrors(errs)
          } else {
            const editReview = { review, stars };
            editReview.id = preReview.id
            await dispatch(updateReview(editReview))
            await dispatch(getAllReviews())
            closeModal();
          }
        } catch (error) {
          const errs = await error.json();
          setErrors(errs.errors)
        }
      };

    return (
        <form className="reviewform" onSubmit={handleSubmit}>
          <h3>How was your experience with us?</h3>

          {errors.review && <span className="errormsg">{errors.review}</span>}
          <label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Leave your review here..."
            />
          </label>

          {errors.stars && <span className="errormsg">{errors.stars}</span>}
          <div className="stars">
            {[...Array(5)].map((star, index) => {
              const currentRating = index + 1;
              return (
                <label key={index}>
                  <input
                    type="radio"
                    name="rating"
                    value={Number(currentRating)}
                    onClick={() => setStars(Number(currentRating))}
                  />
                  <i
                    className="fa-solid fa-star"
                    style={{
                      color:
                        currentRating <= (hover || stars) ? "#ffa500" : "#ffffff",
                    }}
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(null)}
                  ></i>
                  {index === 4 && <span> Stars</span>}
                </label>
              );
            })}
          </div>

          <div>
            <button
              className="submitreviewbutton"
            >
              Submit
            </button>
          </div>
        </form>
      );
}


export default EditReviewModal
