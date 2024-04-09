const express = require("express");
const { requireAuth } = require("../../utils/auth");
const { Inventory } = require("../../db/models");
const { handleValidationErrors } = require("../../utils/validation");
const { check } = require("express-validator");
const { route } = require("./inventories");

const router = express.Router();

const validateInventory = [
  check("categories")
    .exists({ checkFalsy: true })
    .withMessage("Categories is required"),
  check("brand").exists({ checkFalsy: true }).withMessage("Brand is required"),
  check("model").exists({ checkFalsy: true }).withMessage("Model is required"),
  check("color").exists({ checkFalsy: true }).withMessage("Color is required"),
  check("condition")
    .exists({ checkFalsy: true })
    .withMessage("Condition is required"),
  check("price")
    .exists({ checkFalsy: true })
    .isFloat({ min: 1 })
    .withMessage("Price must be greater than 0"),
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

    if (userRole !== "Admin") return res.status(403).json({ message: 'Forbidden'})

    const { categories, brand, model, storage, color, condition, price, image_url } = req.body
    const newInventory = await Inventory.create({ categories, brand, model, storage, color, condition, price, image_url })

    return res.status(201).json(newInventory)
});

//Edit Inventory By inventory Id
router.put('/:inventoryId', requireAuth, validateInventory, async(req, res) => {
    const id = req.params.inventoryId;
    const userRole = req.user.role;
    const inventory = await Inventory.findByPk(id)

    if(!inventory) return res.status(404).json({ message: "Inventory could not be found" });

    if (userRole !== "Admin") return res.status(403).json({ message: 'Forbidden'})

    const { categories, brand, model, storage, color, condition, price, image_url } = req.body
    await inventory.update({ categories, brand, model, storage, color, condition, price, image_url })
    return res.json(inventory)

})

//Delete Inventory by Inventory Id
router.delete('/:inventoryId', requireAuth, async(req, res) => {
    const id = req.params.inventoryId;
    const userRole = req.user.role;
    const inventory = await Inventory.findByPk(id)

    if(!inventory) return res.status(404).json({ message: "Inventory could not be found" });
    if (userRole !== "Admin") return res.status(403).json({ message: 'Forbidden'})

    await inventory.destroy()
    return res.json({ message: 'Successfully deleted!'})
})

module.exports = router;
