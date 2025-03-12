import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import App from '@/App.tsx'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'

import { ThemeProvider } from 'next-themes'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StrictMode>
      <ThemeProvider defaultTheme='light'>
        <App />
      </ThemeProvider>
    </StrictMode>
  </Provider>
)
