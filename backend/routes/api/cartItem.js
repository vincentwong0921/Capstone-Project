const express = require("express");
const { requireAuth } = require("../../utils/auth");
const { CartItem, Cart } = require('../../db/models')

const router = express.Router()

// Edit the quantity of a cart Item
router.put('/:itemId', requireAuth, async(req, res) => {
    const cartItemId = req.params.itemId
    const item = await CartItem.findByPk(cartItemId)
    const user_id = req.user.id

    if (!item) return res.status(404).json({message: "Cart Item couldn't be found"})

    const cart = await Cart.findByPk(item.cart_id)

    if(cart.user_id !== user_id) return res.status(403).json({message: 'Forbidden'})

    const { quantity } = req.body

    await item.update({quantity})
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

    await item.destroy()
    return res.json({ message: 'Successfully deleted!'})
})


module.exports = router
