import { AppBar, Toolbar } from '@mui/material'
import Logo from '../shared/Logo'
import { useAuth } from '../../context/Authcontext'
import NavLink from '../shared/NavLink'

function Header() {
  const auth = useAuth()



  return (
    <>
    <AppBar sx={{bgcolor:"transparent",position:"static",boxShadow:"none"}}>
        <Toolbar sx={{display:"flex"}}>
            <Logo />
            <div>
              {
                auth?.isLoggedin?
                <><NavLink bg="#00fffc" to="/chat" text="Go to Chat" textColor='white'/>
                <NavLink bg="#51538f" to="/" text="logout" textColor='white'
                onClick={auth.logout}
                />
                </>:
                <><NavLink bg="#00fffc" to="/login" text="login" textColor='white'/>
                <NavLink bg="#51538f" to="/signup" text="signup" textColor='white'
                />
                </>
              }
            </div>
        </Toolbar>
    </AppBar>
    </>
  )
}

export default Header