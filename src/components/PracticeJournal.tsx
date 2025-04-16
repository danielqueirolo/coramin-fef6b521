
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

interface PracticeJournalProps {
  step: string;
  scripture: string;
}

const PracticeJournal = ({ step, scripture }: PracticeJournalProps) => {
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState("");
  
  const stepTitle = step === "respond" ? "Prayer Response" : "Action Plan";
  const placeholder = step === "respond" 
    ? "Write your prayer and response to God here..."
    : "Write down how you plan to put this Scripture into action in your life...";
  
  const handleSave = () => {
    if (content.trim() === "") {
      toast({
        title: "Entry cannot be empty",
        description: "Please write something in your journal entry.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app with authentication, we would save to the user's account
    // For now, we'll just show a success message
    toast({
      title: "Journal Entry Saved",
      description: "Your reflection has been saved successfully."
    });
    
    // Clear the form after saving
    setContent("");
    setEmotion("");
  };
  
  return (
    <Card className="bg-divine-50 border border-divine-100">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-divine-800">{stepTitle}</h3>
          
          <div>
            <Select onValueChange={(value) => setEmotion(value)}>
              <SelectTrigger className="w-full sm:w-1/3">
                <SelectValue placeholder="How do you feel?" />
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
          
          <Textarea
            placeholder={placeholder}
            className="min-h-[150px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          
          <Button 
            className="w-full bg-divine-500 hover:bg-divine-600 text-white"
            onClick={handleSave}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Reflection
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PracticeJournal;
