import "./OrderDetail.css";

function OrderDetail({ detailsToRender }) {
  console.log(detailsToRender);

  return (
    <>
      {detailsToRender &&
        detailsToRender.map((detail) => (
          <div className="SingleOrderContainer" key={detail.id}>
            <div className="OrderDetails">
              <p>ORDER ID: {detail.id}</p>
              <p>ORDER PLACED: {detail.createdAt.slice(0, 10)}</p>
              <p>TOTAL: ${detail.amount.toFixed(2)}</p>
              <p>
                SHIP TO: {detail.address} {detail.city} {detail.state}{" "}
                {detail.zip}
              </p>
            </div>
            <div className="OrderPhoneImgContainer">
              <div>
                {detail.OrderDetails.map((data, index) => (
                  <img
                    key={index}
                    className="OrderPhoneImg"
                    src={data.Inventory.image_url}
                    alt={data.Inventory.name}
                  />
                ))}
              </div>
              <div className="ItemCount">
                {detail.OrderDetails.length > 1 ? "Items in this Order: " : "Item in this Order: "}
                {detail.OrderDetails.length}
              </div>
            </div>
          </div>
        ))}
    </>
  );
}

export default OrderDetail;
