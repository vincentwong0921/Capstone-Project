import "./SubmitReviewModal.css";
import { useModal } from "../../context/Modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createReview } from "../../store/review";
import { useNavigate } from "react-router-dom";

function SubmitReviewModal({ order }) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { closeModal } = useModal();
  const [review, setReview] = useState("");
  const [errors, setErrors] = useState({});
  const [stars, setStars] = useState(0);
  const [hover, setHover] = useState(null);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const errs = {};
      if (review.length < 10) {
        errs.review = "Minimum 10 characters for a review!!";
        setErrors(errs);
      } else {
        const newReview = { review, stars };
        await dispatch(createReview(order.id, newReview))
        navigate('/reviews')
        closeModal();
      }
    } catch (error) {
      const errs = await error.json();
      setErrors(errs.errors)
    }
  };

  return (
    <form className="reviewform" onSubmit={handleSubmit}>
      <h3>How was your experience?</h3>

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
                    currentRating <= (hover || stars) ? "#000000" : "#e4e5e9",
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
          disabled={review.length < 10 || !stars}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default SubmitReviewModal;
