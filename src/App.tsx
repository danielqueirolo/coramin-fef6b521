
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";

// Pages
import Welcome from "./pages/Welcome";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import MeditationFlow from "./pages/MeditationFlow";
import History from "./pages/History";
import Store from "./pages/Store";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Practice from "./pages/Practice";

const queryClient = new QueryClient();

const App = () => {
  const [hasSeenWelcome, setHasSeenWelcome] = useState<boolean>(() => {
    return localStorage.getItem("hasSeenWelcome") === "true";
  });

  const completeWelcome = () => {
    localStorage.setItem("hasSeenWelcome", "true");
    setHasSeenWelcome(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <TooltipProvider delayDuration={0}>
            <Toaster />
            <Sonner />
            <Routes>
              <Route 
                path="/" 
                element={hasSeenWelcome ? <Navigate to="/auth" /> : <Navigate to="/welcome" />} 
              />
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/meditation" element={<MeditationFlow />} />
              <Route path="/history" element={<History />} />
              <Route path="/store" element={<Store />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/practice" element={<Practice />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
