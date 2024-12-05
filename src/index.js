import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import App from './App'
import store from './store'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {' '}
      <App />
    </LocalizationProvider>
  </Provider>,
)
