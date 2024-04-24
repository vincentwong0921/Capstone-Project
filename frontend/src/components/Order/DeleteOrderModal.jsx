import './DeleteOrderModal.css'
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { removeOrder } from '../../store/order';

function DeleteOrderModal({ setSelectedStatus, order }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const confirmDelete = async (e) => {
      e.preventDefault();
      await dispatch(removeOrder(order.id));
      setSelectedStatus('All Orders')
      closeModal();
    };

    const nope = (e) => {
      e.preventDefault();
      closeModal();
    };

    return (
        <form className="DeleteOrderForm">
          <h2>Confirm Cancel</h2>
          <div className="DeleteMsg">
            Are you sure you want to cancel this order?
          </div>
          <div className="DeleteOrderButtons">
            <button className="DeleteButton" onClick={confirmDelete}>
              Yes (Delete Order)
            </button>
            <button className="NoDeleteButton" onClick={nope}>
              No (Keep Order)
            </button>
          </div>
        </form>
      );
}


export default DeleteOrderModal
