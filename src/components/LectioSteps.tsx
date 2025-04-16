
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Wind,
  BookOpen, 
  MessageSquare, 
  Heart, 
  Coffee,
  ArrowRightCircle
} from "lucide-react";

const LectioSteps = () => {
  const steps = [
    {
      title: "Preparation (Statio)",
      icon: Wind,
      description: "Prepare your heart and mind for the encounter with sacred text through silence and prayer."
    },
    {
      title: "Read (Lectio)",
      icon: BookOpen,
      description: "Read the scripture passage slowly, several times, allowing the words to sink in deeply."
    },
    {
      title: "Reflect (Meditatio)",
      icon: MessageSquare,
      description: "Think about the passage. What stands out to you? What might God be saying to you through these words?"
    },
    {
      title: "Respond (Oratio)",
      icon: Heart,
      description: "Talk to God about what you've read and what it means to you. This is your chance to respond in prayer."
    },
    {
      title: "Rest (Contemplatio)",
      icon: Coffee,
      description: "Simply rest in God's presence. No words are needed, just be with God and receive His love."
    },
    {
      title: "Action (Actio)",
      icon: ArrowRightCircle,
      description: "Consider how you will carry this Word into the world through concrete actions in your daily life."
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {steps.map((step, index) => (
        <Card key={index} className="lectio-card h-full">
          <CardHeader className="pb-2 space-y-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium text-divine-800 flex items-center gap-2">
                <span className="bg-divine-100 text-divine-700 w-6 h-6 flex items-center justify-center rounded-full text-sm">
                  {index + 1}
                </span>
                {step.title}
              </CardTitle>
              <step.icon className="h-5 w-5 text-divine-500" />
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-divine-700">{step.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LectioSteps;
