import axios from "axios"

export const loginuser = async(email:string,password:string)=>{
    const res = await axios.post("/user/login",{
        email,password
    })
    console.log(res);
    
    if(res.status!=200){
        throw new Error("Unable to login")
    }
    const data = await res.data 
    return data
}

export const signupuser = async(name:string,email:string,password:string)=>{
    const res = await axios.post("/user/signup",{
        name,email,password
    })
    console.log(res);
    
    if(res.status!=201){
        throw new Error("Unable to signup")
    }
    const data = res.data 
    return data
}

export const checkauthstatus = async()=>{
    const res = await axios.get("/user/auth-status")
    console.log(res);
    
    if(res.status!=200){
        throw new Error("Unable to authintecate")
    }
    const data = await res.data 
    return data
}


export const sendChatreq = async(message:string)=>{
    console.log(message); 
    const res = await axios.post("/chat/new",{
        message
    })
    console.log(res,"sending from apicall");
    
    if(res.status!=200){
        throw new Error("Unable to send chat")
    }
    const data = res.data 
    return data
}


export const getChatHistory = async () => {
    const res = await axios.get("/chat/history")
    console.log(res);
    
    return await res.data;
  };
  


  export const deleteChatHistory = async () => {
    const response = await axios.delete("/chat/delete")
    return response.data
  };
  

  export const userLogout = async () => {
    try {
      const res = await axios.get("/user/logout", {
        withCredentials: true, // 👈 Important: ensures cookies are sent
      });
      return res.data;
    } catch (err) {
      console.error("Logout failed", err);
      throw err;
    }
  };