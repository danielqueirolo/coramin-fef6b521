
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, BookOpen, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const Daily = () => {
  // Sample daily scripture - in a real app, this would come from an API or database
  const todaysScripture = {
    reference: "Philippians 4:6-7",
    text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
    theme: "Peace & Trust",
    context: "Paul wrote these words from prison to the church at Philippi. Despite his circumstances, he encouraged the Philippians to find peace in God through prayer rather than worrying.",
    reflection: "How often do you find yourself anxious about things you can't control? This passage reminds us that bringing our concerns to God in prayer leads to a peace that surpasses understanding."
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-divine-500 mb-2">
              <Calendar className="h-5 w-5" />
              <span className="text-sm font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-divine-800 mb-6">Today's Scripture Reading</h1>
            
            <Card className="lectio-card mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-divine-500" />
                    <CardTitle className="text-xl font-serif font-semibold text-divine-800">{todaysScripture.reference}</CardTitle>
                  </div>
                  <span className="px-3 py-1 bg-divine-100 text-divine-700 text-xs rounded-full">{todaysScripture.theme}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <blockquote className="border-l-4 border-divine-300 pl-4 my-4 italic text-divine-700 text-lg">
                  "{todaysScripture.text}"
                </blockquote>
                
                <div>
                  <h3 className="font-medium text-divine-800 mb-2">Context</h3>
                  <p className="text-divine-700">{todaysScripture.context}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-divine-800 mb-2">Reflection Prompt</h3>
                  <p className="text-divine-700">{todaysScripture.reflection}</p>
                </div>
                
                <div className="pt-4">
                  <Link to="/practice">
                    <Button className="w-full bg-divine-500 hover:bg-divine-600 text-white">
                      Begin Lectio Divina Practice
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <h2 className="text-2xl font-serif font-bold text-divine-800 mb-4">Previous Readings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                { date: "April 11, 2025", reference: "Psalm 23:1-3", theme: "God's Guidance" },
                { date: "April 10, 2025", reference: "Matthew 6:25-27", theme: "Worry & Trust" },
                { date: "April 9, 2025", reference: "Isaiah 41:10", theme: "Courage" },
                { date: "April 8, 2025", reference: "Romans 8:38-39", theme: "God's Love" }
              ].map((reading, index) => (
                <Card key={index} className="lectio-card">
                  <CardHeader className="pb-2">
                    <CardDescription className="text-divine-500 text-xs">{reading.date}</CardDescription>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-medium text-divine-800">{reading.reference}</CardTitle>
                      <span className="px-2 py-1 bg-divine-100 text-divine-700 text-xs rounded-full">{reading.theme}</span>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Daily;
