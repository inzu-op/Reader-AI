"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";
import { ModeToggle } from "./modetoggle";

const Navbar = () => {
  return (
    <div className="flex justify-center">
      <Menubar className="p-6 w-[550px]  rounded-full shadow-sm bg-[hsl(212.7,26.8%,83.9%)] dark:bg-background border">
        <div className="flex justify-between items-center w-full">
          <div className="flex space-x-1">
            <MenubarMenu>
              <MenubarTrigger asChild>
                <Link
                  href="/"
                  className="font-medium px-4 py-2 hover:bg-[hsl(212.7,26.8%,73.9%)] dark:hover:bg-accent rounded-full cursor-pointer transition-colors"
                >
                  Home
                </Link>
              </MenubarTrigger>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger asChild>
                <Link
                  href="/about"
                  className="font-medium px-4 py-2 hover:bg-[hsl(212.7,26.8%,73.9%)] dark:hover:bg-accent rounded-full cursor-pointer transition-colors"
                >
                  About
                </Link>
              </MenubarTrigger>
            </MenubarMenu>

            <MenubarMenu >
              <MenubarTrigger asChild>
                <Link
                  href=""
                  className="font-medium px-4 py-2 hover:bg-[hsl(212.7,26.8%,73.9%)] dark:hover:bg-accent rounded-full cursor-pointer transition-colors"
                >
                  Profile
                </Link>
              </MenubarTrigger>
              <MenubarContent
                className="bg-[hsl(212.7,26.8%,83.9%)] dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
                align="end"
              >
                <MenubarItem className="hover:bg-[hsl(212.7,26.8%,73.9%)] dark:hover:bg-gray-800 cursor-pointer">
                  Settings
                </MenubarItem>
                <MenubarItem className="hover:bg-[hsl(212.7,26.8%,73.9%)] dark:hover:bg-gray-800 cursor-pointer">
                  Logout
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </div>
          <ModeToggle />
        </div>
      </Menubar>
    </div>
  );
};

export default Navbar;
