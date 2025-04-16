
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Note {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

export default function NotesList() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotes(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching notes",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const deleteNote = async (id: string) => {
    try {
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setNotes(notes.filter(note => note.id !== id));
      toast({
        title: "Note deleted",
        description: "Your note has been deleted successfully."
      });
    } catch (error: any) {
      toast({
        title: "Error deleting note",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <Card key={note.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-semibold">{note.title}</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteNote(note.id)}
              className="text-destructive hover:text-destructive/90"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground whitespace-pre-wrap">{note.content}</p>
            <p className="text-xs text-muted-foreground mt-2">
              {new Date(note.created_at).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      ))}
      {notes.length === 0 && (
        <Card>
          <CardContent className="text-center py-6 text-muted-foreground">
            No notes yet. Create your first note above!
          </CardContent>
        </Card>
      )}
    </div>
  );
}
