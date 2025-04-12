
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { CalendarIcon, Save, PlusCircle } from "lucide-react";

const Journal = () => {
  const [entries, setEntries] = useState([
    {
      id: 1,
      date: "April 12, 2025",
      scripture: "Philippians 4:6-7",
      content: "Today I reflected on anxiety and peace. The phrase 'present your requests to God' stood out to me because I've been keeping my worries to myself. I need to remember to bring everything to God in prayer.",
      emotion: "Peaceful"
    },
    {
      id: 2,
      date: "April 11, 2025",
      scripture: "Psalm 23:1-3",
      content: "I love the image of God as my shepherd who leads me beside quiet waters. My life feels so chaotic right now with school and activities, but this passage reminds me that God provides moments of rest.",
      emotion: "Comforted"
    }
  ]);
  
  const [newEntry, setNewEntry] = useState({
    scripture: "",
    content: "",
    emotion: ""
  });

  const handleSaveEntry = () => {
    if (newEntry.content.trim() === "") {
      toast({
        title: "Entry cannot be empty",
        description: "Please write something in your journal entry.",
        variant: "destructive"
      });
      return;
    }
    
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    const newEntryWithId = {
      id: Date.now(),
      date: formattedDate,
      ...newEntry
    };
    
    setEntries([newEntryWithId, ...entries]);
    setNewEntry({
      scripture: "",
      content: "",
      emotion: ""
    });
    
    toast({
      title: "Journal Entry Saved",
      description: "Your reflection has been saved successfully."
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-divine-800 mb-6">Prayer Journal</h1>
            
            <Card className="lectio-card mb-8">
              <CardHeader>
                <CardTitle className="text-xl font-serif font-semibold text-divine-800">
                  Write a New Reflection
                </CardTitle>
                <CardDescription className="text-divine-700">
                  Record your thoughts, prayers, and insights from your Lectio Divina practice.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="scripture" className="block text-sm font-medium text-divine-700 mb-1">
                        Scripture Reference
                      </label>
                      <Select onValueChange={(value) => setNewEntry({...newEntry, scripture: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select scripture" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Philippians 4:6-7">Philippians 4:6-7</SelectItem>
                          <SelectItem value="Psalm 23:1-3">Psalm 23:1-3</SelectItem>
                          <SelectItem value="Matthew 6:25-27">Matthew 6:25-27</SelectItem>
                          <SelectItem value="Isaiah 41:10">Isaiah 41:10</SelectItem>
                          <SelectItem value="Romans 8:38-39">Romans 8:38-39</SelectItem>
                          <SelectItem value="Other">Other Scripture</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label htmlFor="emotion" className="block text-sm font-medium text-divine-700 mb-1">
                        How do you feel?
                      </label>
                      <Select onValueChange={(value) => setNewEntry({...newEntry, emotion: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select emotion" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Peaceful">Peaceful</SelectItem>
                          <SelectItem value="Comforted">Comforted</SelectItem>
                          <SelectItem value="Inspired">Inspired</SelectItem>
                          <SelectItem value="Challenged">Challenged</SelectItem>
                          <SelectItem value="Confused">Confused</SelectItem>
                          <SelectItem value="Hopeful">Hopeful</SelectItem>
                          <SelectItem value="Grateful">Grateful</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="reflection" className="block text-sm font-medium text-divine-700 mb-1">
                      Your Reflection
                    </label>
                    <Textarea
                      id="reflection"
                      placeholder="Write your thoughts, prayers, or reflections here..."
                      className="min-h-[200px]"
                      value={newEntry.content}
                      onChange={(e) => setNewEntry({...newEntry, content: e.target.value})}
                    />
                  </div>
                  
                  <Button 
                    className="w-full bg-divine-500 hover:bg-divine-600 text-white"
                    onClick={handleSaveEntry}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Reflection
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <h2 className="text-2xl font-serif font-bold text-divine-800 mb-4">Past Reflections</h2>
            
            {entries.length > 0 ? (
              <div className="space-y-4">
                {entries.map((entry) => (
                  <Card key={entry.id} className="lectio-card">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-divine-500" />
                          <CardDescription className="text-divine-500">{entry.date}</CardDescription>
                        </div>
                        <span className="px-3 py-1 bg-divine-100 text-divine-700 text-xs rounded-full">
                          {entry.emotion}
                        </span>
                      </div>
                      <CardTitle className="text-lg font-medium text-divine-800">
                        {entry.scripture}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-divine-700">{entry.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="lectio-card text-center py-8">
                <CardContent>
                  <PlusCircle className="h-12 w-12 text-divine-300 mx-auto mb-4" />
                  <p className="text-divine-700 mb-2">No journal entries yet</p>
                  <p className="text-divine-500 text-sm">
                    Your reflections will appear here after you save them
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Journal;
