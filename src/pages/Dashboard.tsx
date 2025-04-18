
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import { HeartHandshake } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Daily quote (in a real app, this would rotate)
  const dailyQuote = "Não andem ansiosos por coisa alguma, mas em tudo, pela oração e súplicas, e com ação de graças, apresentem seus pedidos a Deus.";

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
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-2xl md:text-3xl font-medium text-divine-800 mb-10 leading-relaxed">
          "{dailyQuote}"
        </h1>
        
        <Button 
          onClick={handleStartMeditation}
          className="bg-divine-600 hover:bg-divine-700 text-white px-8 py-6 rounded-full text-lg font-medium flex items-center space-x-2"
        >
          <HeartHandshake className="h-5 w-5 mr-2" />
          <span>Já meditou na Palavra hoje?</span>
        </Button>
      </div>

      <Header />
    </div>
  );
};

export default Dashboard;
