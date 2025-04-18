
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import { Eye, Trash2, Calendar } from "lucide-react";
import { toast } from "sonner";

// This would come from your database in a real app
const mockMeditations = [
  {
    id: 1,
    date: "2025-04-15",
    scripture: "Philippians 4:6-7",
    prayer: "Lord, help me to let go of my anxiety and trust in Your peace that surpasses all understanding.",
    reflection: "I need to practice gratitude more consistently, even when I'm feeling anxious."
  },
  {
    id: 2,
    date: "2025-04-12",
    scripture: "Psalm 23:1-3",
    prayer: "Thank you for being my shepherd and leading me to peaceful waters.",
    reflection: "I want to trust God's guidance more in my daily decisions."
  },
  {
    id: 3,
    date: "2025-04-10",
    scripture: "Matthew 6:25-27",
    prayer: "Help me not to worry about tomorrow but to focus on today.",
    reflection: "I'm going to make a list of things I'm thankful for each morning."
  }
];

interface Meditation {
  id: number;
  date: string;
  scripture: string;
  prayer: string;
  reflection: string;
}

const History = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [meditations, setMeditations] = useState<Meditation[]>(mockMeditations);
  const [selectedMeditation, setSelectedMeditation] = useState<Meditation | null>(null);
  
  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
    // In a real app, you would fetch the user's meditations from your database here
  }, [user, navigate]);

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this meditation?")) {
      setMeditations(meditations.filter(meditation => meditation.id !== id));
      toast("Meditation deleted", {
        description: "Your meditation has been permanently removed."
      });
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <div className="bg-blue-600 text-white p-6">
        <h1 className="text-2xl font-semibold">Meditation History</h1>
        <p className="opacity-90">Review your past reflections and prayers</p>
      </div>

      <div className="p-4">
        {meditations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500">You haven't saved any meditations yet.</p>
            <Button 
              className="mt-4 bg-blue-600 hover:bg-blue-700"
              onClick={() => navigate("/meditation")}
            >
              Start Your First Meditation
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {meditations.map((meditation) => (
              <Card key={meditation.id} className="shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center text-slate-500 text-sm mb-2">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{formatDate(meditation.date)}</span>
                      </div>
                      <h3 className="font-medium text-slate-900 mb-1">{meditation.scripture}</h3>
                      <p className="text-slate-600 text-sm line-clamp-2">{meditation.prayer}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="p-2 h-auto"
                        onClick={() => setSelectedMeditation(meditation)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="p-2 h-auto text-red-500 border-red-200 hover:text-red-600 hover:bg-red-50"
                        onClick={() => handleDelete(meditation.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {selectedMeditation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[80vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-sm text-slate-500 mb-1">{formatDate(selectedMeditation.date)}</div>
                  <h2 className="text-xl font-semibold text-slate-900">{selectedMeditation.scripture}</h2>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="p-2 h-auto"
                  onClick={() => setSelectedMeditation(null)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </Button>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-slate-900 mb-2">Prayer</h3>
                  <p className="text-slate-700">{selectedMeditation.prayer}</p>
                </div>
                <div>
                  <h3 className="font-medium text-slate-900 mb-2">Reflection</h3>
                  <p className="text-slate-700">{selectedMeditation.reflection}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Header />
    </div>
  );
};

export default History;
