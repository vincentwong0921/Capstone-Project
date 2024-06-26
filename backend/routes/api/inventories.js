const express = require("express");
const { requireAuth } = require("../../utils/auth");
const { Inventory } = require("../../db/models");
const { handleValidationErrors } = require("../../utils/validation");
const { check } = require("express-validator");

const router = express.Router();

const validateInventory = [
  check("categories")
    .exists({ checkFalsy: true })
    .withMessage("Categories is required")
    .custom((value) => {
      if (value.trim().length === 0) {
        throw new Error("Invalid Category");
      }
      return true;
    }),
  check("brand")
    .exists({ checkFalsy: true })
    .withMessage("Brand is required")
    .custom((value) => {
      if(value.trim().length === 0){
        throw new Error('Invalid Brand')
      }
      return true
    }),
  check("model")
    .exists({ checkFalsy: true })
    .withMessage("Model is required")
    .custom((value) => {
      if(value.trim().length === 0){
        throw new Error('Invalid Model')
      }
      return true
    }),
  check("color")
    .exists({ checkFalsy: true })
    .withMessage("Color is required")
    .custom((value) => {
      if(value.trim().length === 0){
        throw new Error('Invalid Color')
      }
      return true
    }),
  check("condition")
    .exists({ checkFalsy: true })
    .withMessage("Condition is required"),
  check("price")
    .exists({ checkFalsy: true })
    .isFloat({ min: 1 })
    .withMessage("Price must be greater than 0"),
  check("available_units")
    .exists({ checkFalsy: true })
    .isFloat({ min: 1 })
    .withMessage("Available units must be greater than 0"),
  check("image_url")
    .exists({ checkFalsy: true })
    .withMessage("Image is required"),
  handleValidationErrors,
];

//Get All Inventories
router.get("/", async (req, res) => {
  const inventories = await Inventory.findAll();
  return res.json(inventories);
});

//Get Inventory by inventory Id
router.get("/:inventoryId", async (req, res) => {
  const id = req.params.inventoryId;

  const inventory = await Inventory.findOne({
    where: { id },
  });

  if (inventory) {
    return res.json(inventory);
  } else {
    return res.status(404).json({ message: "Inventory could not be found" });
  }
});

//Create Inventory By Owner
router.post("/", requireAuth, validateInventory, async (req, res) => {
  const userRole = req.user.role;

  if (userRole !== "Admin")
    return res.status(403).json({ message: "Forbidden" });

  let {
    categories,
    brand,
    model,
    carrier,
    storage,
    color,
    condition,
    price,
    available_units,
    image_url,
  } = req.body;

  categories = categories[0].toUpperCase() + categories.slice(1).toLowerCase();
  brand = brand[0].toUpperCase() + brand.slice(1).toLowerCase();
  model = model[0].toUpperCase() + model.slice(1).toLowerCase();
  color = color[0].toUpperCase() + color.slice(1).toLowerCase();

  const newInventory = await Inventory.create({
    categories,
    brand,
    model,
    carrier,
    storage,
    color,
    condition,
    price,
    available_units,
    image_url,
  });

  return res.status(201).json(newInventory);
});

//Edit Inventory By inventory Id
router.put(
  "/:inventoryId",
  requireAuth,
  validateInventory,
  async (req, res) => {
    const id = req.params.inventoryId;
    const userRole = req.user.role;
    const inventory = await Inventory.findByPk(id);

    if (!inventory)
      return res.status(404).json({ message: "Inventory could not be found" });

    if (userRole !== "Admin")
      return res.status(403).json({ message: "Forbidden" });

    let {
      categories,
      brand,
      model,
      carrier,
      storage,
      color,
      condition,
      price,
      available_units,
      image_url,
    } = req.body;
    brand = brand[0].toUpperCase() + brand.slice(1).toLowerCase();
    model = model[0].toUpperCase() + model.slice(1).toLowerCase();
    color = color[0].toUpperCase() + color.slice(1).toLowerCase();

    await inventory.update({
      categories,
      brand,
      model,
      carrier,
      storage,
      color,
      condition,
      price,
      available_units,
      image_url,
    });
    return res.json(inventory);
  }
);

//Delete Inventory by Inventory Id
router.delete("/:inventoryId", requireAuth, async (req, res) => {
  const id = req.params.inventoryId;
  const userRole = req.user.role;
  const inventory = await Inventory.findByPk(id);

  if (!inventory)
    return res.status(404).json({ message: "Inventory could not be found" });
  if (userRole !== "Admin")
    return res.status(403).json({ message: "Forbidden" });

  await inventory.destroy();
  return res.json({ message: "Successfully deleted!" });
});

module.exports = router;
