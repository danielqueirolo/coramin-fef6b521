
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const MeditationFlow = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [notes, setNotes] = useState("");
  
  const lectioSteps = [
    {
      name: "Lectio (Reading)",
      instruction: "Read the scripture slowly and attentively.",
      scripture: "Come to me, all who labor and are heavy laden, and I will give you rest. Take my yoke upon you, and learn from me, for I am gentle and lowly in heart, and you will find rest for your souls. For my yoke is easy, and my burden is light.",
      reference: "Matthew 11:28-30",
      duration: 60, // seconds
    },
    {
      name: "Meditatio (Meditation)",
      instruction: "Reflect deeply on the words. What is God saying to you today?",
      duration: 120, // seconds
    },
    {
      name: "Oratio (Prayer)",
      instruction: "Respond to God in prayer based on what you've read and meditated upon.",
      duration: 120, // seconds
    },
    {
      name: "Contemplatio (Contemplation)",
      instruction: "Rest in God's presence, allowing His word to transform you.",
      duration: 180, // seconds
    }
  ];

  const totalSteps = lectioSteps.length;
  const currentStepData = lectioSteps[currentStep];
  const stepProgress = Math.min(100, (timeElapsed / currentStepData.duration) * 100);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  useEffect(() => {
    let interval: number | null = null;
    
    if (!isPaused && timeElapsed < currentStepData.duration) {
      interval = window.setInterval(() => {
        setTimeElapsed(prev => {
          const newTime = prev + 1;
          if (newTime >= currentStepData.duration) {
            clearInterval(interval!);
          }
          return newTime;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPaused, timeElapsed, currentStepData.duration]);

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      setTimeElapsed(0);
    } else {
      // Complete meditation
      toast({
        title: "Meditation Complete",
        description: "Your meditation session has been saved.",
      });
      navigate("/history");
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setTimeElapsed(0);
    }
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <div className="bg-blue-600 text-white p-6">
        <h1 className="text-2xl font-semibold">Lectio Divina</h1>
        <div className="flex justify-between mt-2">
          <p>Step {currentStep + 1} of {totalSteps}</p>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-blue-700"
            onClick={togglePause}
          >
            {isPaused ? <Play className="h-4 w-4 mr-1" /> : <Pause className="h-4 w-4 mr-1" />}
            {isPaused ? "Resume" : "Pause"}
          </Button>
        </div>
        <Progress value={stepProgress} className="mt-2 bg-blue-400" />
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">
            {currentStepData.name}
          </h2>
          
          <p className="text-slate-600 mb-6">
            {currentStepData.instruction}
          </p>

          {currentStep === 0 && (
            <div className="bg-blue-50 p-4 rounded-md mb-6">
              <p className="text-slate-800 italic mb-2">
                "{currentStepData.scripture}"
              </p>
              <p className="text-right text-slate-600 text-sm">
                {currentStepData.reference}
              </p>
            </div>
          )}

          {currentStep === 3 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Journal your thoughts (optional):
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border-slate-300 rounded-md p-3 h-32"
                placeholder="Write your reflections here..."
              />
            </div>
          )}

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={previousStep}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Previous
            </Button>
            
            <Button
              onClick={nextStep}
            >
              {currentStep < totalSteps - 1 ? "Next" : "Complete"}
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Header />
    </div>
  );
};

export default MeditationFlow;
