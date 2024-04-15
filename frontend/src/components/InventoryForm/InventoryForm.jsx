import "./InventoryForm.css";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createInventory, updateInventory } from "../../store/inventory";

function InventoryForm({ item, formType }) {
  const dispatch = useDispatch();
  const { id } = useParams()
  const navigate = useNavigate()
  const [categories, setCategories] = useState(item?.categories);
  const [brand, setBrand] = useState(item?.brand);
  const [model, setModel] = useState(item?.model);
  const [carrier, setCarrier] = useState(item?.carrier);
  const [storage, setStorage] = useState(item?.storage);
  const [color, setColor] = useState(item?.color);
  const [condition, setCondition] = useState(item?.condition || 'Brand New(Opened Box)');
  const [price, setPrice] = useState(item?.price);
  const [image_url, setImage_url] = useState(item?.image_url);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    try {
        e.preventDefault();
        item = {categories, brand, model, carrier, storage, color, condition, price, image_url}
        if (formType === 'Create Inventory') {
          await dispatch(createInventory(item))
        } else if (formType === 'Update Inventory') {
          item.id = id
          console.log(item.carrier)
          await dispatch(updateInventory(item))
        }
        navigate('/products')
    } catch (error) {
        const data = await error.json()
        setErrors(data.errors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>
        {formType === "Create Inventory"
          ? "Create a New Item"
          : "Update The Item"}
      </h2>
      <label>
        <h4>Category: </h4>
        <input
          type="text"
          value={categories}
          required
          onChange={(e) => setCategories(e.target.value)}
          placeholder="Phone, Tablet, Accessories"
        />
      </label>
      <label>
        <h4>Brand: </h4>
        <input
          type="text"
          required
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Apple, Samsung, Pixel.."
        />
      </label>
      <label>
        <h4>Model: </h4>
        <input
          type="text"
          required
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="iPhone 15 Pro..."
        />
      </label>
      <label>
        <h4>Carrier: </h4>
        <input
          type="text"
          value={carrier}
          onChange={(e) => setCarrier(e.target.value)}
          placeholder="ATT, T-Mobile, Unlocked.."
        />
      </label>
      <label>
        <h4>Storage: </h4>
        <input
          type="text"
          value={storage}
          onChange={(e) => setStorage(e.target.value)}
          placeholder="128GB, 256GB..."
        />
      </label>
      <label>
        <h4>Color: </h4>
        <input
          type="text"
          value={color}
          required
          onChange={(e) => setColor(e.target.value)}
          placeholder="White, Black, Space Grey.."
        />
      </label>
      <label>
        <h4>Condition: </h4>
        <select
          type="text"
          value={condition}
          required
          onChange={(e) => setCondition(e.target.value)}
        >
          <option value="Brand New(Opened Box)">Brand New(Opened Box)</option>
          <option value="Like New">Like New</option>
          <option value="Excellent +">Excellent +</option>
          <option value="Excellent">Excellent</option>
          <option value="Very Good">Very Good</option>
          <option value="Fair">Fair</option>
          <option value="Repair Stock">Repair Stock</option>
        </select>
      </label>
      <label>
        {errors && errors.price && <p>{errors.price}</p>}
        <h4>Price: </h4>
        <input
          type="number"
          value={price}
          required
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Please enter the price"
        />
      </label>
      <label>
        <h4>Upload Your Image: </h4>
        <input
          type="text"
          value={image_url}
          required
          onChange={(e) => setImage_url(e.target.value)}
        />
      </label>
      <div className="SubmitButton">
        <button
          className="SubmitButton"
        >
          {formType}
        </button>
      </div>
    </form>
  );
}

export default InventoryForm;
