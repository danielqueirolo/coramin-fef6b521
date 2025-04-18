
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookOpen, PenTool, Heart, Coffee, ArrowRightCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';

type LectioStep = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  instructions: string[];
  hasScripture?: boolean;
  hasJournal?: boolean;
};

const LectioSteps = ({ isFirstTime = false, onComplete }: { isFirstTime?: boolean; onComplete?: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [reflection, setReflection] = useState('');
  const [prayer, setPrayer] = useState('');
  const navigate = useNavigate();

  // Example scripture
  const scripture = {
    reference: "Philippians 4:6-7",
    text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus."
  };

  const steps: LectioStep[] = [
    {
      id: "intro",
      title: "Lectio Divina",
      description: "An ancient practice of prayerful reading of Scripture",
      icon: <BookOpen className="h-6 w-6 text-blue-600" />,
      instructions: [
        "Lectio Divina (Divine Reading) is a traditional monastic practice of scripture reading, meditation and prayer.",
        "It treats scripture as the Living Word and seeks to hear God's voice through the text.",
        "The practice follows four steps: reading (lectio), meditation (meditatio), prayer (oratio), and contemplation (contemplatio).",
        "This method helps you not just to read the Bible, but to experience it deeply and personally."
      ],
      hasScripture: false
    },
    {
      id: "statio",
      title: "Preparation (Statio)",
      description: "Prepare your heart and mind for the encounter with the sacred text",
      icon: <BookOpen className="h-6 w-6 text-blue-600" />,
      instructions: [
        "Find a quiet, comfortable place where you won't be disturbed.",
        "Take a few deep breaths and become present to God.",
        "Let go of distractions and quiet your mind.",
        "Ask the Holy Spirit to guide your reading and open your heart to God's word."
      ],
      hasScripture: false
    },
    {
      id: "lectio",
      title: "Read (Lectio)",
      description: "Read the passage slowly and attentively",
      icon: <BookOpen className="h-6 w-6 text-blue-600" />,
      instructions: [
        "Read the scripture passage slowly and deliberately.",
        "Pay attention to words or phrases that stand out to you.",
        "Read the passage again, allowing it to sink in.",
        "Notice any thoughts, feelings, or memories that arise."
      ],
      hasScripture: true
    },
    {
      id: "meditatio",
      title: "Meditate (Meditatio)",
      description: "Reflect on the meaning of the text for your life",
      icon: <PenTool className="h-6 w-6 text-purple-600" />,
      instructions: [
        "Reflect on the words or phrases that caught your attention.",
        "Consider what God might be saying to you through this passage.",
        "Ask yourself how this scripture applies to your life right now.",
        "Let the Word sink deeply into your heart and mind."
      ],
      hasScripture: false
    },
    {
      id: "oratio",
      title: "Pray (Oratio)",
      description: "Respond to God in prayer",
      icon: <Heart className="h-6 w-6 text-red-600" />,
      instructions: [
        "Respond to God based on what you've read and reflected upon.",
        "Express your thoughts, feelings, desires, and needs to God.",
        "This could be gratitude, confession, praise, or petition.",
        "Write down your prayer if it helps you focus."
      ],
      hasJournal: true
    },
    {
      id: "contemplatio",
      title: "Contemplate (Contemplatio)",
      description: "Rest in God's presence",
      icon: <Coffee className="h-6 w-6 text-amber-600" />,
      instructions: [
        "Simply rest in God's presence without words or thoughts.",
        "Let go of your own reflections and enjoy being with God.",
        "Allow yourself to be loved by God.",
        "This is a time of receiving rather than doing."
      ],
      hasScripture: false
    },
    {
      id: "actio",
      title: "Act (Actio)",
      description: "Carry this Word into the world",
      icon: <ArrowRightCircle className="h-6 w-6 text-green-600" />,
      instructions: [
        "Consider how you will live out what God has shown you.",
        "What action will you take in response to this scripture?",
        "How might this Word change how you live and relate to others?",
        "Write down one concrete step you will take."
      ],
      hasJournal: true
    }
  ];

  // Filter out intro step if not first time
  const filteredSteps = isFirstTime ? steps : steps.filter(step => step.id !== "intro");
  const currentStepData = filteredSteps[currentStep];

  const handleNext = () => {
    if (currentStep < filteredSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete the Lectio Divina session
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    toast("Lectio Divina Completed", {
      description: "Your meditation has been saved to your journal."
    });
    
    if (onComplete) {
      onComplete();
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Card className="border-none shadow-md">
        {currentStepData.hasScripture && (
          <CardHeader className="bg-blue-50 border-b">
            <CardTitle className="text-lg font-medium">{scripture.reference}</CardTitle>
            <CardDescription className="text-base font-medium text-slate-700 mt-2">
              "{scripture.text}"
            </CardDescription>
          </CardHeader>
        )}
        
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-2 rounded-full">
              {currentStepData.icon}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">{currentStepData.title}</h2>
              <p className="text-slate-600">{currentStepData.description}</p>
            </div>
          </div>
          
          <ul className="space-y-3 mb-6">
            {currentStepData.instructions.map((instruction, index) => (
              <li key={index} className="flex gap-2">
                <span className="bg-blue-100 text-blue-600 h-6 w-6 flex items-center justify-center rounded-full text-sm flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-slate-700">{instruction}</span>
              </li>
            ))}
          </ul>

          {currentStepData.hasJournal && (
            <div className="mb-6">
              <textarea
                className="w-full border border-slate-300 rounded-md p-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={currentStepData.id === "oratio" ? "Write your prayer here..." : "Write your reflection here..."}
                value={currentStepData.id === "oratio" ? prayer : reflection}
                onChange={(e) => currentStepData.id === "oratio" ? setPrayer(e.target.value) : setReflection(e.target.value)}
              />
            </div>
          )}
          
          <div className="flex justify-between mt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </Button>
            
            <Button
              onClick={handleNext}
              className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-1"
            >
              {currentStep === filteredSteps.length - 1 ? "Complete" : "Next"} <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LectioSteps;
