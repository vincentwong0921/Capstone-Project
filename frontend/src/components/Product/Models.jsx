import Items from "./Items";
import "./Models.css";
import { useState, useEffect } from "react";

function Models({ selectedBrand, inventoriesList }) {
  const [selectedModel, setSelectedModel] = useState("All Models");
  let items;
  if (selectedBrand !== "All Brands") {
    items = inventoriesList.filter(
      (inventory) => inventory.brand === selectedBrand
    );
  } else {
    items = inventoriesList;
  }


  const modelList = ["All Models", ...new Set(items.map((item) => item.model))];
  const handleBrandClick = (model) => setSelectedModel(model);

  return (
    <>
      <div className="ModelAndItemContainer">
        <div>
          {modelList &&
            modelList.map((model) => (
              <div onClick={() => handleBrandClick(model)} key={model}>
                {model}
              </div>
            ))}
        </div>
        <div>
          <Items selectedModel={selectedModel} items={items} />
        </div>
      </div>
    </>
  );
}

export default Models;
