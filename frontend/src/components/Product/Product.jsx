import './Product.css'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { getAllInventory } from '../../store/inventory'

function Product(){
    const dispatch = useDispatch()
    const [ isloaded, setIsLoaded ] = useState(false)
    const inventoriesList = Object.values(useSelector(state => state.inventory))
    const brandList = [...new Set(inventoriesList.map(inventory => inventory.brand))]

    useEffect(() => {
        const fetch = async () => {
            await dispatch(getAllInventory())
            setIsLoaded(true)
        }
        fetch()
    }, [dispatch])

    if(!isloaded) return <>Loading...</>

    return (
        <>
            <div className='BrandContainer'>
                {brandList && brandList.map((brand) => (
                    <div className='Brands'>
                        {brand}
                    </div>
                ))}
            </div>

        </>
    )
}


export default Product


            {/* <div className='InventoryPageContainer'>
                <div>
                    {isloaded && inventoriesList && inventoriesList.map(inventory => (
                        <>
                            <div>
                                {inventory.brand}
                                {inventory.model}
                                {inventory.carrier}
                                {inventory.storage}
                                {inventory.color}
                                {inventory.condition}
                                {inventory.price}
                            </div>
                            <ul>
                                <img className='InvImage' src={inventory.image_url}/>
                            </ul>
                        </>
                    ))}
                </div>
            </div> */}
