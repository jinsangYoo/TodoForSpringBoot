import { Typography, Box } from '@mui/material'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Login from './Login'

const Copyright = () => {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright @ '}
      fsoftwareengineer, {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

function AppRouter() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='login' element={<Login />} />
        </Routes>
        <Box mt={5}>
          <Copyright />
        </Box>
      </BrowserRouter>
    </div>
  )
}

export default AppRouter
