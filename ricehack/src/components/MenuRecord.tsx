'use client';
import { Card, CardHeader, CardTitle } from "./ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { X } from "lucide-react"
import StopWatch from "./Stopwatch";
export default function MenuApp() {
  return (
    <div className="flex 
      flex-col top-0 left-0 right-0 min-h-screen 
      bg-gray-200 font-sans">
      <header className="flex fixed items-center justify-between top-0 left-0 right-0 z-10 bg-black text-white p-4  ">
        <h1 className="
        text-4xl font-bold tracking-tight
        ">
          Rice_Hack
        </h1>
        <div className="
        w-12 h-12 bg-gray-300 rounded-full border-4 border-white
        "/>
      </header>
      <Card className="mt-16 
        w-full max-w-screen-lg mx-auto bg-white rounded-b-xl shadow-b-xl shadow-lg p-6
        ">
        <Card className="h-[1000px] p-6">
          <CardHeader className="flex justify-center relative">
            <div className="relative">
              <CardTitle className="text-xl font-bold text-center">PostMode</CardTitle>
            </div>
            <Button variant="ghost" className="absolute top-1/2 right-6 -translate-y-1/2">
              <span className="text-gray-500 mr-1 text-sm font-medium">Cancel</span>
              <X size={16} className="text-gray-500" />
            </Button>
          </CardHeader>
          <div className="flex flex-col space-y-2">
            <Label>Title</Label>
            <div className="flex items-center gap-x-4">
              <Input className=" flex-grow" placeholder="write your theme or learning language!" />
            </div>

          </div>
          <div className="flex flex-col space-y-2">
            <Label>Content</Label>
            <div className="flex items-center gap-x-4">
              <Textarea className=" flex-grow h-30" placeholder="what did you learn?" />
            </div>

          </div>
          <div className="flex flex-col space-y-2">
            <Label>TimeLapse</Label>
            <div className="flex items-center gap-x-4">
              <Input type="file" className=" flex-grow " placeholder="what did you learn?" />
              <Button>Clear</Button>

            </div>

          </div>

          <div className="flex flex-col space-y-2">
            <Label>Time</Label>
            <div className="flex items-center gap-x-4">
              <StopWatch />
            </div>
          </div>

        </Card>
      </Card>


      <nav className="flex items-center justify-center p-4 w-full max-w-lg mx-auto bg-white rounded-x-4 ">
        hello
      </nav>
    </div>
  )
}

