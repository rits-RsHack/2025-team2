

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Circle, Menu, User } from "lucide-react";
import React from "react";
import Link from "next/link";

// ナビゲーションアイテムの定義
type NavigationItem = {
  icon: React.ElementType;
  label: string;
  active: boolean;
  url: string;
};

const navigationItems: NavigationItem[] = [
  {
    icon: Menu,
    label: "TimeLine",
    active: false,
    url: "/timeline",
  },
  {
    icon: Circle,
    label: "Record",
    active: true,
    url: "/menu",
  },
  {
    icon: User,
    label: "Profile",
    active: true,
    url: "/profile",
  },
];

export default function Navigation() {
  return (
    <div>
        {/* ナビゲーションバーを画面下部に固定 */}
        <nav className="fixed bottom-0 flex items-center justify-center gap-6 p-4 rounded-t-xl shadow-md bg-white z-10 left-1/2 -translate-x-1/2">
          {navigationItems.map((item, index) => (
            <React.Fragment key={index}>
              <Link href={item.url}>
              <Button
                variant="ghost"
                className={`flex items-center gap-2 p-2 ${item.active ? 'bg-gray-200' : ''}`}
              >
                <item.icon className={`w-5 h-5 ${item.active ? 'text-blue-600' : 'text-black'}`} />
                <span
                  className={`text-xl font-normal ${item.active ? 'text-blue-600 font-semibold' : 'text-black'}`}
                >
                  {item.label}
                </span>
              </Button>
              </Link>
              {index < navigationItems.length - 1 && (
                <Separator orientation="vertical" className="h-8 w-px bg-gray-400" />
              )}
            </React.Fragment>
          ))}
        </nav>
    </div>
  )
}