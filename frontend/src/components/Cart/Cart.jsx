import './Cart.css'


function Cart({cartItems}) {
    console.log(cartItems)

    if(!cartItems) {
        return (
            <a href='/products'>Continue Shopping!</a>
        )
    } else {
        return (
            <>
                <div className='CartItemContainer'>
                    {cartItems && cartItems.map(item =>
                        <div className='CartItemDetailContainer'>
                            {item.Inventory.model}
                            <img className='CartItemImage' src={item.Inventory.image_url}></img>
                        </div>
                    )}
                </div>
                <div>
                    Total
                </div>
            </>
        )
    }
}

export default Cart
