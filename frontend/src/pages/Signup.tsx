import { Box, Button, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Custominput from '../component/shared/custominput'
import { useAuth } from '../context/Authcontext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function Signup() {
  const navigate = useNavigate()
  const auth = useAuth()
  const handlesubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    console.log(name,email,password);
    try {
      toast.loading("signing in",{id:"1"})
      const res = await auth?.signup(name,email,password)
      if (res) {
        toast.success("Signed up!", { id: "1" });
        navigate("/chat");
      } else {
        toast.error("Signup failed", { id: "1" });
      }
    } catch (error) {
      toast.error("signing in failed",{id:"1"})
      console.log(error);
    }
  }


    useEffect(() => {
      if (auth?.isLoggedin) {
        toast.success("Signed up!", { id: "1" });
        navigate("/chat");
      } else {
          toast.error("Signup failed", { id: "1" });
        }
    }, [auth?.isLoggedin, navigate]);
 




  


  return (
  <>
   <Box width={'100%'} height={'100%'} display={'flex'} flex={1}>
    <Box padding={8} mt={8} display={{md:'flex',sm:'none',xs:'none'}}>
      <img src='airobot.png' className='w-[400px]'/>
    </Box>
    <Box display={'flex'} flex={{xs:1,md:0.5}} justifyContent={'center'} alignItems={'center'} padding={2} ml={'auto'} mt={16}>

      <form onSubmit={handlesubmit} className='m-auto p-[30px] rounded-[10px] border-0'>
        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
          <Typography variant='h4' textAlign={'center'} padding={2} fontWeight={600}>Signup</Typography>
          <Custominput  type='text' name='name' label='name'/>
          <Custominput  type='email' name='email' label='email'/>
        <Custominput type='password' name='password' label='password'/>
        <Button type='submit' sx={{mt:2,width:"400px",borderRadius:2,bgcolor:"#00fffc",':hover':{
          bgcolor:"white",
          color:"black"
        }}}>SIGNUP</Button>
        </Box>
        </form>
    </Box>
   </Box>
  </>
  )
}

export default Signup