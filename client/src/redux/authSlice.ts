import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/redux/store'
import { AuthState } from '@/types/auth.type'

const auth: AuthState = {
  access_token: window.localStorage.getItem('access_token') || '',
  refresh_token: window.localStorage.getItem('refresh_token') || ''
}

const initialState: AuthState = auth

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      state.access_token = action.payload.access_token
      window.localStorage.setItem('access_token', action.payload.access_token)
      state.refresh_token = action.payload.refresh_token
      window.localStorage.setItem('refresh_token', action.payload.refresh_token)
    },
    logout: (state) => {
      state.access_token = ''
      window.localStorage.setItem('access_token', '')
      state.refresh_token = ''
      window.localStorage.setItem('refresh_token', '')
    }
  }
})

// To able to use reducers we need to export them.
export const { login, logout } = authSlice.actions

//Selector to access bookList state.
export const selectAccessToken = (state: RootState) => state.auth.access_token
export const selectRefreshToken = (state: RootState) => state.auth.refresh_token

export default authSlice.reducer
