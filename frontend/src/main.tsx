import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createTheme, ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { Authprovider } from './context/Authcontext.tsx'
import axios from "axios"
import {Toaster} from "react-hot-toast"

axios.defaults.baseURL = "http://localhost:5000/api/v1"
axios.defaults.withCredentials = true



const theme = createTheme({typography:{fontFamily:"Roboto"}})


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Authprovider>
  <BrowserRouter>

    <ThemeProvider theme = {theme}>
    <Toaster position='top-right' />
    <App />
    </ThemeProvider>
    </BrowserRouter>
    </Authprovider>
  </StrictMode>,
)
