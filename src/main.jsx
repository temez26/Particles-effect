import React from 'react'
import ReactDOM from 'react-dom/client'
import Game from './game.jsx'
import Background from './App.jsx'
import './App.css'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <Background/>
    <Game/>
    
  </React.StrictMode>,
)
