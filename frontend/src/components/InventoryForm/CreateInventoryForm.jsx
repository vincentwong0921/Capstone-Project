import InventoryForm from "./InventoryForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function CreateInventoryForm() {
    const userRole = useSelector(state => state.session.user.role)
    const navigate = useNavigate()

    useEffect(() => {
        if(userRole !== 'Admin') return navigate('/products')
    })

    const newInventory = {
        categories: '',
        brand: '',
        model: '',
        carrier: '',
        storage: '',
        color: '',
        condition: '',
        price: '',
        image_url: ''
    }

    return (
        <>
            <InventoryForm item={newInventory} formType='Create Inventory'/>
        </>
    )
}


export default CreateInventoryForm
