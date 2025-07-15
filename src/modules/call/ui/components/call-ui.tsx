


import { StreamTheme, useCall } from "@stream-io/video-react-sdk";
import { useState } from "react";
import { CallLobby } from "./call-lobby";
import { CallActive } from "./call-active";
import { CallEnded } from "./call-ended";

interface Props {
    meetingName: string;
};

export const CallUI = ({meetingName} : Props) => {
const call = useCall();
const [show,setShow] =useState<"lobby" | "call" | "ended">("lobby");

const handelJoin = async () => {
    if(!call) return;

    await call.join();

    setShow("call");
};

const handelLeave = () => {
if(!call) return;

call.endCall();
setShow("ended");
};

return(
    <StreamTheme>
        {show === "lobby" && <CallLobby onJoin={handelJoin} />}
        {show === "call" && <CallActive onLeave={handelLeave} meetingName={meetingName} />}
        {show === "ended" && <CallEnded />} 
    </StreamTheme>
    
)
}