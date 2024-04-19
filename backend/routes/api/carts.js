const express = require("express");
const { requireAuth } = require("../../utils/auth");
const { User, Cart, CartItem, Inventory } = require('../../db/models');
const e = require("express");

const router = express.Router()

// Get Cart of current User
router.get('/current', requireAuth, async(req, res) => {
    const user_id = req.user.id
    const cart = await Cart.findOne({
        where: { user_id: user_id },
        include: [
            {
                model: User,
                attributes: { exclude: ['last_name', 'phone', 'email', 'role', 'hashedPassword', 'createdAt', 'updatedAt'] },
            },
            {
                model: CartItem,
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [
                    {
                        model: Inventory,
                        attributes: { exclude: ['createdAt', 'updatedAt'] },
                    }
                ]
            }
        ]
    })

    if(!cart) return res.status(404).json({message: "Cart couldn't be found"})

    return res.json(cart)
})

// Get Cart by cartId
router.get('/:cartId', requireAuth, async(req, res) => {
    const cart_id = req.params.cartId
    const cart = await Cart.findOne({
        where: { id: cart_id },
        include: [
            {
                model: User,
                attributes: { exclude: ['last_name', 'phone', 'email', 'role', 'hashedPassword', 'createdAt', 'updatedAt'] },
            },
            {
                model: CartItem,
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [
                    {
                        model: Inventory,
                        attributes: { exclude: ['createdAt', 'updatedAt'] },
                    }
                ]
            }
        ]
    })

    if(!cart) return res.status(404).json({message: "Cart couldn't be found"})

    return res.json(cart)
})

// Create a Cart
router.post('/', requireAuth, async(req, res) => {
    const user_id = req.user.id
    const cart = await Cart.findOne({ where: { user_id: user_id }})

    if (cart) return res.status(403).json({ message: 'User can only have 1 cart.'})

    const newCart = await Cart.create({ user_id: user_id })
    return res.status(201).json(newCart)
})

// Add an Item to the Cart
router.post('/:cartId/cart-items', requireAuth, async(req, res) => {
    const cart_id = req.params.cartId
    const user_id = req.user.id
    const cart = await Cart.findByPk(cart_id)
    const { inventory_id  } = req.body

    if(!cart) return res.status(404).json({message: "Cart couldn't be found"})
    if(cart.user_id !== user_id) return res.status(403).json({message: 'Forbidden'})

    const cartItem = await CartItem.findOne({
        where: {
            cart_id: cart_id,
            inventory_id: inventory_id
        }
    })

    if (cartItem) {
        const editedItem = await cartItem.update({quantity: cartItem.quantity + 1})
        return res.json(editedItem)
    } else {
        const newItem = await CartItem.create({ cart_id: cart.id, inventory_id, quantity: 1 })
        return res.json(newItem)
    }
})


// Delete a Cart
router.delete('/:cartId', requireAuth, async(req, res) => {
    const user_id = req.user.id
    const cart_id = req.params.cartId
    const cart = await Cart.findByPk(cart_id)

    if (!cart) return res.status(404).json({message: "Cart couldn't be found"})
    if (cart.user_id !== user_id) return res.status(403).json({message: 'Forbidden'})

    await cart.destroy()
    return res.json({ message: 'Successfully deleted!'})
})



module.exports = router;
