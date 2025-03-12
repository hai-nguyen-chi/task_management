import React from 'react'
import { BrowserRouter as Router, useRoutes } from 'react-router-dom'
import routes from '@/router/index.tsx'

const AppRoutes = () => {
  const element = useRoutes(routes)
  return element
}

const App: React.FC = () => {
  return (
    <Router>
      <React.Suspense fallback={<div>Loading...</div>}>
        <AppRoutes />
      </React.Suspense>
    </Router>
  )
}
export default App
