import "./EditOrderModal.css";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { updateOrder, getAllOrders } from "../../store/order";
import { useState } from "react";

function EditOrderModal({ order }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [status, setStatus] = useState(order.status);
  const user_id = order.user_id
  const address = order.address
  const city = order.city
  const state = order.state
  const zip = order.zip
  const amount = order.amount
  const id = order.id
  const OrderDetails = order.OrderDetails
  console.log(OrderDetails)

  const confirmSubmit = async (e) => {
    e.preventDefault();
    order = {id, OrderDetails, user_id, address, city, state, zip, amount, status}
    await dispatch(updateOrder(order));
    await dispatch(getAllOrders())
    closeModal();
  };

  return (
    <form className="EditOrderForm">
      <h2>Process Order</h2>
      <label>
        <h4>Order Status: </h4>
        <select
          type="text"
          value={status}
          required
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Order Received">Order Received</option>
          <option value="Sales In Process">Sales In Process</option>
          <option value="Order Shipped">Order Shipped</option>
          <option value="Waiting For Confirmation">
            Waiting For Confirmation
          </option>
          <option value="Waiting For Payment">Waiting For Payment</option>
          <option value="Order Cancelled">Order Cancelled</option>
        </select>
      </label>
      <button className="ConfirmEdit" onClick={confirmSubmit}>
        Confirm
      </button>
    </form>
  );
}

export default EditOrderModal;
