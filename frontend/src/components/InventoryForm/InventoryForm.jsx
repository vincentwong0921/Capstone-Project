import './InventoryForm.css'
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createInventory, updateInventory } from '../../store/inventory';


function InventoryForm({ item, formType}){
    const dispatch = useDispatch()
    const { id } = useParams()
    const [categories, setCategories] = useState(item?.categories)
    const [brand, setBrand] = useState(item?.brand)
    const [model, setModel] = useState(item?.model)
    const [carrier, setCarrier] = useState(item?.carrier)
    const [storage, setStorage] = useState(item?.storage)
    const [color, setColor] = useState(item?.color)
    const [condition, setCondition] = useState(item?.condition)
    const [price, setPrice] = useState(item?.price)
    const [imageUrl, setImageUrl] = useState(item?.image_url)
    const [errors, setErrors] = useState({});

    return (
        <form>
            <h2>
                {formType === 'Create Inventory'
                    ? 'Create a New Item'
                    : 'Update The Item'
                }
            </h2>
        </form>
    )
}

export default InventoryForm
