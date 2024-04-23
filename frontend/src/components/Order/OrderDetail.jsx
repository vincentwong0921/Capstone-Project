import "./OrderDetail.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import EditOrderModal from "./EditOrderModal";
import DeleteOrderModal from "./DeleteOrderModal";
import { getCurrentUserReviews } from "../../store/review";
import SubmitReviewModal from "./SubmitReviewModal";

function OrderDetail({ detailsToRender }) {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const user = useSelector((state) => state.session.user);
  const userReviews = Object.values(useSelector((state) => state.review));
  const isAdmin = user?.role === "Admin";

  useEffect(() => {
    const fetch = async () => {
      await dispatch(getCurrentUserReviews());
      setLoaded(true);
    };
    fetch();
  }, [dispatch]);

  if (!loaded) return <>Loading...</>;

  return (
    <>
      {detailsToRender &&
        detailsToRender.map((order) => {
          let count = 0
          order.OrderDetails.forEach((orderDetail) => {
            count += orderDetail.quantity;
          });

          return (
            <div className="SingleOrderContainer" key={order.id}>
              <div className="OrderDetails">
                <p>ORDER NUMBER: TPB-{order.id}</p>
                <p>ORDER DATE: {order.createdAt.slice(0, 10)}</p>
                <p>ORDER STATUS: {order.status}</p>
                <p>TOTAL: ${order.amount.toFixed(2)}</p>
                <p>
                  SHIP TO: {order.address} {order.city} {order.state} {order.zip}
                </p>
              </div>
              <div className="OrderPhoneImgContainer">
                <div className="ItemCounts">
                  <p>{count > 1 ? "Items in this Order: " : "Item in this Order: "}{count}</p>
                  {userReviews.find((review) => review.order_id === order.id) ? (
                    null
                  ) : <OpenModalButton
                    buttonText="Create Review"
                    modalComponent={<SubmitReviewModal order={order}/>}
                  />}
                </div>
                <div className="ItemDetails">
                  {order?.OrderDetails?.map((data, index) => (
                    <div className="PhonePicAndModel" key={index}>
                      <img
                        key={index}
                        className="OrderPhoneImg"
                        src={data.Inventory.image_url}
                        alt={data.Inventory.name}
                      />
                      <div className="MSP">
                        <p>Model: {data.Inventory.model}</p>
                        <p>Storage: {data.Inventory.storage}</p>
                        <p>Price: ${data.Inventory.price}</p>
                        <p>Quantity: {data.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="ButtonsssContainer">
                  {isAdmin && (
                    <OpenModalButton
                      buttonText="Edit"
                      modalComponent={<EditOrderModal order={order} />}
                    />
                  )}
                  {isAdmin && (
                    <OpenModalButton
                      buttonText="Delete"
                      modalComponent={<DeleteOrderModal order={order} />}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
    </>
  );

}

export default OrderDetail;
