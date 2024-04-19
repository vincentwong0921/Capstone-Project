import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PiShoppingCartDuotone } from "react-icons/pi";
import { getUserCart } from "../../store/cart";
import './CartButton.css'
import Cart from "../Cart/Cart";

function CartButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [loaded, setLoaded] = useState(false)
  const cartItems = useSelector(state => state.cart['1']?.CartItems)
  let count = 0
  cartItems.map(item => count += item.quantity)

  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const fetch = async () => {
      await dispatch(getUserCart())
      setLoaded(true)
    }
    fetch()
  }, [dispatch])


  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", closeMenu);

    return () => document.removeEventListener("mousedown", closeMenu);
  }, [showMenu, dispatch]);

  const ulClassName = "cart-dropdown" + (showMenu ? "" : " hidden");

  if(!loaded) return <>Loading...</>

  return (
    <>
        <div onClick={toggleMenu} className="Cart">
            <PiShoppingCartDuotone className="CartLogo"/>
            <p className="ItemCount">{count ? count: ''} {count > 1 ? "items" : "item"}</p>
            {showMenu && (
              <div className={ulClassName} ref={ulRef}>
                <Cart cartItems={cartItems}/>
              </div>
            )}
        </div>
    </>
  )
}

export default CartButton;
