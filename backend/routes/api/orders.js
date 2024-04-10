const express = require("express");
const { requireAuth } = require("../../utils/auth");
const { Order, OrderDetail, Inventory } = require("../../db/models");
const { handleValidationErrors } = require("../../utils/validation");
const { check } = require("express-validator");

const router = express.Router();

const validateOrder = [
    check("address")
        .exists({ checkFalsy: true })
        .withMessage("Address is required"),
    check("city")
        .exists({ checkFalsy: true })
        .withMessage("City is required"),
    check("state")
        .exists({ checkFalsy: true })
        .withMessage("State is required"),
    check("zip")
        .exists({ checkFalsy: true })
        .withMessage("Zip Code is required"),
    handleValidationErrors
]

// Get All Orders, Role must be Admin
router.get("/", requireAuth, async (req, res) => {
  const userRole = req.user.role;
  if (userRole !== "Admin")
    return res.status(403).json({ message: "Forbidden" });

  const orders = await Order.findAll();
  return res.json(orders);
});

// Get All Order of Current User
router.get("/current", requireAuth, async (req, res) => {
  const user_id = req.user.id;

  const orders = await Order.findAll({
    where: { user_id: user_id },
    include: [
      {
        model: OrderDetail,
        attribute: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: Inventory,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      },
    ],
  });

  return res.json(orders);
});

// Create An Order and its details
router.post('/', requireAuth, validateOrder, async(req, res) => {
    const user_id = req.user.id
    const { address, city, state, zip, amount, order_details } = req.body

    const newOrder = await Order.create({
        user_id, address, city, state, zip, amount,
        status: 'Order Received'
    })

    for (const detail of order_details) {
        await OrderDetail.create({
            order_id: newOrder.id,
            inventory_id: detail.inventory_id,
            quantity: detail.quantity
        });
    }

    return res.json(newOrder)
})

// Edit an Order Status - Must be Owner
router.put('/:orderId', requireAuth, async(req, res) => {
    const orderId = req.params.orderId
    const userRole = req.user.role

    if (userRole !== 'Admin') return res.status(403).json({ message: "Forbidden" })

    const order = await Order.findByPk(orderId)

    if(!order) return res.status(404).json({ message: "Order not be found" });

    const { status } = req.body

    await order.update({ status })
    return res.json(order)
})

// Delete an Order - Must be Owner
router.delete('/:orderId', requireAuth, async(req, res) => {
    const orderId = req.params.orderId
    const userRole = req.user.role

    if (userRole !== 'Admin') return res.status(403).json({ message: "Forbidden" })
    const order = await Order.findByPk(orderId)

    if(!order) return res.status(404).json({ message: "Order not be found" });

    await order.destroy()
    return res.json({ message: 'Successfully deleted!'})
})

module.exports = router;
