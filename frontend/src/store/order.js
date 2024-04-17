import { csrfFetch } from "./csrf"

const LOAD_ALL_ORDERS = 'orders/LOAD_ORDERS'
const LOAD_MY_ORDERS = 'orders/LOAD_MY_ORDERS'
const ADD_ORDER = 'orders/ADD_ORDER'
const EDIT_ORDER = 'orders/EDIT_ORDER'
const REMOVE_ORDER = 'orders/REMOVE_ORDER'

// Actions
export const loadAllOrders = orders => ({
    type: LOAD_ALL_ORDERS,
    orders
})

export const loadMyOrders = orders => ({
    type: LOAD_MY_ORDERS,
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
        dispatch(loadAllOrders(orders))
    }
}

export const getMyOrders = () => async (dispatch) => {
    const res = await csrfFetch('/api/orders/current')

    if (res.ok){
        const orders = await res.json()
        dispatch(loadMyOrders(orders))
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
        case LOAD_ALL_ORDERS: {
            const orderState = {}
            action.orders.forEach(order => orderState[order.id] = order)
            return orderState
        }
        case LOAD_MY_ORDERS: {
            const myOrderState = {}
            action.orders.forEach(order => myOrderState[order.id] = order)
            return myOrderState
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
