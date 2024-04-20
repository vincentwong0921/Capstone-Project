import { csrfFetch } from "./csrf"

const LOAD_CART = 'cart/LOAD_CART'
const ADD_CART = 'cart/ADD_CART'
const REMOVE_CART = 'cart/REMOVE_CART'

// Actions
export const loadCart = cart => ({
    type: LOAD_CART,
    cart
})

export const addCart = cart => ({
    type: ADD_CART,
    cart
})

export const removeCart = cartId => ({
    type: REMOVE_CART,
    cartId
})

// Thunk
export const getUserCart = () => async (dispatch) => {
    const res = await csrfFetch('/api/carts/current')

    if (res.ok){
        const userCart = await res.json()
        dispatch(loadCart(userCart))
    }
}

export const createCart = cart => async (dispatch) => {
    const res = await csrfFetch('/api/carts', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(cart)
    })

    if (res.ok){
        const newCart = await res.json()
        dispatch(addCart(newCart))
        return newCart
    }
}

export const deleteCart = cartId => async (dispatch) => {
    const res = await csrfFetch(`/api/carts/${cartId}`, {
        method: 'DELETE'
    })

    if(res.ok) {
        dispatch(removeCart(cartId))
    }
}


// Reducer
const initialState = {}

const cartReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_CART: {
            return {[action.cart.id]: action.cart}
        }
        case ADD_CART: {
            return {...state, [action.cart.id]: action.cart}
        }
        case REMOVE_CART: {
            const newCartState = {...state}
            delete newCartState[action.cartId]
            return newCartState
        }
        default:
            return state
    }
}

export default cartReducer;
