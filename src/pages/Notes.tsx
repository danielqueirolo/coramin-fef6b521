
import Layout from "@/components/Layout";
import NotesEditor from "@/components/NotesEditor";
import NotesList from "@/components/NotesList";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function Notes() {
  const { user, loading } = useAuth();

  if (loading) {
    return null; // Or a loading spinner
  }

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">My Notes</h1>
        <div className="space-y-8">
          <NotesEditor />
          <NotesList />
        </div>
      </div>
    </Layout>
  );
}
