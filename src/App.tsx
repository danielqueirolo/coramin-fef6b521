
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Daily from "./pages/Daily";
import Practice from "./pages/Practice";
import Journal from "./pages/Journal";
import Library from "./pages/Library";
import NotFound from "./pages/NotFound";
import Auth from "./components/Auth";
import Notes from "./pages/Notes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/daily" element={<Daily />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/library" element={<Library />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
