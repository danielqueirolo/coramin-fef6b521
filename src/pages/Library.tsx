
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Search, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Library = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const categories = [
    { id: "anxiety", name: "Anxiety & Peace" },
    { id: "identity", name: "Identity & Worth" },
    { id: "purpose", name: "Purpose & Direction" },
    { id: "relationships", name: "Relationships" },
    { id: "faith", name: "Faith & Doubt" },
  ];
  
  const scripturesByCategory = {
    anxiety: [
      { reference: "Philippians 4:6-7", theme: "Peace", teaser: "Do not be anxious about anything, but in every situation..." },
      { reference: "Matthew 6:25-27", theme: "Trust", teaser: "Therefore I tell you, do not worry about your life..." },
      { reference: "Isaiah 41:10", theme: "Courage", teaser: "So do not fear, for I am with you; do not be dismayed..." },
      { reference: "Psalm 56:3-4", theme: "Fear", teaser: "When I am afraid, I put my trust in you..." },
    ],
    identity: [
      { reference: "Psalm 139:13-14", theme: "Worth", teaser: "For you created my inmost being; you knit me together..." },
      { reference: "Ephesians 2:10", theme: "Purpose", teaser: "For we are God's handiwork, created in Christ Jesus..." },
      { reference: "1 Peter 2:9", theme: "Identity", teaser: "But you are a chosen people, a royal priesthood..." },
      { reference: "Galatians 4:7", theme: "Adoption", teaser: "So you are no longer a slave, but God's child..." },
    ],
    purpose: [
      { reference: "Jeremiah 29:11", theme: "Hope", teaser: "For I know the plans I have for you, declares the Lord..." },
      { reference: "Proverbs 3:5-6", theme: "Guidance", teaser: "Trust in the Lord with all your heart and lean not..." },
      { reference: "Romans 8:28", theme: "Providence", teaser: "And we know that in all things God works for the good..." },
      { reference: "Ephesians 2:10", theme: "Calling", teaser: "For we are God's handiwork, created in Christ Jesus..." },
    ],
    relationships: [
      { reference: "1 Corinthians 13:4-7", theme: "Love", teaser: "Love is patient, love is kind. It does not envy..." },
      { reference: "Ephesians 4:32", theme: "Forgiveness", teaser: "Be kind and compassionate to one another, forgiving..." },
      { reference: "Proverbs 17:17", theme: "Friendship", teaser: "A friend loves at all times, and a brother is born..." },
      { reference: "Colossians 3:13", theme: "Patience", teaser: "Bear with each other and forgive one another..." },
    ],
    faith: [
      { reference: "Hebrews 11:1", theme: "Faith", teaser: "Now faith is confidence in what we hope for..." },
      { reference: "Mark 9:24", theme: "Doubt", teaser: "I do believe; help me overcome my unbelief!" },
      { reference: "Romans 10:17", theme: "Growth", teaser: "Consequently, faith comes from hearing the message..." },
      { reference: "2 Corinthians 5:7", theme: "Trust", teaser: "For we live by faith, not by sight..." },
    ],
  };
  
  const allScriptures = Object.values(scripturesByCategory).flat();
  
  const filteredScriptures = searchQuery 
    ? allScriptures.filter(scripture => 
        scripture.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scripture.theme.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scripture.teaser.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-divine-800 mb-6">Scripture Library</h1>
            
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-divine-500 h-5 w-5" />
              <Input 
                placeholder="Search by reference, theme, or content..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {searchQuery && (
              <div className="mb-8">
                <h2 className="text-xl font-medium text-divine-800 mb-4">Search Results</h2>
                
                {filteredScriptures.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredScriptures.map((scripture, index) => (
                      <Card key={index} className="lectio-card">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-medium text-divine-800">{scripture.reference}</CardTitle>
                            <span className="px-2 py-1 bg-divine-100 text-divine-700 text-xs rounded-full">{scripture.theme}</span>
                          </div>
                          <CardDescription className="text-divine-700">{scripture.teaser}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button variant="outline" size="sm" className="w-full border-divine-200 text-divine-700">
                            <BookOpen className="mr-2 h-4 w-4" />
                            Read & Meditate
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="lectio-card">
                    <CardContent className="pt-6 pb-6 text-center">
                      <p className="text-divine-700">No scriptures found matching "{searchQuery}"</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
            
            <Tabs defaultValue={categories[0].id}>
              <div className="mb-4 overflow-x-auto">
                <TabsList className="inline-flex w-auto">
                  {categories.map((category) => (
                    <TabsTrigger key={category.id} value={category.id}>
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              
              {categories.map((category) => (
                <TabsContent key={category.id} value={category.id}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {scripturesByCategory[category.id as keyof typeof scripturesByCategory].map((scripture, index) => (
                      <Card key={index} className="lectio-card">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-medium text-divine-800">{scripture.reference}</CardTitle>
                            <span className="px-2 py-1 bg-divine-100 text-divine-700 text-xs rounded-full">{scripture.theme}</span>
                          </div>
                          <CardDescription className="text-divine-700">{scripture.teaser}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Link to="/practice">
                            <Button variant="outline" size="sm" className="w-full border-divine-200 text-divine-700">
                              <BookOpen className="mr-2 h-4 w-4" />
                              Read & Meditate
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Library;
