import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PiShoppingCartDuotone } from "react-icons/pi";
import { getUserCartItems } from "../../store/cartItem";
import './CartButton.css'
import Cart from "../Cart/Cart";

function CartButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [loaded, setLoaded] = useState(false)
  const cartItems = Object.values(useSelector(state => state.cartItem))
  let count = 0
  cartItems?.forEach(item => count += item.quantity)

  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const fetch = async () => {
      await dispatch(getUserCartItems())
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
        <div  className="Cart">
            <div className="LogoAndCount" onClick={toggleMenu}>
              <PiShoppingCartDuotone className="CartLogo"/>
              <p className="ItemCount">{count ? count: ''} {count > 1 ? "items" : "item"}</p>
            </div>
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
