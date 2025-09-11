import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Circle, Menu, User } from "lucide-react";
import React from "react";

// ナビゲーションアイテムの定義
type NavigationItem = {
  icon: React.ElementType;
  label: string;
  active: boolean;
};

const navigationItems: NavigationItem[] = [
  {
    icon: Menu,
    label: "TimeLine",
    active: false,
  },
  {
    icon: Circle,
    label: "Record",
    active: false,
  },
  {
    icon: User,
    label: "Profile",
    active: true,
  },
];

export default function Profile() {
  return (
    // 全体を画面いっぱいに広げ、相対位置の基準とする
    <div className="relative flex flex-col items-center min-h-screen bg-[#dddddd] text-black">

      {/* メインのコンテンツ（カード）を中央に配置 */}
      <main className="flex flex-col items-center justify-center p-4 mt-20 mb-20 flex-grow">
        <Card className="flex flex-col items-center p-6 gap-6 rounded-3xl w-full max-w-md bg-white">
          <CardContent className="flex flex-col md:flex-row items-center justify-center gap-6 p-0 w-full">
            <Avatar className="w-40 h-40 border border-black">
              <AvatarFallback className="bg-gray-200 text-6xl">UN</AvatarFallback>
            </Avatar>

            <div className="flex flex-col items-center md:items-start justify-center">
              <h1 className="text-4xl font-bold text-center">UserName</h1>
              <div className="flex gap-2 mt-4">
                <Progress value={50} className="w-32 h-4 bg-gray-300" />
                <Progress value={20} className="w-32 h-4 bg-gray-300" />
              </div>
            </div>
          </CardContent>

          <Card className="flex flex-col items-center p-6 rounded-xl w-full bg-gray-100">
            <CardContent className="flex flex-col items-center p-0">
              <div className="text-xl font-light">Report</div>
              <div className="text-6xl font-semibold my-2">00:01:23</div>
              <div className="text-2xl font-semibold">d/h/m</div>
            </CardContent>
          </Card>
        </Card>
      </main>

    </div>
  );
}
