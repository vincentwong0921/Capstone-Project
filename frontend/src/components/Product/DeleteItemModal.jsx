import "./DeleteItemModal.css";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { removeInventory } from "../../store/inventory";

function DeleteItemModal({ item }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const confirmDelete = async (e) => {
    e.preventDefault();
    await dispatch(removeInventory(item.id))
    closeModal();
  };

  const nope = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <form className="DeleteItemForm">
      <h2>Confirm Delete</h2>
      <div className="ItemDeleteDes">
        Are you sure you want to delete this item?
      </div>
      <div className="NameAndImage">
        <div className="ItemName">{item.name}</div>
        <img className="itemImage" src={item.image_url} />
      </div>
      <div className="DeleteItemButtons">
        <button className="DeleteButton" onClick={confirmDelete}>
          Yes (Delete Item)
        </button>
        <button className="NoDeleteButton" onClick={nope}>
          No (Keep Item)
        </button>
      </div>
    </form>
  );
}

export default DeleteItemModal;
