import { csrfFetch } from "./csrf"

const LOAD_REVIEW = 'products/LOAD_REVIEW'
const LOAD_USER_REVIEWS = 'products/LOAD_USER_REVIEWS'
const ADD_REVIEW = 'products/ADD_REVIEW'
const EDIT_REVIEW = 'products/EDIT_REVIEW'
const REMOVE_REVIEW = 'products/REMOVE_REVIEW'

// Actions
export const loadReviews = reviews => ({
    type: LOAD_REVIEW,
    reviews
})

export const loadUserReviews = reviews => ({
    type: LOAD_USER_REVIEWS,
    reviews
})

export const addReview = review => ({
    type: ADD_REVIEW,
    review
})

export const editReview = review => ({
    type: EDIT_REVIEW,
    review
})

export const deleteReview = reviewId => ({
    type: REMOVE_REVIEW,
    reviewId
})

// Thunk
export const getAllReviews = () => async (dispatch) => {
    const res = await csrfFetch('/api/reviews')

    if (res.ok){
        const reviews = await res.json()
        dispatch(loadReviews(reviews))
    }
}

export const getCurrentUserReviews = () => async (dispatch) => {
    const res = await csrfFetch('/api/reviews/current')

    if (res.ok){
        const reviews = await res.json()
        dispatch(loadReviews(reviews))
    }
}


export const createReview = (orderId, review) => async (dispatch) => {
    const res = await csrfFetch(`/api/orders/${orderId}/reviews`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(review)
    })

    if (res.ok){
        const newReview = await res.json()
        dispatch(addReview(newReview))
        return newReview
    }
}

export const updateReview = review => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(review)
    })

    if(res.ok){
        const updateReview = await res.json()
        dispatch(editReview(updateReview))
        return updateReview
    }
}

export const removeReview = reviewId => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })

    if(res.ok) {
        dispatch(deleteReview(reviewId))
    }
}

// Reducer
const initialState = {}

const reviewReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_REVIEW: {
            const reviewState = {}
            action.reviews.forEach(review => reviewState[review.id] = review)
            return reviewState
        }
        case LOAD_USER_REVIEWS: {
            const userReviewState = {}
            action.reviews.forEach(review => userReviewState[review.id] = review)
            return userReviewState
        }
        case ADD_REVIEW: {
            return {...state, [action.review.id]: action.review}
        }
        case EDIT_REVIEW: {
            return {...state, [action.review.id]: action.review}
        }
        case REMOVE_REVIEW: {
            const newReviewState = {...state}
            delete newReviewState[action.reviewId]
            return newReviewState
        }
        default:
            return state
    }
}

export default reviewReducer;
