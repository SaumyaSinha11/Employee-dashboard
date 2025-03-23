import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {ThemeProvider} from './ThemeContext';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
      <ThemeProvider>
      <App />
      </ThemeProvider>
)
