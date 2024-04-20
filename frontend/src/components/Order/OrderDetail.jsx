import "./OrderDetail.css";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import EditOrderModal from "./EditOrderModal";
import DeleteOrderModal from "./DeleteOrderModal";

function OrderDetail({ detailsToRender }) {
  const user = useSelector((state) => state.session.user);
  const isAdmin = user?.role === "Admin";

  return (
    <>
      {detailsToRender &&
        detailsToRender.map((order) => (
          <div className="SingleOrderContainer" key={order.id}>
            <div className="OrderDetails">
              <p>ORDER NUMBER: TPB-{order.id}</p>
              <p>ORDER PLACED ON: {order.createdAt.slice(0, 10)}</p>
              <p>TOTAL: ${order.amount.toFixed(2)}</p>
              <p>
                SHIP TO: {order.address} {order.city} {order.state} {order.zip}
              </p>
            </div>
            <div className="OrderPhoneImgContainer">
              <div>
                {order?.OrderDetails?.map((data, index) => (
                  <div key={index}>
                    <img
                      key={index}
                      className="OrderPhoneImg"
                      src={data.Inventory.image_url}
                      alt={data.Inventory.name}
                      />
                    <p>{data.Inventory.model}</p>
                    <p>{data.Inventory.storage}</p>
                  </div>
                ))}
              </div>
              <div className="ItemCounts">
                {order?.OrderDetails?.length > 1
                  ? "Items in this Order: "
                  : "Item in this Order: "}
                {order?.OrderDetails?.length}
              </div>
              <div className="ButtonsContainer">
                {isAdmin && (
                  <OpenModalButton
                    buttonText="Edit Order"
                    modalComponent={<EditOrderModal order={order} />}
                  />
                )}
                {isAdmin && (
                  <OpenModalButton
                    buttonText="Delete Order"
                    modalComponent={<DeleteOrderModal order={order} />}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
    </>
  );
}

export default OrderDetail;
