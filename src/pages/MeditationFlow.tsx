import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const MeditationFlow = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isFirstTime] = useState(() => {
    return !localStorage.getItem("hasCompletedFirstSession");
  });
  const [prayer, setPrayer] = useState("");
  const [reflection, setReflection] = useState("");
  const [meditationTimer, setMeditationTimer] = useState(60);
  const [timeLeft, setTimeLeft] = useState(meditationTimer);
  const [timerActive, setTimerActive] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
  }, [user, navigate]);

  useEffect(() => {
    let timer;
    if (timerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1;
          setProgress((meditationTimer - newTime) / meditationTimer * 100);
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      setTimerActive(false);
      toast("Meditação concluída", {
        description: "Você pode continuar para a próxima etapa quando desejar."
      });
    }
    return () => clearInterval(timer);
  }, [timerActive, timeLeft, meditationTimer]);

  const startTimer = () => {
    setTimeLeft(meditationTimer);
    setProgress(0);
    setTimerActive(true);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      navigate("/dashboard");
    }
  };

  const handleComplete = () => {
    localStorage.setItem("hasCompletedFirstSession", "true");
    toast("Lectio Divina Concluída", {
      description: "Sua meditação foi salva com sucesso."
    });
    navigate("/dashboard");
  };

  const handleSaveReflection = () => {
    if (reflection.trim() === "") {
      toast("Escreva sua reflexão antes de salvar", {
        description: "Compartilhe como o texto sagrado tocou seu coração."
      });
      return;
    }
    
    // Here you would save the reflection to your database
    // For now we'll just complete the session
    handleComplete();
  };

  const steps = [
    {
      id: "intro",
      title: "Lectio Divina",
      description: isFirstTime ? "Conheça essa antiga prática espiritual" : "Prepare-se para a meditação",
      content: (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 space-y-6">
          <div className="max-w-md text-center">
            <p className="text-divine-700 mb-6">
              Lectio Divina (Leitura Divina) é uma prática monástica tradicional de leitura, 
              meditação e oração das Escrituras que remonta ao século VI.
            </p>
            <p className="text-divine-700 mb-6">
              Trata a Escritura como a Palavra Viva e busca ouvir a voz de Deus através do texto, 
              permitindo que Ele fale diretamente ao seu coração.
            </p>
            <p className="text-divine-700">
              Esta prática segue quatro passos principais: leitura (lectio), 
              meditação (meditatio), oração (oratio) e contemplatio.
            </p>
          </div>
        </div>
      ),
      showBack: false
    },
    {
      id: "statio",
      title: "Preparação (Statio)",
      description: "Prepare seu coração e mente para o encontro com o texto sagrado",
      content: (
        <div className="space-y-6">
          <p className="text-divine-700">
            Encontre um lugar tranquilo e confortável onde você não será perturbado.
          </p>
          <p className="text-divine-700">
            Sente-se em uma posição que permita estar relaxado e alerta ao mesmo tempo.
          </p>
          <p className="text-divine-700">
            Respire profundamente algumas vezes, inspirando paz e expirando distrações.
          </p>
          <p className="text-divine-700">
            Torne-se consciente da presença de Deus com você neste momento.
          </p>
          <p className="text-divine-700">
            Peça ao Espírito Santo para guiar sua leitura e reflexão.
          </p>
          <div className="flex justify-between mt-8">
            <Button 
              variant="ghost" 
              onClick={handleBack}
              className="text-divine-500"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Voltar
            </Button>
            <Button 
              onClick={() => setCurrentStep(currentStep + 1)}
              className="bg-divine-600 hover:bg-divine-700 text-white"
            >
              Iniciar Lectio
            </Button>
          </div>
        </div>
      ),
      showBack: true
    },
    {
      id: "lectio",
      title: "Leitura (Lectio)",
      description: "Leia a passagem lentamente e com atenção",
      content: (
        <div className="space-y-6">
          <p className="text-divine-700">
            Leia a passagem lentamente, saboreando cada palavra.
          </p>
          <p className="text-divine-700">
            Leia-a novamente, ouvindo uma palavra ou frase que se destaque para você.
          </p>
          <p className="text-divine-700">
            Que palavra ou frase captura sua atenção ou toca seu coração?
          </p>
          <p className="text-divine-700">
            Repita esta palavra ou frase para si mesmo, permitindo que ela penetre.
          </p>
          <p className="text-divine-700">
            Esteja atento a como Deus pode estar falando com você através dessas palavras.
          </p>
          <div className="flex justify-between mt-8">
            <Button 
              variant="ghost" 
              onClick={handleBack}
              className="text-divine-500"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Voltar
            </Button>
            <Button 
              onClick={() => setCurrentStep(currentStep + 1)}
              className="bg-divine-600 hover:bg-divine-700 text-white"
            >
              Faça a Leitura
            </Button>
          </div>
        </div>
      ),
      showBack: true
    },
    {
      id: "scripture",
      title: "Filipenses 4:6-7",
      description: "",
      content: (
        <div className="space-y-6 fade-in">
          <div className="p-6 bg-divine-50 rounded-lg border border-divine-100">
            <p className="text-divine-800 text-xl font-serif">
              "Não andem ansiosos por coisa alguma, mas em tudo, pela oração e súplicas, e com ação de graças, apresentem seus pedidos a Deus. E a paz de Deus, que excede todo o entendimento, guardará os seus corações e as suas mentes em Cristo Jesus."
            </p>
            <p className="mt-4 text-divine-600 text-right">Filipenses 4:6-7</p>
          </div>
          <div className="flex justify-between mt-8">
            <Button 
              variant="ghost" 
              onClick={handleBack}
              className="text-divine-500"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Voltar
            </Button>
            <Button 
              onClick={() => {
                setCurrentStep(currentStep + 1);
                startTimer();
              }}
              className="bg-divine-600 hover:bg-divine-700 text-white"
            >
              Meditatio
            </Button>
          </div>
        </div>
      ),
      showBack: true
    },
    {
      id: "meditatio",
      title: "Meditação (Meditatio)",
      description: "Reflita sobre o significado do texto para sua vida",
      content: (
        <div className="h-full flex flex-col items-center justify-center space-y-8 relative">
          <div className="w-full max-w-md mx-auto px-4">
            <Progress value={progress} className="h-2 bg-divine-100" />
          </div>
          
          <p className="text-divine-700 text-center px-6">
            Medite em silêncio sobre a passagem. 
            <br />Permita que a palavra penetre em seu coração.
          </p>
          
          <Button 
            variant="ghost"
            onClick={() => setCurrentStep(currentStep + 1)}
            className="absolute bottom-20 right-4 bg-divine-50 hover:bg-divine-100 text-divine-700"
          >
            Oratio
          </Button>
        </div>
      ),
      showBack: true,
      fullScreen: true
    },
    {
      id: "oratio",
      title: "Oração (Oratio)",
      description: "Responda a Deus em oração",
      content: (
        <div className="space-y-6">
          <p className="text-divine-700">
            Expresse seus pensamentos, sentimentos e desejos a Deus com base no que você leu e refletiu.
          </p>
          <textarea
            value={prayer}
            onChange={(e) => setPrayer(e.target.value)}
            placeholder="Escreva sua oração aqui..."
            className="w-full h-40 p-3 border border-divine-200 rounded-md focus:outline-none focus:ring-2 focus:ring-divine-500"
          />
          <div className="flex justify-between mt-8">
            <Button 
              variant="ghost" 
              onClick={handleBack}
              className="text-divine-500"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Voltar
            </Button>
            <Button 
              onClick={() => setCurrentStep(currentStep + 1)}
              className="bg-divine-600 hover:bg-divine-700 text-white"
            >
              Contemplatio
            </Button>
          </div>
        </div>
      ),
      showBack: true
    },
    {
      id: "contemplatio",
      title: "Contemplação (Contemplatio)",
      description: "Descanse na presença de Deus",
      content: (
        <div className="space-y-6 h-full flex flex-col">
          <div className="flex-grow rounded-lg overflow-hidden">
            <img 
              src="https://placehold.co/800x800/f0f4f8/d6e0eb?text=Contemplação" 
              alt="Arte para contemplação" 
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-divine-700 text-center">
            Simplesmente descanse na presença de Deus, deixando ir palavras e pensamentos.
          </p>
          <div className="flex justify-between">
            <Button 
              variant="ghost" 
              onClick={handleBack}
              className="text-divine-500"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Voltar
            </Button>
            <Button 
              onClick={() => setCurrentStep(currentStep + 1)}
              className="bg-divine-600 hover:bg-divine-700 text-white"
            >
              Concluir a Lectio Divina
            </Button>
          </div>
        </div>
      ),
      showBack: true
    },
    {
      id: "actio",
      title: "Ação (Actio)",
      description: "Leve esta Palavra para o mundo",
      content: (
        <div className="space-y-6">
          <p className="text-divine-700">
            Parabéns por concluir sua sessão de Lectio Divina! Esperamos que Deus tenha falado ao seu coração através deste tempo.
          </p>
          <p className="text-divine-700">
            Como você poderia aplicar o que aprendeu hoje em sua vida?
          </p>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="Escreva sua reflexão e planos de ação aqui..."
            className="w-full h-40 p-3 border border-divine-200 rounded-md focus:outline-none focus:ring-2 focus:ring-divine-500"
          />
          <div className="flex justify-between mt-8">
            <Button 
              variant="ghost" 
              onClick={handleBack}
              className="text-divine-500"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Voltar
            </Button>
            {reflection.trim() !== "" && (
              <Button 
                onClick={handleSaveReflection}
                className="bg-divine-600 hover:bg-divine-700 text-white"
              >
                Salvar Lectio
              </Button>
            )}
          </div>
        </div>
      ),
      showBack: true
    }
  ];

  // If not first time, skip intro
  const filteredSteps = isFirstTime ? steps : steps.filter(step => step.id !== "intro");
  const currentStepData = filteredSteps[currentStep];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-white pb-16">
      <div className={`container mx-auto px-4 py-8 ${currentStepData.fullScreen ? "h-screen" : ""}`}>
        {!currentStepData.fullScreen && (
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-serif font-semibold text-divine-800">{currentStepData.title}</h1>
            {currentStepData.description && (
              <p className="text-divine-600">{currentStepData.description}</p>
            )}
          </div>
        )}
        
        <div className={`${currentStepData.fullScreen ? "h-full" : ""} relative`}>
          {currentStepData.content}
          
          {currentStepData.showBack && (
            <Button 
              variant="ghost" 
              onClick={handleBack}
              className="fixed bottom-24 left-4 text-divine-500 hover:text-divine-600"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Voltar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeditationFlow;
