import { TextField } from '@mui/material';



type Props = {
    name:string;
    type:string;
    label:string;
}



function Custominput(props:Props) {
  return (
    <>
    <TextField sx={{input:{color:"white"},label:{color:"white"},width:"400px",margin:"1rem",'& label.Mui-focused': { color: 'white' }, '& .MuiOutlinedInput-root': {
        '& fieldset': { borderColor: 'white', borderWidth: '2px' }, // ✅ Default border color
          '&:hover fieldset': { borderColor: 'gray' }, // ✅ Border on hover
          '&.Mui-focused fieldset': { borderColor: 'white' }, // ✅ Border when focused
    }}} name={props.name} label ={props.label} type={props.type} />
    </>
  )
}

export default Custominput