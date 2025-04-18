
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import { Calendar, Clock } from "lucide-react";

const History = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Mock meditation history data - this would come from a database
  const meditationHistory = [
    {
      id: 1,
      date: "Apr 18, 2023",
      scripture: "Matthew 11:28-30",
      duration: "10 minutes",
      notes: "Found peace in knowing God's burden is light."
    },
    {
      id: 2,
      date: "Apr 17, 2023",
      scripture: "Psalm 23",
      duration: "15 minutes",
      notes: "Reflected on God as my shepherd."
    },
    {
      id: 3,
      date: "Apr 15, 2023",
      scripture: "John 14:27",
      duration: "8 minutes",
      notes: ""
    },
    {
      id: 4,
      date: "Apr 13, 2023",
      scripture: "Philippians 4:6-7",
      duration: "12 minutes",
      notes: "Practiced giving my anxiety to God."
    }
  ];

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <div className="bg-blue-600 text-white p-6">
        <h1 className="text-2xl font-semibold">Meditation History</h1>
        <p className="opacity-90">Your spiritual journey</p>
      </div>

      <div className="p-6 space-y-4">
        {meditationHistory.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500">No meditation history yet. Start your first meditation!</p>
          </div>
        ) : (
          meditationHistory.map((session) => (
            <Card key={session.id} className="border-none shadow-md">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center text-slate-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{session.date}</span>
                  </div>
                  <div className="flex items-center text-slate-600">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{session.duration}</span>
                  </div>
                </div>
                
                <h3 className="font-medium text-slate-900 mb-2">
                  Scripture: {session.scripture}
                </h3>
                
                {session.notes && (
                  <div className="mt-2 pt-2 border-t border-slate-100">
                    <p className="text-sm text-slate-600">
                      {session.notes}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Header />
    </div>
  );
};

export default History;
