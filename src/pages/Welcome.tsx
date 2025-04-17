
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Wind, MessageSquare, Coffee } from 'lucide-react';

const WelcomeSlides = [
  {
    icon: Wind,
    title: "Reduce Anxiety Through Meditation",
    description: "Discover a peaceful path to calm your mind and release stress. Meditation is not just a practice, but a journey towards inner tranquility.",
  },
  {
    icon: MessageSquare,
    title: "The Power of Contemplation",
    description: "Learn to pause, reflect, and listen deeply. Contemplation opens doors to self-understanding and profound spiritual insights.",
  },
  {
    icon: Coffee,
    title: "Embrace Silence",
    description: "In the quietude of silence, find strength, clarity, and connection. Silence is not emptiness, but a fullness of presence.",
  }
];

const Welcome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < WelcomeSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/auth');
    }
  };

  const handleSkip = () => {
    navigate('/auth');
  };

  const CurrentSlide = WelcomeSlides[currentSlide];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-divine-50 p-4">
      <div className="max-w-md text-center space-y-8">
        <div className="bg-divine-100 p-6 rounded-full mx-auto w-24 h-24 flex items-center justify-center mb-6">
          <CurrentSlide.icon className="w-12 h-12 text-divine-600" />
        </div>
        
        <h2 className="text-3xl font-serif font-bold text-divine-800 mb-4">
          {CurrentSlide.title}
        </h2>
        
        <p className="text-divine-700 mb-8">
          {CurrentSlide.description}
        </p>
        
        <div className="flex justify-center space-x-4">
          <Button 
            variant="outline" 
            onClick={handleSkip} 
            className="text-divine-700"
          >
            Skip
          </Button>
          <Button 
            onClick={handleNext} 
            className="bg-divine-600 hover:bg-divine-700 text-white"
          >
            {currentSlide < WelcomeSlides.length - 1 ? 'Next' : 'Get Started'}
          </Button>
        </div>
        
        <div className="flex justify-center space-x-2 mt-4">
          {WelcomeSlides.map((_, index) => (
            <div 
              key={index} 
              className={`h-2 w-2 rounded-full ${
                index === currentSlide ? 'bg-divine-600' : 'bg-divine-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
