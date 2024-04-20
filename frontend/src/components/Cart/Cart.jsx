import './Cart.css'
import { editItemInCart, deleteCartItem } from '../../store/cartItem'
import { useDispatch } from 'react-redux';
import { getUserCart } from '../../store/cart';
import { getUserCartItems } from '../../store/cartItem';
import { getAllInventory } from '../../store/inventory';

function Cart({cartItems}) {
    const dispatch = useDispatch()
    let total = 0
    cartItems.forEach(item => total += item.Inventory?.price * item.quantity)

    const addOne = async (itemId, quantity, e) => {
        e.stopPropagation();
        await dispatch(editItemInCart({id: itemId, quantity: quantity + 1}))
        await dispatch(getUserCartItems())
        await dispatch(getAllInventory())
    }
    const minusOne =  async (itemId, quantity, e) => {
        e.stopPropagation();
        await dispatch(editItemInCart({id: itemId, quantity: quantity - 1}))
        await dispatch(getUserCartItems())
        await dispatch(getAllInventory())
    }
    const deleteItem = async (itemId, e) => {
        e.stopPropagation();
        await dispatch(deleteCartItem(itemId))
        await dispatch(getUserCart())
        await dispatch(getAllInventory())
    }

    if(!cartItems.length) {
        return (
            <a href='/products'>Continue Shopping!</a>
        )
    } else {
        return (
            <>
                <div className='CartTitle'>
                    <h1>Shopping Cart</h1>
                </div>
                <div className='CartItemContainer'>
                    {cartItems && cartItems.map(item =>
                        <div key={item.id} className='CartItemDetailContainer'>
                            {item.quantity > 1 ? <i onClick={(e) => minusOne(item.id, item.quantity, e)} className="fa-solid fa-minus"></i> : <i onClick={(e) => deleteItem(item.id, e)} className="fa-solid fa-trash"></i>}
                            <p>{item.quantity} x {' '}{item.Inventory?.model} {' '}{item.Inventory?.storage}</p>
                            {item.Inventory?.available_units > 0 ?
                            <i onClick={(e) => addOne(item.id, item.quantity, e)} className="fa-solid fa-plus"></i>
                            : null}
                            
                            <img className='CartItemImage' src={item.Inventory?.image_url}></img>
                            <p>${item.Inventory?.price}</p>
                        </div>
                    )}
                </div>
                <div className='TotalAndCheckOut'>
                    <p className='Total'>Subtotal: ${total.toFixed(2)}</p>
                    <a href='/checkout'>Check out</a>
                </div>
            </>
        )
    }
}

export default Cart
