// app/page.tsx
'use client'
import { Button } from '@nextui-org/button';
import { useEffect, useState } from 'react';
import { io, Socket } from "socket.io-client"

export default function Page() {

  const [socket, setSocket] = useState<Socket>()

  useEffect(() => {
    const socketIo = io("ws://localhost:8000", {
      transports: ["websocket"]
    })
    setSocket(socketIo)

    return () => {
      socketIo.disconnect();
    };
  }, [])

  const send = () => {
    socket?.emit("hello", "world")
  }

  return (
    <div>
      <Button onClick={send}>Click me</Button>
    </div>
  )
}