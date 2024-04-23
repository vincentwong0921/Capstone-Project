import "./Checkout.css";
import { getUserCartItems } from "../../store/cartItem";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createOrder } from "../../store/order";
import {
  TbCircleNumber1,
  TbCircleNumber2,
  TbCircleNumber3,
  TbCircleNumber4,
} from "react-icons/tb";
import { editItemInCart, deleteCartItem } from "../../store/cartItem";
import { getUserCart, createCart, deleteCart } from "../../store/cart";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("AL");
  const [zip, setZip] = useState("");
  const [errors, setErrors] = useState({});
  const [shipping_method, setShippingMethod] = useState("standard");
  const cartId = Object.values(useSelector((state) => state.cart))[0]?.id;
  const user = useSelector((state) => state.session.user);
  const cartItems = Object.values(useSelector((state) => state.cartItem));
  let itemCount = 0;
  cartItems.forEach((item) => (itemCount += item.quantity));

  let amount = 0;
  cartItems.forEach(
    (item) => (amount += item.Inventory?.price * item.quantity)
  );

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate, user, cartItems]);

  const addOne = async (itemId, quantity) => {
    await dispatch(editItemInCart({ id: itemId, quantity: quantity + 1 }));
    await dispatch(getUserCartItems());
  };
  const minusOne = async (itemId, quantity) => {
    await dispatch(editItemInCart({ id: itemId, quantity: quantity - 1 }));
    await dispatch(getUserCartItems());
  };
  const deleteItem = async (itemId) => {
    await dispatch(deleteCartItem(itemId));
    await dispatch(getUserCart());
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const order = {
        user_id: user.id,
        address,
        city,
        state,
        zip,
        amount,
        order_details: cartItems,
      };

      if (zip.length !== 5) {
        setErrors({ zip: "Zip Code must be 5 digits" });
        return;
      }
      if(cartItems.length === 0){
        setErrors({ items: "No items in your shopping cart!"})
        return
      }
      await dispatch(createOrder(order));
      await dispatch(deleteCart(cartId));
      await dispatch(createCart({ user_id: user.id }));
      await dispatch(getUserCartItems());
      navigate("/orders");
    } catch (error) {
      const data = await error.json();
      setErrors(data.errors);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      await dispatch(getUserCartItems());
      await dispatch(getUserCart());
      setLoaded(true);
    };
    fetch();
  }, [dispatch]);

  if (!loaded) return <>Loading...</>;

  return (
    <div className="CheckOutContainer">
      <div className="CheckOutHeader">
        <h1>
          Checkout ({itemCount} {itemCount > 1 ? "Items" : "Item"}) - Total $
          {amount.toFixed(2)}
        </h1>
      </div>
      <div className="ReviewItemAndShipping">
        <div className="NumAndTitle">
          <TbCircleNumber1 className="One" />
          <p>Review Items:</p>
          {errors && errors.items && <p className="errormsg">{errors.items}</p>}
        </div>
        <div className="CheckOutItem">
          {cartItems &&
            cartItems.map((item) => (
              <div key={item.id} className="CartItemssContainer">
                <div className="itemInfo">
                  <p>Quantity: {item.quantity}</p>
                  <p>Model: {item.Inventory?.model}</p>
                  <p>Carrier: {item.Inventory?.carrier}</p>
                  <p>Price: $ {item.Inventory?.price.toFixed(2)}</p>
                  <div className="AddMinusDelete">
                    {item.Inventory?.available_units > 0 ? (
                      <i
                        onClick={() => addOne(item.id, item.quantity)}
                        className="fa-solid fa-plus"
                      ></i>
                    ) : null}
                    {item.quantity > 1 ? (
                      <i
                        onClick={() => minusOne(item.id, item.quantity)}
                        className="fa-solid fa-minus"
                      ></i>
                    ) : (
                      <i
                        onClick={() => deleteItem(item.id)}
                        className="fa-solid fa-trash"
                      ></i>
                    )}
                  </div>
                </div>
                <img
                  className="checkoutItemImg"
                  src={item.Inventory?.image_url}
                ></img>
              </div>
            ))}
        </div>
      </div>
      <div className="ShippingMethodContainer">
        <div className="ShippingAndTwo">
          <TbCircleNumber2 className="Two" />
          <p>Shipping Method:</p>
        </div>
        <div className="ShippingMFormContainer">
          <form className="ShippingMForm">
            <label>
              <input
                type="radio"
                name="shipping_method"
                value="standard"
                className="ShippingMethods"
                checked={shipping_method === "standard"}
                onChange={(e) => setShippingMethod(e.target.value)}
              />
              Standard Shipping - $9.99
            </label>
            <label>
              <input
                type="radio"
                name="shipping_method"
                value="prority"
                className="ShippingMethods"
                checked={shipping_method === "prority"}
                onChange={(e) => setShippingMethod(e.target.value)}
              />
              USPS Priority Shipping - $15.99
            </label>{" "}
            <label>
              <input
                type="radio"
                name="shipping_method"
                value="fedex2ndday"
                className="ShippingMethods"
                checked={shipping_method === "fedex2ndday"}
                onChange={(e) => setShippingMethod(e.target.value)}
              />
              Fedex 2nd day - $23.99
            </label>{" "}
            <label>
              <input
                type="radio"
                name="shipping_method"
                value="fedexovernight"
                className="ShippingMethods"
                checked={shipping_method === "fedexovernight"}
                onChange={(e) => setShippingMethod(e.target.value)}
              />
              Fedex Standard Overnight - $35.99
            </label>
          </form>
        </div>
      </div>
      <div className="Payment">
        <div className="PaymentAndThree">
          <TbCircleNumber3 className="Three" />
          <p>Payment Method:</p>
        </div>
        <div className="PaymentDetails">
          <div className="PD">
            <p>Paying with American Express 2024</p>
            <p>Billing address: Same as Shipping address.</p>
          </div>
          <div
            onClick={() => window.alert("Feature coming soon!")}
            className="ChangePayment"
          >
            <p>Change Payment Method / Billing Address</p>
          </div>
        </div>
      </div>
      <div className="ShippingFormContainer">
        <div className="AddressTitle">
          <TbCircleNumber4 className="Four" />
          <p>Shipping Address:</p>
        </div>
        <div className="CO">
          <form className="CheckOutForm" onSubmit={handleSubmit}>
            <h3>Confirm the address</h3>
            <label>
              <h4>Address: </h4>
              <input
                type="text"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>
            <label>
              <h4>City: </h4>
              <input
                type="text"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              />
            </label>
            <label>
              <h4>State: </h4>
              <select
                type="text"
                value={state}
                required
                onChange={(e) => setState(e.target.value)}
              >
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
            </label>
            {errors && errors.zip && <p className="errormsg">{errors.zip}</p>}
            <label>
              <h4>Zip Code: </h4>
              <input
                type="Number"
                value={zip}
                required
                onChange={(e) => setZip(e.target.value)}
              />
            </label>
            <button className="OrderButton">Place your Order!</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
