import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { useAuth } from "../../context/Authcontext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkCold } from "react-syntax-highlighter/dist/esm/styles/prism";

function extractcode(message: string) {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
}
function iscodeblock(str: string) {
  if (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("(") ||
    str.includes("#") ||
    str.includes("//")
  ) {
    return true;
  }
  return false;
}

function Chatitem({ content, role }: { content: string; role: string }) {
  const auth = useAuth();
  const msgblock = extractcode(content);
  return (
    <>
      {role === "assistant" ? (
        <Box
          sx={{ display: "flex", p: 2, bgcolor: "#004d5612", my: 2, gap: 2,}}
        >
          <Avatar sx={{ ml: 0 }}>
            <img src="openai.png" alt="openai" width={"30px"} />
          </Avatar>
          <Box  sx={{overflow:"hidden",textWrap:"wrap"}}>
            {!msgblock && <Typography fontSize={"20px"}>{content}</Typography>}
            {msgblock &&
              msgblock.length &&
              msgblock.map((block) =>
                iscodeblock(block) ? (
                  <SyntaxHighlighter
                    style={coldarkCold}
                    language="javascript"
                  >{block}</SyntaxHighlighter>
                ) : (
                  <>
                  <Typography fontSize={"20px"}>{block}</Typography>
                  </>
                )
              )}
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: "flex", p: 2, bgcolor: "#004d56", gap: 2 }}>
          <Avatar sx={{ ml: 0, bgcolor: "black", color: "white" }}>
            {auth.user?.name[0]}
          </Avatar>
          <Box>
            {!msgblock && <Typography fontSize={"20px"}>{content}</Typography>}
            {msgblock &&
              msgblock.length &&
              msgblock.map((block) =>
                iscodeblock(block) ? (
                  <SyntaxHighlighter
                    style={coldarkCold}
                    language="javascript"
                  >{block}</SyntaxHighlighter>
                ) : (
                  <>
                  <Typography fontSize={"20px"}>{block}</Typography>
                  </>
                )
              )}
          </Box>
          
        </Box>
      )}
    </>
  );
}

export default Chatitem;
