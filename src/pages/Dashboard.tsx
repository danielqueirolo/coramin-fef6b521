
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import { Play, BookOpen, Clock, Sparkles } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const today = new Date();

  const meditationStreakDays = 3; // This would come from user data
  const lastMeditationDate = "Today"; // This would come from user data

  if (!user) {
    navigate("/auth");
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <div className="bg-blue-600 text-white p-6">
        <h1 className="text-2xl font-semibold mb-2">Welcome back</h1>
        <p className="opacity-90">{user.email}</p>
      </div>

      <div className="p-6 space-y-6">
        <Card className="overflow-hidden border-none shadow-md">
          <CardContent className="p-0">
            <div className="bg-blue-100 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-blue-800">Today's Meditation</h2>
                <p className="text-blue-700 mt-1">15 minutes of peace</p>
              </div>
              <Button 
                onClick={() => navigate("/meditation")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Play className="mr-2 h-4 w-4" />
                Start
              </Button>
            </div>
            <div className="p-4 bg-white">
              <h3 className="font-medium text-slate-900 mb-2">Daily Scripture</h3>
              <p className="text-slate-600 italic">
                "Be still, and know that I am God. I will be exalted among the nations,
                I will be exalted in the earth!" - Psalm 46:10
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-purple-100 rounded-full mb-3">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-medium text-slate-900">Streak</h3>
                <p className="text-3xl font-bold text-purple-600">{meditationStreakDays} days</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-green-100 rounded-full mb-3">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-medium text-slate-900">Last meditation</h3>
                <p className="text-xl font-medium text-green-600">{lastMeditationDate}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Meditation Calendar</h2>
          <Card className="border-none shadow-md">
            <CardContent className="p-4">
              <Calendar 
                mode="single"
                selected={today}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <Header />
    </div>
  );
};

export default Dashboard;
