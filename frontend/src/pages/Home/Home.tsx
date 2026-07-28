import { useEffect, useState } from "react";
import api from "@/api/axios";

function Home() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    async function fetchHealth() {
      try {
        const response = await api.get("/");
        setMessage(response.data.message);
      } catch {
        setMessage("Backend not reachable");
      }
    }

    fetchHealth();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-4xl font-bold">{message}</h1>
    </div>
  );
}

export default Home;