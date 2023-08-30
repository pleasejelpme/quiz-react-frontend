import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { CssBaseline, Container } from '@mui/material'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CssBaseline />
    <Container sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <App />
    </Container>
  </BrowserRouter>
)
