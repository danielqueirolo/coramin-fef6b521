
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import { useToast } from "@/components/ui/use-toast";
import { HeartHandshake, BookOpen, Clock } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Daily scripture quote
  const dailyQuote = "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.";

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  const handleStartMeditation = () => {
    navigate("/meditation");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-white">
      <div className="h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl md:text-3xl font-medium text-slate-900 mb-6 leading-relaxed">
            "{dailyQuote}"
          </h1>
          
          <div className="flex justify-center mb-12">
            <div className="flex gap-2 text-slate-500 text-sm">
              <Clock size={16} className="mt-0.5" />
              <span>Philippians 4:6</span>
            </div>
          </div>
          
          <Button 
            onClick={handleStartMeditation}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-full text-lg font-medium"
          >
            Start Your Meditation
          </Button>
        </div>
      </div>

      <div className="bg-slate-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-semibold text-slate-900 mb-6 text-center">Why Lectio Divina?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <HeartHandshake className="text-blue-600 h-6 w-6" />
              </div>
              <h3 className="font-medium text-slate-900 mb-2">Reduce Anxiety</h3>
              <p className="text-slate-600">Calm your mind and find peace through guided Christian meditation practices.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="text-blue-600 h-6 w-6" />
              </div>
              <h3 className="font-medium text-slate-900 mb-2">Deepen Faith</h3>
              <p className="text-slate-600">Connect more intimately with Scripture and strengthen your relationship with God.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Clock className="text-blue-600 h-6 w-6" />
              </div>
              <h3 className="font-medium text-slate-900 mb-2">Daily Practice</h3>
              <p className="text-slate-600">Build a consistent spiritual routine that fits into your busy life with just minutes a day.</p>
            </div>
          </div>
        </div>
      </div>

      <Header />
    </div>
  );
};

export default Dashboard;
