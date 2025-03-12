import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from '@/redux/authSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState> // A global type to access reducers types
export type AppDispatch = typeof store.dispatch // Type to access dispatch
