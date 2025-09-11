'use client'
import React from "react";
import { Button } from "./ui/button";
import TimerDisplay from "./TimerDisplay";
import { Play, Pause, RotateCcw } from "lucide-react"
import { useStopwatch } from "react-timer-hook";


export default function StopWatch() {
  const {
    seconds,
    minutes,
    hours,
    // isRunningもフックから取得できる
    isRunning,
    start,
    pause,
    reset
  } = useStopwatch({ autoStart: false, interval: 20 });

  return (
    <div className="flex space-x-3 items-center">
      <div className="gap-y-5">
        <TimerDisplay
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          mode={isRunning ? "work" : "break"} // 必要に応じて動的に変更
        />
      </div>

      <div className="flex flex-col items-center space-y-2">
        {!isRunning ? (
          // start関数を直接渡す
          <Button onClick={start} className="hover:text-gray-500" variant="secondary" >
            <Play />Start
          </Button>
        ) : (
          // pause関数を直接渡す
          <Button onClick={pause} className="hover:text-gray-500" >
            <Pause />Stop
          </Button>
        )}
        {/* reset関数を直接渡す */}
        <Button onClick={() => {
          reset()
          stop()
        }} className="hover:text-gray-500" variant="secondary" >
          <RotateCcw />Reset
        </Button>
      </div>
    </div>
  );
}
