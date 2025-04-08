import { createContext,ReactNode, useContext, useEffect, useState} from "react";
import { checkauthstatus, loginuser, signupuser, userLogout } from "../helpers/apicall";


type user = {
    name:string,
    email:string
}



type userAuth = {
    isLoggedin:boolean,
    user:user | null
    login:(email:string,password:string)=>Promise<void>,
    signup:(name:string,email:string,password:string)=>Promise<void>,
    logout:()=>Promise<void>,
    loading:boolean
}




const Authcontext = createContext<userAuth | null>(null)
export const Authprovider = ({children}:{children:ReactNode})=>{
  const [ user,setUser] = useState<user | null>(null)
    const [isLoggedin,setloggedin] = useState(false)
const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function checkstatus() {
            try{
            const data = await checkauthstatus()
            if(data){
                setUser({email:data.email,name:data.name})
                setloggedin(true)
                return true
                
            }
            console.log(isLoggedin,"isloggedin");
            
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false)
        }
        }
        checkstatus()
       
    },[])

      

    const login = async(email:string,password:string)=>{
        const data = await loginuser(email,password)
        if(data){
            setUser({email:data.email,name:data.name})
            setloggedin(true)
        }
    }
    const signup = async (name: string, email: string, password: string) => {
        try {
          const data = await signupuser(name, email, password);
          console.log("Signup response:", data);
      
          if (data) {
            setUser({ email: data.email, name: data.name });
            setloggedin(true);
          }else{
            console.log("No data");
            
          }
        } catch (error) {
          console.error("Signup failed:", error);
        }
      };
      
    const logout = async () => {
        try {
          const res = await userLogout(); // 👈 this might be failing
          console.log(res); // log backend response
          setUser(null);
          setloggedin(false);
          console.log("user logged out");
          window.location.reload();
        } catch (err) {
          console.error("Logout failed", err);
        }
      };
      

    const value = {
        user,
        isLoggedin,
        login,
        signup,
        logout
    }


//@ts-ignore
   return <Authcontext.Provider value={{ user, isLoggedin, login, signup, logout, loading }}>
  {children}
</Authcontext.Provider>

    // return <Authcontext.Provider value={{value,loading}}>{children}</Authcontext.Provider>
}


export const useAuth = () => {
    const context = useContext(Authcontext);
    
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    
    return context;
};