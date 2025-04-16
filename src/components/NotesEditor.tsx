
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save } from 'lucide-react';

export default function NotesEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { user } = useAuth();

  const handleSave = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save notes.",
        variant: "destructive"
      });
      return;
    }

    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your note.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase.from('notes').insert({
        title,
        content,
        user_id: user.id
      });

      if (error) throw error;

      toast({
        title: "Note saved",
        description: "Your note has been saved successfully."
      });

      setTitle('');
      setContent('');
    } catch (error: any) {
      toast({
        title: "Error saving note",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Note</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Input
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-4"
          />
          <Textarea
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[200px]"
          />
        </div>
        <Button onClick={handleSave} className="w-full">
          <Save className="mr-2 h-4 w-4" />
          Save Note
        </Button>
      </CardContent>
    </Card>
  );
}
