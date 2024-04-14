import './ProductPage.css'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { getAllInventory } from '../../store/inventory'
import Models from './Models'

function ProductPage(){
    const dispatch = useDispatch()
    const [ isloaded, setIsLoaded ] = useState(false)
    const [ selectedBrand, setSelectedBrand ] = useState(null)
    const inventoriesList = Object.values(useSelector(state => state.inventory))
    const brandList = ['All Brands', ...new Set(inventoriesList.map(inventory => inventory.brand))]
    const handleBrandClick = brand => setSelectedBrand(brand)

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
                    <div onClick={() => handleBrandClick(brand)} key={brand} className='Brands'>
                        {brand}
                    </div>
                ))}
            </div>
            <div className='BottomContainer'>
                    <div>
                        <Models selectedBrand={selectedBrand} inventoriesList={inventoriesList}/>
                    </div>
                    <div>

                    </div>
            </div>
        </>
    )
}


export default ProductPage
