import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/reset.css'
import './styles/site.css'
import './styles/navbar.css'
import './styles/footer.css'
import './styles/glass.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
