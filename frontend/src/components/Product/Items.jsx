import './Items.css'
import { useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import DeleteItemModal from './DeleteItemModal';
import { Link } from "react-router-dom";

function Items({ items, selectedModel }) {
    const user = useSelector((state) => state.session.user);
    const isAdmin = user?.role === 'Admin'

    let itemsToRender
    if(selectedModel === "All Models") {
        itemsToRender = items
    } else {
        itemsToRender = items.filter(item => item.model === selectedModel)
    }

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
                            <div className=''>
                                <p>Color: {item.color}</p>
                                <p>Carrier: {item.carrier}</p>
                            </div>
                            <div className=''>
                                <p>Condition: {item.condition}</p>
                                <p>Price: ${item.price.toFixed(2)}</p>
                            </div>
                        </div>
                        <div>
                            {user && isAdmin ?
                            <div className='UpdateItemLink'>
                                <Link to={`/products/${item.id}/edit`}>Update</Link>
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
