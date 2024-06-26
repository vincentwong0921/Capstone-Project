import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

/* actions */
export const setUser = user => ({
  type: SET_USER,
  user
})

export const removeUser = () => ({
  type: REMOVE_USER,
})

/* thunks */
export const login = (user) => async (dispatch) => {
  const { email, password } = user;

  const response = await csrfFetch("/api/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const signUpUser = (user) => async (dispatch) => {
  const { first_name, last_name, phone, email, password } = user;

  const response = await csrfFetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      first_name, last_name, phone, email, password,
    }),
  });

  const data = await response.json();

  dispatch(setUser(data.user));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  dispatch(removeUser());
  return response;
};

/* reducer */
const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        user: action.user,
      };
    }
    case REMOVE_USER: {
      return { ...state, user: null };
    }
    default:
      return state;
  }
};

export default sessionReducer;
