import React from 'react'
import ReactDOM from 'react-dom/client'
import LandingLay1 from './lay1/LandingLay1.jsx'
import LandingLay2 from './lay2/LandingLay2.jsx'
import './index.css'

/**
 * Une variante par chemin, sans routeur :
 *   /       -> Landing — Lay1
 *   /lay2   -> Landing — Lay2
 */
const VARIANTS = {
  '/': LandingLay1,
  '/lay1': LandingLay1,
  '/lay2': LandingLay2,
}

const path = window.location.pathname.replace(/\/+$/, '') || '/'
const Landing = VARIANTS[path] ?? LandingLay1

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Landing />
  </React.StrictMode>,
)
