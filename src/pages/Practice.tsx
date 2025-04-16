
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Wind, 
  BookOpen, 
  MessageSquare, 
  Heart, 
  Coffee,
  ChevronRight,
  ChevronLeft,
  Clock,
  ArrowRightCircle
} from "lucide-react";
import { useState } from "react";
import PracticeJournal from "@/components/PracticeJournal";

const Practice = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    {
      id: "preparation",
      title: "Preparation (Statio)",
      icon: Wind,
      color: "text-teal-500",
      description: "Prepare your heart and mind for the encounter with the sacred text.",
      instructions: [
        "Find a quiet, comfortable place where you won't be disturbed.",
        "Sit in a position that allows you to be both relaxed and alert.",
        "Take several deep breaths, inhaling peace and exhaling distractions.",
        "Become aware of God's presence with you in this moment.",
        "Ask the Holy Spirit to guide your reading and reflection."
      ]
    },
    {
      id: "read",
      title: "Read (Lectio)",
      icon: BookOpen,
      color: "text-blue-500",
      description: "Read the passage slowly and attentively. Notice any words or phrases that stand out to you.",
      instructions: [
        "Read the passage slowly, savoring each word.",
        "Read it again, listening for a word or phrase that stands out to you.",
        "What word or phrase captures your attention or touches your heart?",
        "Repeat this word or phrase to yourself, allowing it to sink in.",
        "Be attentive to how God might be speaking to you through these words."
      ],
      showScripture: true
    },
    {
      id: "reflect",
      title: "Reflect (Meditatio)",
      icon: MessageSquare,
      color: "text-purple-500",
      description: "Think about what the passage means. How might God be speaking to you through these words?",
      instructions: [
        "What might God be saying to you through this passage?",
        "How does this connect with your life right now?",
        "What feelings or thoughts arise as you reflect on these words?",
        "Imagine yourself in the scene if it's a narrative passage.",
        "Allow God's word to touch your heart, not just your mind."
      ]
    },
    {
      id: "respond",
      title: "Respond (Oratio)",
      icon: Heart,
      color: "text-red-500",
      description: "Speak to God in prayer about what you've read and reflected upon. Record your thoughts in the journal below.",
      instructions: [
        "Respond honestly to God about what came up during your reflection.",
        "Talk to God as you would to a friend about your thoughts, feelings, and questions.",
        "Ask for guidance, forgiveness, or strength if needed.",
        "Express gratitude for what God has revealed to you.",
        "Record your prayer and reflections in the journal below."
      ],
      hasJournal: true
    },
    {
      id: "rest",
      title: "Rest (Contemplatio)",
      icon: Coffee,
      color: "text-amber-500",
      description: "Simply rest in God's presence, letting go of words and thoughts.",
      instructions: [
        "Let go of your own reflections and simply be with God.",
        "Rest in God's presence like being with someone you love in comfortable silence.",
        "Allow God's love to wash over you.",
        "Don't worry about thinking or saying anything.",
        "Just be present and open to God's transforming embrace."
      ]
    },
    {
      id: "action",
      title: "Action (Actio)",
      icon: ArrowRightCircle,
      color: "text-green-500",
      description: "Consider how you will carry this Word into the world through your actions.",
      instructions: [
        "What is one concrete way you can live out this Scripture today?",
        "How might this word change how you interact with others?",
        "Is there a specific action or change of attitude God is calling you to?",
        "What obstacles might you face in applying this word, and how can you overcome them?",
        "Commit to one small, manageable step you can take today."
      ],
      hasJournal: true,
      showScripture: true
    }
  ];
  
  const currentStepData = steps[currentStep];
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-divine-800 mb-6">Lectio Divina Practice</h1>
            
            {currentStepData.showScripture && (
              <Card className="lectio-card mb-8">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-serif font-semibold text-divine-800">
                      Philippians 4:6-7
                    </CardTitle>
                    <div className="flex items-center gap-2 text-divine-500">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">15-20 minutes</span>
                    </div>
                  </div>
                  <CardDescription className="text-divine-700">
                    "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus."
                  </CardDescription>
                </CardHeader>
              </Card>
            )}
            
            <div className="mb-6">
              <Tabs defaultValue="guided" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="guided">Guided Practice</TabsTrigger>
                  <TabsTrigger value="info">About Lectio Divina</TabsTrigger>
                </TabsList>
                <TabsContent value="guided">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <div className="bg-divine-100 p-2 rounded-full">
                          <currentStepData.icon className={`h-5 w-5 ${currentStepData.color}`} />
                        </div>
                        <div>
                          <CardTitle className="text-xl font-medium text-divine-800">
                            Step {currentStep + 1}: {currentStepData.title}
                          </CardTitle>
                          <CardDescription className="text-divine-700">
                            {currentStepData.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <ul className="space-y-2 mb-6">
                        {currentStepData.instructions.map((instruction, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="bg-divine-100 text-divine-700 w-5 h-5 flex items-center justify-center rounded-full text-xs mt-0.5">
                              {index + 1}
                            </span>
                            <span className="text-divine-700">{instruction}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {currentStepData.hasJournal && (
                        <div className="my-6">
                          <PracticeJournal 
                            step={currentStepData.id} 
                            scripture="Philippians 4:6-7"
                          />
                        </div>
                      )}
                      
                      <div className="flex justify-between pt-4">
                        <Button
                          variant="outline"
                          onClick={handlePrevious}
                          disabled={currentStep === 0}
                          className="border-divine-300 text-divine-700"
                        >
                          <ChevronLeft className="mr-2 h-4 w-4" />
                          Previous
                        </Button>
                        <Button
                          onClick={handleNext}
                          disabled={currentStep === steps.length - 1}
                          className="bg-divine-500 hover:bg-divine-600 text-white"
                        >
                          Next
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="info">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl font-serif font-semibold text-divine-800">
                        The Ancient Practice of Lectio Divina
                      </CardTitle>
                      <CardDescription className="text-divine-700">
                        A sacred way to engage with Scripture that began with Benedictine monks in the 6th century
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-divine-700">
                        Lectio Divina, Latin for "Divine Reading," is an ancient practice of scriptural reading, 
                        meditation and prayer intended to promote communion with God. It treats Scripture as the 
                        Living Word of God.
                      </p>
                      <p className="text-divine-700">
                        The practice dates back to the early centuries of Christian monasticism, and was formalized 
                        as a four-step process by the Benedictine monk Guigo II in the 12th century. Today, many practitioners
                        add the steps of Preparation (Statio) before beginning and Action (Actio) at the end.
                      </p>
                      <p className="text-divine-700">
                        Unlike regular Bible study where we analyze text for information, Lectio Divina invites us 
                        to sit with Scripture and listen deeply to what God might be saying to us personally through 
                        the text.
                      </p>
                      <p className="text-divine-700">
                        This practice can transform our relationship with Scripture from merely reading words on a 
                        page to encountering the living God who speaks to us directly through these sacred texts.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Practice;
