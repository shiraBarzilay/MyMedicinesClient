import * as Types from "../actions/Types";

const initialState = {
  usersArr: [],
  currentUser: null
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.ADD_NEW_USER:
      return {
        ...state,
        usersArr: [...state.usersArr, action.payload],
        currentUser: action.payload
      }
      case Types.LOGIN:
        return {
          ...state,
          currentUser: action.payload
        }
    case Types.DELETE_USER:
      let arr = state.usersArr.filter(user => user.UserId !== action.payload)
      let currentUser = state.currentUser;
      if (state.currentUser.UserEmail === action.payload.UserEmail && state.currentUser.UserPassword === action.payload.UserPassword) {
        currentUser = null;
      }
      return {
        ...state,
        usersArr: arr,
        currentUser
      }
    default: return state;
  }
}