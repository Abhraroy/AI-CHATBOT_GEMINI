import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { useRef, useState,useEffect} from "react";
import { useAuth } from "../context/Authcontext";
import { red } from "@mui/material/colors";
import Chatitem from "../component/chat/Chatitem";
import { IoMdSend } from "react-icons/io";
import { deleteChatHistory, getChatHistory, sendChatreq } from "../helpers/apicall";
import { useNavigate } from "react-router-dom";
type Message = {
  role: string;
  content: string;
};

function Chat() {
  const inputref = useRef<HTMLInputElement>(null);
  const auth = useAuth();
  // useEffect(() => {
  //   // prevent running on first render if user is undefined
  //   if (auth.user === null) {
  //     navigate("/login");
  //   }
  // }, [auth.user]);
  


  const [chatMessages, setchatMessages] = useState<Message[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const navigate = useNavigate()


  useEffect(() => {
    const fetchChats = async () => {
      try {
        const data = await getChatHistory();
        setchatMessages([...data.chats]);
      } catch (err) {
        console.error("Failed to load chat history", err);
      }
    };
  
    fetchChats();
  }, [refreshTrigger]);
  


//@ts-ignore
useEffect(() => {
  console.log(auth.loading,"loading");
  
  if(!auth.user && !auth.loading){
    return navigate("/login")
  }
}, [auth.user,auth.loading])








  
  const handleSubmit = async () => {
    const content = inputref.current?.value as string;
    if (inputref && inputref.current) {
      inputref.current.value = "";
    }
    const newmsg: Message = { role: "user", content };
    setchatMessages((prev) => [...prev, newmsg]);

    const chatdata = (await sendChatreq(content)) || "Thinking";
    setchatMessages([...chatdata.chats]);
  };
  //@ts-ignore
  const handlekey = (e)=>{
    if(e.key=="Enter"){
      handleSubmit()
    }
  }


  const handleDelete = async () => {
    try {
      await deleteChatHistory();
      setchatMessages([]); // Clear UI
      setRefreshTrigger((prev) => !prev); // Force re-fetch
    } catch (err) {
      console.log(err);
    }
  };


  // const chatMessages = [
  //   { role: "user", content: "Hello! Can you help me understand React?" },
  //   {
  //     role: "assistant",
  //     content:
  //       "Of course! React is a JavaScript library for building user interfaces.",
  //   },
  //   { role: "user", content: "That sounds interesting! How does it work?" },
  //   {
  //     role: "assistant",
  //     content:
  //       "React works by creating a virtual DOM, which helps efficiently update the UI when data changes.",
  //   },
  //   { role: "user", content: "What are components in React?" },
  //   {
  //     role: "assistant",
  //     content:
  //       "Components are reusable UI elements in React. They can be functional or class-based.",
  //   },
  //   {
  //     role: "user",
  //     content: "Can you show me an example of a functional component?",
  //   },
  //   {
  //     role: "assistant",
  //     content:
  //       "Sure! Here’s a simple example:\n```tsx\nfunction Greeting() {\n  return <h1>Hello, world!</h1>;\n}\n```",
  //   },
  //   { role: "user", content: "Got it! What about state management?" },
  //   {
  //     role: "assistant",
  //     content:
  //       "State in React allows components to manage dynamic data. You can use the `useState` hook for this.",
  //   },
  //   { role: "user", content: "Thanks! This is really helpful." },
  //   {
  //     role: "assistant",
  //     content: "You're welcome! Let me know if you have any more questions.",
  //   },
  // ];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          width: "100%",
          height: "100%",
          mt: 3,
          gap: 3,
        }}
      >
        <Box
          sx={{
            display: { md: "flex", xs: "none", sm: "none" },
            flex: 0.2,
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              height: "60vh",
              bgcolor: "rgb(17,29,39)",
              flexDirection: "column",
              mx: 3,
            }}
          >
            <Avatar
              sx={{ mx: "auto", my: 2, bgcolor: "white", color: "black" }}
            >
              {auth?.user?.name[0]}
            </Avatar>
            <Typography
              sx={{
                mx: "auto",
                fontFamily: "work sans",
              }}
            >
              You are talikng to a chat bot
            </Typography>
            <Typography
              sx={{
                mx: "auto",
                fontFamily: "work sans",
                my: 4,
                p: 3,
              }}
            >
              You can ask some question related to Knowledge Business Advices
              Education etc.But avoid sharing personal information
            </Typography>
            <Button
              sx={{
                width: "200px",
                my: "auto",
                color: "White",
                fontWeight: "700",
                mx: "auto",
                bgcolor: red[300],
                ":hover": {
                  bgcolor: red[800],
                },
              }}
              onClick={handleDelete}
            >
              CLear Conversation
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flex: { md: 0.8, xs: 1, sm: 1 },
            flexDirection: "column",
            px: 3,
            // bgcolor:"yellow",
            overflow:"hidden"
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "40px",
              color: "white",
              mb: 2,
              mx: "auto",
            }}
          >
            MODEL-GPT 3.5 TURBO
          </Typography>
          <Box
            sx={{
              width: "100%",
              height: "60vh",
              borderRadius: 3,
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              overflow: "scroll",
              overflowX: "hidden",
              overflowY: "auto",
              scrollBehavior: "smooth",
              // bgcolor:"red"
            }}
          >
            {chatMessages.map((item, index) => (
              <Chatitem key={index} role={item.role} content={item.content} />
            ))}
          </Box>
          <div
            style={{
              width: "100%",
              padding: "20px",
              borderRadius: 8,
              display: "flex",
              margin: "auto",
              backgroundColor: "rgb(17,27,39)",
            }}
          >
            <input
            onKeyDown={handlekey}
              type="text"
              style={{
                width: "100%",
                backgroundColor: "transparent",
                padding: "10px",
                border: "none",
                outline: "none",
                color: "white",
                fontSize: "20px",
              }}
              ref={inputref}
            />
            <IconButton
              onClick={handleSubmit}
              sx={{ ml: "auto", color: "white" }}
            >
              <IoMdSend />
            </IconButton>
          </div>
        </Box>
      </Box>
    </>
  );
}

export default Chat;
