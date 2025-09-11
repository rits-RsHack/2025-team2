'use client'
import { useState } from "react";

interface MyInterface {
  message: string;
  service: string;
  status: string;
}



export default function MainApp() {
  const [health, setHealth] = useState<MyInterface>();

  fetch(`${process.env.NEXT_PUBLIC_API_URL}/health`).then((response) => response.json()).then((data: MyInterface) => setHealth(data));


  return (
    <h1>{health?.message}</h1>
  )
}
