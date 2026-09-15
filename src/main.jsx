import React from 'react'
import ReactDOM from 'react-dom/client'
import LandingLay1 from './lay1/LandingLay1.jsx'
import LandingLay2 from './lay2/LandingLay2.jsx'
import LandingLay3 from './lay3/LandingLay3.jsx'
import './index.css'

/**
 * Une variante par chemin, sans routeur :
 *   /       -> Landing — Lay1
 *   /lay2   -> Landing — Lay2
 *   /lay3   -> Landing — Lay3
 */
const VARIANTS = {
  '/': LandingLay1,
  '/lay1': LandingLay1,
  '/lay2': LandingLay2,
  '/lay3': LandingLay3,
}

const path = window.location.pathname.replace(/\/+$/, '') || '/'
const Landing = VARIANTS[path] ?? LandingLay1

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Landing />
  </React.StrictMode>,
)
