import React from 'react'
import "./Logo.css"
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'
function Logo() {
  return (
    <>
    <div className="flex items-center mr-auto gap-2">
        <Link to={"/"} >
        <img src='openai.png' alt="openai" className='w-[30px] h-[30px] invert' />
        </Link>
        <Typography sx={{display:{md:"block" , sm:"none" , xs:"none"},mr:"auto",fontWeight:"800"}}>
        <span className='text-[20px]'>MERN</span>-GPT
        </Typography>
    </div>
    </>
  )
}

export default Logo