import "./DeleteReviewModal.css";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { removeReview } from "../../store/review";

function DeleteReviewModal({ review }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const confirmDelete = async (e) => {
    e.preventDefault();
    await dispatch(removeReview(review.id));
    closeModal();
  };

  const nope = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <form className="DeleteReviewForm">
      <h2>Confirm Delete</h2>
      <div>
        Are you sure you want to delete this review?
      </div>
      <div className="RvFormButtons">
        <button className="DeleteReviewButton" onClick={confirmDelete}>
          Yes (Delete Review)
        </button>
        <button className="NopeButton" onClick={nope}>
          No (Keep Review)
        </button>
      </div>
    </form>
  );
}

export default DeleteReviewModal;
