
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const FeedbackButton = () => {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !feedback.trim()) {
      toast({
        title: "Please fill all fields",
        description: "Email and feedback message are required.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you would send this to your backend
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your valuable feedback!",
    });
    
    // Reset form and close dialog
    setEmail("");
    setFeedback("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="fixed bottom-6 right-6 rounded-full shadow-md border-divine-300 bg-white hover:bg-divine-50 z-50"
        >
          <MessageSquare className="h-4 w-4 text-divine-700 mr-2" />
          <span className="text-divine-700">Feedback</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send Feedback</DialogTitle>
          <DialogDescription>
            We value your thoughts on how to improve Coramino. Your feedback helps us grow.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
                placeholder="your@email.com"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="feedback" className="text-right">
                Feedback
              </Label>
              <Textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="col-span-3"
                placeholder="Your thoughts and suggestions..."
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="submit" 
              className="bg-divine-500 hover:bg-divine-600 text-white"
            >
              Send feedback
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackButton;
