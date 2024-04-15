import InventoryForm from "./InventoryForm";
import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllInventory } from "../../store/inventory";

function EditInventoryForm() {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false)
    const item = useSelector(state => state.inventory[id])
    const userRole = useSelector(state => state.session.user.role)

    useEffect(() => {
        if(userRole !== 'Admin') return navigate('/products')

        const fetch = async () => {
            await dispatch(getAllInventory())
            setLoaded(true)
        }
        fetch()
    }, [dispatch, id])

    if (!loaded) return <>Loading...</>
    if (!item) return <h1>Page Not Found</h1>
    
    return (
        <>
            <InventoryForm item={item} formType="Update Inventory" />
        </>
    )
}


export default EditInventoryForm
