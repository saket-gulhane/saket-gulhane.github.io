import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/red-hat-display/wght.css'
import '@fontsource-variable/red-hat-mono/wght.css'
import './styles.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
