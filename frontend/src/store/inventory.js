import { csrfFetch } from "./csrf"

const LOAD_INVENTORY = 'products/LOAD_INVENTORY'
const ADD_INVENTORY = 'products/ADD_INVENTORY'
const EDIT_INVENTORY = 'products/EDIT_INVENTORY'
const REMOVE_INVENTORY = 'products/REMOVE_INVENTORY'

// Actions
export const loadInventories = inventories => ({
    type: LOAD_INVENTORY,
    inventories
})

export const addInventory = inventory => ({
    type: ADD_INVENTORY,
    inventory
})

export const editItem = inventory => ({
    type: EDIT_INVENTORY,
    inventory
})

export const deleteItem = inventoryId => ({
    type: REMOVE_INVENTORY,
    inventoryId
})

// Thunk
export const getAllInventory = () => async (dispatch) => {
    const res = await csrfFetch('/api/inventories')

    if (res.ok){
        const inventories = await res.json()
        dispatch(loadInventories(inventories))
    }
}

export const createInventory = inventory => async (dispatch) => {
    const res = await csrfFetch('/api/inventories', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(inventory)
    })

    if (res.ok){
        const newItem = await res.json()
        dispatch(addInventory(newItem))
        return newItem
    }
}

export const updateInventory = inventory => async (dispatch) => {
    const res = await csrfFetch(`/api/inventories/${inventory.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(inventory)
    })

    if(res.ok){
        const updateItem = await res.json()
        dispatch(editItem(updateItem))
        return updateItem
    }
}

export const removeInventory = inventoryId => async (dispatch) => {
    const res = await csrfFetch(`/api/inventories/${inventoryId}`, {
        method: 'DELETE'
    })

    if(res.ok) {
        dispatch(deleteItem(inventoryId))
    }
}

// Reducer
const initialState = {}

const inventoryReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_INVENTORY: {
            const invState = {}
            action.inventories.forEach(inventory => invState[inventory.id] = inventory)
            return invState
        }
        case ADD_ITEM: {
            return {...state, [action.inventory.id]: action.inventory}
        }
        case UPDATE_ITEM: {
            return {...state, [action.inventory.id]: action.inventory}
        }
        case DELETE_ITEM: {
            const newInvState = {...state}
            delete newInvState[action.inventoryId]
            return newInvState
        }
        default:
            return state
    }
}

export default inventoryReducer;
