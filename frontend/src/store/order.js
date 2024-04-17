import { csrfFetch } from "./csrf"

const LOAD_ORDERS = 'products/LOAD_ORDERS'
const ADD_ORDER = 'products/ADD_ORDER'
const EDIT_ORDER = 'products/EDIT_ORDER'
const REMOVE_ORDER = 'products/REMOVE_ORDER'

// Actions
export const loadOrders = orders => ({
    type: LOAD_ORDERS,
    orders
})

export const addOrder = order => ({
    type: ADD_ORDER,
    order
})

export const editOrder = order => ({
    type: EDIT_ORDER,
    order
})

export const deleteOrder = orderId => ({
    type: REMOVE_ORDER,
    orderId
})

// Thunk
export const getAllOrders= () => async (dispatch) => {
    const res = await csrfFetch('/api/orders')

    if (res.ok){
        const orders = await res.json()
        dispatch(loadOrders(orders))
    }
}

export const createOrder = order => async (dispatch) => {
    const res = await csrfFetch('/api/orders', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(order)
    })

    if (res.ok){
        const newOrder = await res.json()
        dispatch(addOrder(newOrder))
        return newOrder
    }
}

export const updateOrder = order => async (dispatch) => {
    const res = await csrfFetch(`/api/orders/${order.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(order)
    })

    if(res.ok){
        const updateOrder = await res.json()
        dispatch(editOrder(updateOrder))
        return updateOrder
    }
}

export const removeOrder = orderId => async (dispatch) => {
    const res = await csrfFetch(`/api/orders/${orderId}`, {
        method: 'DELETE'
    })

    if(res.ok) {
        dispatch(deleteOrder(orderId))
    }
}

// Reducer
const initialState = {}

const orderReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_ORDERS: {
            const orderState = {}
            action.orders.forEach(order => orderState[order.id] = order)
            return orderState
        }
        case ADD_ORDER: {
            return {...state, [action.order.id]: action.order}
        }
        case EDIT_ORDER: {
            return {...state, [action.order.id]: action.order}
        }
        case REMOVE_ORDER: {
            const newOrderState = {...state}
            delete newOrderState[action.orderId]
            return newOrderState
        }
        default:
            return state
    }
}

export default orderReducer;
