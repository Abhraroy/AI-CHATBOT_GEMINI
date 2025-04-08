import { Route, Routes } from "react-router-dom"
import Header from "./component/Header/Header"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Chat from "./pages/Chat"
import NotFound from "./pages/NotFound"
import { useAuth } from "./context/Authcontext"


function App() {
  const auth = useAuth()



  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {auth?.isLoggedin && auth.user && (<Route path="/chat" element={<Chat />}/>)}
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  )
}

export default App