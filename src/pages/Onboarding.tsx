
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Heart, Moon } from "lucide-react";

interface OnboardingProps {
  completeOnboarding: () => void;
}

const Onboarding = ({ completeOnboarding }: OnboardingProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      title: "Lectio Divina Meditation",
      description: "Experience the ancient Christian practice of spiritual reading, meditation, and prayer.",
      icon: <BookOpen className="h-16 w-16 text-blue-600" />,
    },
    {
      title: "Reduce Anxiety & Stress",
      description: "Find peace and tranquility through guided meditation and reflection on scripture.",
      icon: <Moon className="h-16 w-16 text-blue-600" />,
    },
    {
      title: "Deepen Your Spirituality",
      description: "Connect with God on a deeper level and grow in your faith journey.",
      icon: <Heart className="h-16 w-16 text-blue-600" />,
    },
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      completeOnboarding();
      navigate("/auth");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-6 bg-white">
      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto text-center">
        <div className="mb-8 p-4 rounded-full bg-blue-100">
          {slides[currentSlide].icon}
        </div>
        
        <h1 className="text-2xl font-bold mb-4 text-slate-900">
          {slides[currentSlide].title}
        </h1>
        
        <p className="text-slate-600 mb-8">
          {slides[currentSlide].description}
        </p>

        <div className="flex space-x-2 mb-8">
          {slides.map((_, index) => (
            <div 
              key={index} 
              className={`h-2 rounded-full ${index === currentSlide ? 'w-8 bg-blue-600' : 'w-2 bg-gray-300'}`}
            />
          ))}
        </div>
      </div>

      <div className="w-full max-w-md mx-auto">
        <Button 
          onClick={nextSlide} 
          className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700"
        >
          {currentSlide < slides.length - 1 ? "Continue" : "Get Started"}
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
