import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ProjectProvider } from './context/projectProvider.jsx'
import { UserProvider } from './context/userProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <ProjectProvider>
        <App />
      </ProjectProvider>
    </UserProvider>
  </StrictMode>,
)
