import { legacy_createStore as createStore } from 'redux'

const initialState = {
  sidebarShow: true,
  theme: 'light',
  isAuthenticated: false, // Add authentication state
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    case 'login':
      return { ...state, isAuthenticated: true }
    case 'logout':
      return { ...state, isAuthenticated: false }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store
