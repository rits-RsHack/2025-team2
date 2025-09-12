'use client'
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import TimerDisplay from "./TimerDisplay";
import { Play, Pause, RotateCcw } from "lucide-react"
import { useStopwatch } from "react-timer-hook";

interface StopWatchProps {
  selectedDate: Date | undefined;
  selectedTime: string;
  onStop: (time: string) => void;
}

export default function StopWatch({ selectedDate, selectedTime, onStop }: StopWatchProps) {
  const {
    seconds,
    minutes,
    hours,
    isRunning,
    start,
    pause,
    reset
  } = useStopwatch({ autoStart: false, interval: 20 });

  // フォームで選択された日付と時間が変更されたら、タイマーをリセットする
  useEffect(() => {
    // isRunningがfalseになった（＝停止した）瞬間を検知
    if (!isRunning) {
      // 現在の時間をHH:MM:SS形式に変換
      const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      
      // 親から渡されたonStop関数を呼び出し、現在の時間を渡す
      onStop(formattedTime);
    }
  }, [isRunning, hours, minutes, seconds, onStop]);

  return (
    <div className="flex space-x-3 items-center">
      <div className="gap-y-5">
        <TimerDisplay
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          mode={isRunning ? "work" : "break"}
        />
      </div>

      <div className="flex flex-col items-center space-y-2">
        {!isRunning ? (
          <Button onClick={start} className="hover:text-gray-500" variant="secondary" >
            <Play />Start
          </Button>
        ) : (
          <Button onClick={() => {
            
            pause()}} className="hover:text-gray-500" >
            <Pause />Stop
          </Button>
        )}
        <Button onClick={() => reset()} className="hover:text-gray-500" variant="secondary" >
          <RotateCcw />Reset
        </Button>
      </div>
    </div>
  );
}