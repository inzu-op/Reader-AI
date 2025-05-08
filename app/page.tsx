import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <div className="h-10 w-full flex justify-between items-center">
        <h1 className="ml-10">Hello</h1>
       <Button className="mr-10">Signup</Button>
      </div>
      <div className="h-[90vh] w-full flex justify-center items-center"> <h1 className="text-2xl font-medium">Home</h1></div>
    </div>
  );
}
