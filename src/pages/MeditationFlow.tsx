
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LectioSteps from "@/components/LectioSteps";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";

const MeditationFlow = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isFirstTime] = useState(() => {
    const hasCompletedFirstSession = localStorage.getItem("hasCompletedFirstSession");
    return !hasCompletedFirstSession;
  });

  const handleComplete = () => {
    localStorage.setItem("hasCompletedFirstSession", "true");
    navigate("/dashboard");
  };

  if (!user) {
    navigate("/auth");
    return null;
  }

  return (
    <div className="min-h-screen bg-white pb-16">
      <div className="py-6">
        <LectioSteps isFirstTime={isFirstTime} onComplete={handleComplete} />
      </div>
      <Header />
    </div>
  );
};

export default MeditationFlow;
