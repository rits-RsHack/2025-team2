'use client'
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import TimerDisplay from "./TimerDisplay";
import { Play, Pause, RotateCcw } from "lucide-react"
import { useStopwatch } from "react-timer-hook";

interface StopWatchProps {
  selectedDate: Date | null;
  selectedTime: string;
}

export default function StopWatch({ selectedDate, selectedTime }: StopWatchProps) {
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
    // 日付と時間が有効な値であることを確認
    if (selectedDate && selectedTime) {
      reset(); // タイマーをリセットして00:00:00にする
      pause(); // 念のためタイマーを停止状態にする
    }
  }, [selectedDate, selectedTime]); // 依存配列にpropsを指定

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
          <Button onClick={pause} className="hover:text-gray-500" >
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