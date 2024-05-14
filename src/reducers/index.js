import { combineReducers } from 'redux';

// Reducers
const initialState = {
  user: "",
  admin: "",
  zoneAdmin: "",
  vendor: "",
  loggedIn: false,
};

const currentUser = (state = initialState, action) => {
  switch(action.type){
      case "SET_USER":
          return {
              ...state,
              user: action.payload,
              loggedIn: true
          }
      case "SET_ADMIN":
        return {
          ...state,
          admin: action.payload

        }
        case "SET_ZONE_ADMIN":
          return {
            ...state,
            user: {},
            zoneAdmin: action.payload
          }
          case "SET_VENDOR":
            return {
              ...state,
              user:{},
              vendor: action.payload

            }
      case "LOG_OUT":
          return {
              ...state,
              user: {},
              admin: "",
              zoneAdmin: "",
              vendor: "",
              loggedIn: false
          }
      default:
          return state
  }
}

// Combine Reducers
const rootReducer = combineReducers({
  user: currentUser
  // Add other reducers here if you have more
});

export default rootReducer