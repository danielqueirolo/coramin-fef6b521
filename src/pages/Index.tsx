
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import LectioSteps from "@/components/LectioSteps";
import FeatureCard from "@/components/FeatureCard";
import { Book, Calendar, MessageSquare, HeartHandshake } from "lucide-react";

const Index = () => {
  const features = [
    {
      title: "Daily Scripture",
      description: "A new Bible passage each day, selected specifically for teens dealing with modern challenges.",
      icon: Book
    },
    {
      title: "Guided Meditation",
      description: "Step-by-step guidance through the four stages of Lectio Divina: Read, Reflect, Respond, and Rest.",
      icon: Calendar
    },
    {
      title: "Prayer Journal",
      description: "Record your thoughts, prayers, and insights as you connect with God's word.",
      icon: MessageSquare
    },
    {
      title: "Community Support",
      description: "Connect with other teens on their spiritual journey through moderated discussion spaces.",
      icon: HeartHandshake
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-serif font-bold text-divine-800 mb-4 text-center">What is Lectio Divina?</h2>
              <p className="text-divine-700 text-center">
                Lectio Divina (Latin for "Divine Reading") is an ancient practice of prayerfully meditating on sacred scripture. 
                It's a way of reading the Bible where we don't just read for information, but to hear God speak to us personally.
              </p>
            </div>
            
            <LectioSteps />
          </div>
        </section>
        
        <section className="py-16 bg-divine-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <FeatureCard 
                  key={index}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                />
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-3xl font-serif font-bold text-divine-800 mb-6">Begin Your Journey Today</h2>
            <p className="text-divine-700 mb-8">
              Divine Teen Whispers provides a peaceful space for you to connect with God's word,
              reflect on its meaning in your life, and grow in your faith journey.
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
