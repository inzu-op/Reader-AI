"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Slider from "./slider";
import Structure from "./structure";

interface UserData {
  id?: string;
  email?: string;
  username?: string;
  name?: string;
  [key: string]: any;
}

export default function Dashboard() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isActive, setIsActive] = useState(true); // 🔄 lifted state

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/user/verify");
        if (response.data.success) {
          setUserData(response.data.user);
        } else {
          router.push("/login");
        }
      } catch (error) {
        setError("Authentication failed. Please log in again.");
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Loading...</h2>
          <p>Please wait while we verify your credentials</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center text-red-600">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Slider isActive={isActive} setIsActive={setIsActive} />
      <Structure isActive={isActive} setIsActive={setIsActive} />
    </div>
  );
}
