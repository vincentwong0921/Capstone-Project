import './Cart.css'


function Cart({cartItems}) {
    let total = 0
    cartItems.map(item => total += item.Inventory.price * item.quantity)

    const addOne = () => {}
    const minusOne = () => {}

    if(!cartItems) {
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
                            {item.quantity > 1 ? <i className="fa-solid fa-minus"></i> : <i className="fa-solid fa-trash"></i>}
                            <p>{item.quantity} x {' '}{item.Inventory.model}</p>
                            <i className="fa-solid fa-plus"></i>
                            <img className='CartItemImage' src={item.Inventory.image_url}></img>
                            <p>${item.Inventory.price}</p>
                        </div>
                    )}
                </div>
                <div className='TotalAndCheckOut'>
                    <p className='Total'>Subtotal: ${total}</p>
                    <a href='/checkout'>Check out</a>
                </div>
            </>
        )
    }
}

export default Cart
