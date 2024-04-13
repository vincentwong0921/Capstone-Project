import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { PiShoppingCartDuotone } from "react-icons/pi";
import './CartButton.css'

function CartButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  // const toggleMenu = (e) => {
  //   e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
  //   setShowMenu(!showMenu);
  // };

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

  // const ulClassName = "cart-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
        <div className="Cart">
            <PiShoppingCartDuotone className="CartLogo"/>
            <p className="ItemCount">1 Item</p>
        </div>
    </>
  )
}

export default CartButton;
