import "./StorePolicy.css";

function StorePolicy() {
  return (
    <>
      <div className="StorePolicy">
        <div className="PO">
          <h2 className="POh2">Placing An Order</h2>
          <p className="POp">
            Before confirming an Order, please double check your shipping
            address and item details. Once an order is placed, we no longer can
            revise the details of the order. Please reach out to us in the event
            you need an order cancelled.
          </p>
        </div>
        <div className="RMA">
          <h2 className="RMAh2">RMA</h2>
          <p className="RMAp">
            All merchandise return needs to receive an RMA approval prior to
            being shipped back. We offer a 30-day warranty for all items we sell
            that are rated fully functional. Please reach out to us for an RMA request.
          </p>
        </div>
        <div className="OPTF">
          <h2 className="OPTFh2">Order Processing Time Frame</h2>
          <p className="OPTFp">
            Purchase orders are usually shipped out within ONE(1) business day
            upon the receipt of the order but this is not a hard guarantee.
          </p>
        </div>
        <div className="DES">
          <h2 className="DESh2">Description</h2>
          <p className="DESp">
            If you purchase our products, the policy stated above will be
            applied to you.
          </p>
        </div>
      </div>
    </>
  );
}

export default StorePolicy;
