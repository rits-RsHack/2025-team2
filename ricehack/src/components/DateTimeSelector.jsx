'use client';

import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "./ui/label";

export default function DateTimeSelector({ onDateChange, onTimeChange }) {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
    onDateChange(selectedDate); // 親コンポーネントの状態を更新
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
    onTimeChange(e.target.value); // 親コンポーネントの状態を更新
  };

  return (
    <div className="flex space-x-4 items-end">
      {/* Date Picker */}
      <div className="flex flex-col space-y-2">
        <Label>Date of birth</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[180px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Select a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Time Input */}
      <div className="flex flex-col space-y-2">
        <Label>Time</Label>
        <Input
          type="time"
          step="1"
          value={time}
          onChange={handleTimeChange}
          className="w-[120px]"
        />
      </div>
    </div>
  );
}