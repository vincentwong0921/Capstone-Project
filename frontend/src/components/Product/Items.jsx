import './Items.css'
import { useSelector, useDispatch } from 'react-redux';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import DeleteItemModal from './DeleteItemModal';
import { Link } from "react-router-dom";
import { addItemToCart, getUserCartItems } from '../../store/cartItem';
import { getUserCart } from "../../store/cart";
import { useState, useEffect } from 'react';

function Items({ items, selectedModel }) {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user);
    const isAdmin = user?.role === 'Admin'
    const cart_id = useSelector(state => state.cart['1']?.id)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            await dispatch(getUserCartItems())
            setLoaded(true)
        }
        fetch()
    }, [dispatch])

    let itemsToRender
    if(selectedModel === "All Models") {
        itemsToRender = items
    } else {
        itemsToRender = items.filter(item => item.model === selectedModel)
    }

    const AddItem = async(inventoryId) => {
        await dispatch(addItemToCart(cart_id, {inventory_id: inventoryId}))
        await dispatch(getUserCart())
    }

    if(!loaded) return <>Loading...</>

    return (
        <>
            {itemsToRender && itemsToRender.map(item =>
                <div key={item.id}>
                    <div className='ItemContainer'>
                        <div className='InnerContainer'>
                            <div className='ModelStorage'>
                                <p>{item.model}</p>
                                <p>{item.storage}</p>
                            </div>
                            <div className='ColorAndCarrier'>
                                <p>Color: {item.color}</p>
                                <p>Carrier: {item.carrier}</p>
                            </div>
                            <div className='ConditionAndPrice'>
                                <p>Condition: {item.condition}</p>
                                <p>Price: ${item.price.toFixed(2)}</p>
                                <p>{item.available_units > 1 ? "Available Units" : "Available Unit" } : {item.available_units}</p>
                            </div>
                        </div>
                        <div>
                            {user && (
                                <button onClick={() => AddItem(item.id)}>Add Item</button>
                            )}
                            {user && isAdmin ?
                            <div className='UpdateItemLink'>
                                <Link to={`/products/${item.id}/edit`}>Edit</Link>
                            </div>
                            : null}
                            {user && isAdmin ?
                            <div className='DeleteItemButton'>
                                <OpenModalButton
                                    buttonText="Delete"
                                    modalComponent={
                                        <DeleteItemModal
                                        item={item}
                                        />
                                    }
                                />
                            </div>: null
                            }
                        </div>
                        <div className='ImageContainer'>
                            <img className='InvImage' src={item.image_url}/>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}


export default Items
