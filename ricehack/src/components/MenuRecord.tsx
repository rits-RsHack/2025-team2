'use client';
import { Card, CardHeader, CardTitle } from "./ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { X } from "lucide-react"
import StopWatch from "./Stopwatch";
import { useState } from "react";
import DateTimeSelector from "./DateTimeSelector";
import { set } from "date-fns";
export default function MenuApp() {


  const [selectedDate, setSelectedDate ] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState("");
  const [stopwatchvalue , setStopwatchvalue] = useState<string>("00:00:00");
   // タイトルとコンテンツの値を管理する状態を追加
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const handleStopwatchValueChange = (value: string) => {
    setSelectedTime(value);
    setStopwatchvalue(value);

  }

  const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();

  const formData = new FormData();
  formData.append('title', title); // title の値
  formData.append('content', content); // content の値
  if ( selectedDate !== undefined ) {
  formData.append('date', selectedDate.toISOString()); // Date オブジェクトは文字列に変換
  } 
  formData.append('time', stopwatchvalue); // time の値
  
  // ここで、動画ファイルを FormData に追加する
  // ファイル入力欄の参照（ref）が必要になる
  const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
  if (fileInput && fileInput.files && fileInput.files[0]) {
    formData.append('timelapse', fileInput.files[0]);
  }
  
  // 次のステップで、この formData を Flask に送る
  try {
  const response = await fetch('http://localhost:5000/api/posts', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    console.log('データが正常に送信されました！');
    // フォームをリセットするなどの処理
  } else {
    console.error('データの送信に失敗しました。');
  }
} catch (error) {
  console.error('ネットワークエラー:', error);
}
};

  return (
    <div className="flex 
      flex-col top-0 left-0 right-0 min-h-screen 
      bg-gray-200 font-sans">
      
      <Card className="mt-16 
        w-full max-w-screen-lg mx-auto bg-white rounded-b-xl shadow-b-xl shadow-lg p-6
        ">
          <form onSubmit={handleSubmit}>
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
              <Input className=" flex-grow" onChange={(e) => setTitle(e.target.value)} placeholder="write your theme or learning language!" />
            </div>

          </div>
          <div className="flex flex-col space-y-2">
            <Label>Content</Label>
            <div className="flex items-center gap-x-4">
              <Textarea className=" flex-grow h-30" onChange={(e) => setContent(e.target.value)} placeholder="what did you learn?" />
            </div>

          </div>
          <div className="flex flex-col space-y-2">
            <Label>TimeLapse</Label>
            <div className="flex items-center gap-x-4">
              <Input type="file" className=" flex-grow " placeholder="what did you learn?" />
              <Button>Clear</Button>

            </div>

          </div>

          <div className="flex flex-col  space-y-2">
            <Label>Time</Label>
            <div className="flex items-center gap-x-4">
              <DateTimeSelector
                onDateChange={setSelectedDate}
                onTimeChange={setSelectedTime}
                timeValue={stopwatchvalue}
              />
              <StopWatch selectedDate={selectedDate} selectedTime={selectedTime} onStop={handleStopwatchValueChange} />
            </div>
          </div>

          <Button type="submit" className="mt-4 bg-blue-500 text-white hover:bg-blue-600">
            Submit
          </Button>

        </Card>
        </form>
      </Card>
    </div>
  )
}

