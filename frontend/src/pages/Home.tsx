import { Box } from '@mui/material'
import React from 'react'
import Typing from '../component/Typer-animation/Typing'

function Home() {
  return (
    <>
    <Box sx={{width:"100%", height:"100%"}}>
    <Box sx={{width:"100%", display:"flex", mx:"auto",alignItems:"center",justifyContent:"center"}}>
      <Typing />
      </Box>
    </Box>
    </>
  )
}

export default Home