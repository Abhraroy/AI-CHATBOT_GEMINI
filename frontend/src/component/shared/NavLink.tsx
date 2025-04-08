import { Link } from "react-router-dom";




type Props ={
    to:string;
    bg:string;
    text:string;
    textColor:string;
    onClick?:()=>Promise<void>
}





function NavLink(props:Props) {
  return (
    <>
    <Link onClick={props.onClick} className="font-semibold uppercase mr-2.5 ml-2.5 pt-2 pb-2 pr-5 pl-5
    rounded-[10px] decoration-0
    " to = {props.to} style={{ backgroundColor: props.bg, color: props.textColor }}>{props.text}</Link>
    </>
  )
}

export default NavLink