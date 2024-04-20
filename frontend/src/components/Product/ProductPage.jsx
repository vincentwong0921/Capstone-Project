import './ProductPage.css'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { getAllReviews } from '../../store/review'
import { getAllInventory } from '../../store/inventory'
import Review from '../Review/Review'
import Models from './Models'

function ProductPage(){
    const dispatch = useDispatch()
    const [ isloaded, setIsLoaded ] = useState(false)
    const [ selectedBrand, setSelectedBrand ] = useState("All Brands")
    const inventoriesList = Object.values(useSelector(state => state.inventory))
    const reviewList = Object.values(useSelector(state => state.review))
    const brandList = ["All Brands", ...new Set(inventoriesList.map(inventory => inventory.brand))]
    const handleBrandClick = brand => setSelectedBrand(brand)

    useEffect(() => {
        const fetch = async () => {
            await dispatch(getAllInventory())
            await dispatch(getAllReviews())
            setIsLoaded(true)
        }
        fetch()
    }, [dispatch])

    if(!isloaded) return <>Loading...</>

    return (
        <>
            <div className='BrandContainer'>
                {brandList && brandList.map((brand) => (
                    <div onClick={() => handleBrandClick(brand)} key={brand} className={selectedBrand === brand ? 'SelectedBrand' : 'Brands'}>
                        {brand}
                    </div>
                ))}
            </div>
            <div className='BottomContainer'>
                    <div className='ModelContainer'>
                        <Models selectedBrand={selectedBrand} inventoriesList={inventoriesList}/>
                    </div>
                    <div className='ReviewContainer'>
                        <Review reviewList={reviewList}/>
                    </div>
            </div>
        </>
    )
}


export default ProductPage
