import { csrfFetch } from "./csrf"

const LOADITEMS = 'cart-items/LOAD_ITEMS'
const ADDITEM = 'cart-items/ADD_ITEM'
const EDITITEM = 'cart-items/EDITITEM'
const REMOVEITEM = 'cart_items/REMOVE_ITEM'


// Actions
export const loadCartItems = cartItems => ({
    type: LOADITEMS,
    cartItems
})


export const addItem = cartItem => ({
    type: ADDITEM,
    cartItem
})

export const editItem = cartItem => ({
    type: EDITITEM,
    cartItem
})

export const removeItem = cartItemId => ({
    type: REMOVEITEM,
    cartItemId
})

// Thunk
export const getUserCartItems = () => async (dispatch) => {
    const res = await csrfFetch('/api/cart-items/current')

    if(res.ok){
        const cartItems = await res.json()
        dispatch(loadCartItems(cartItems))
    }
}


export const addItemToCart = (cartId, cartItem ) => async (dispatch) => {
    const res = await csrfFetch(`/api/carts/${cartId}/cart-items`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(cartItem)
    })

    if (res.ok){
        const newCartItem = await res.json()
        dispatch(addItem(newCartItem))
    }
}

export const editItemInCart = cartItem => async (dispatch) => {
    const res = await csrfFetch(`/api/cart-items/${cartItem.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(cartItem)
    })

    if (res.ok){
        const editedCartItem = await res.json()
        dispatch(editItem(editedCartItem))
        return editedCartItem
    }
}

export const deleteCartItem = cartItemId => async (dispatch) => {
    const res = await csrfFetch(`/api/cart-items/${cartItemId}`, {
        method: 'DELETE'
    })

    if(res.ok) {
        dispatch(removeItem(cartItemId))
    }
}


// Reducer
const initialState = {}

const cartItemReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOADITEMS : {
            const cartItemsState = {}
            action.cartItems.forEach(cartItem => cartItemsState[cartItem.id] = cartItem)
            return cartItemsState
        }
        case ADDITEM: {
            return {...state, [action.cartItem.id]: action.cartItem}
        }
        case EDITITEM: {
            return {...state, [action.cartItem.id]: action.cartItem}
        }
        case REMOVEITEM: {
            const newCartItemState = {...state}
            delete newCartItemState[action.cartItemId]
            return newCartItemState
        }
        default:
            return state
    }
}

export default cartItemReducer;
