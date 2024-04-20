const express = require("express");
const { requireAuth } = require("../../utils/auth");
const { CartItem, Cart, Inventory } = require('../../db/models')

const router = express.Router()

// get all cart-items of the user
router.get('/current', requireAuth, async(req, res) => {
    const user_id = req.user.id
    const cart = await Cart.findOne({
        where: {user_id: user_id}
    })
    const cartItems = await CartItem.findAll({
        where: {cart_id: cart.id},
        include: [
            {
                model: Inventory,
                attributes: { exclude: ['createdAt', 'updatedAt'] },
            }
        ]
    })

    return res.json(cartItems)
})

// Edit the quantity of a cart Item
router.put('/:itemId', requireAuth, async(req, res) => {
    const cartItemId = req.params.itemId
    const item = await CartItem.findByPk(cartItemId)
    const user_id = req.user.id

    if (!item) return res.status(404).json({message: "Cart Item couldn't be found"})

    const cart = await Cart.findByPk(item.cart_id)

    if(cart.user_id !== user_id) return res.status(403).json({message: 'Forbidden'})

    const inventoryId = item.inventory_id
    const inventory = await Inventory.findByPk(inventoryId)

    const { quantity } = req.body
    const diff = quantity - item.quantity

    await item.update({quantity})
    await inventory.update({available_units: inventory.available_units - diff})
    return res.json(item)
})

// Delete a Cart Item by Id
router.delete('/:itemId', requireAuth, async(req, res) => {
    const cartItemId = req.params.itemId
    const item = await CartItem.findByPk(cartItemId)
    const user_id = req.user.id

    if (!item) return res.status(404).json({message: "Cart Item couldn't be found"})

    const cart = await Cart.findByPk(item.cart_id)

    if(cart.user_id !== user_id) return res.status(403).json({message: 'Forbidden'})
    const inventoryId = item.inventory_id
    const inventory = await Inventory.findByPk(inventoryId)

    await item.destroy()
    await inventory.update({available_units: inventory.available_units + 1})
    return res.json({ message: 'Successfully deleted!'})
})


module.exports = router
