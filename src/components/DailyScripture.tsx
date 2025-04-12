
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface DailyScriptureProps {
  passage: {
    reference: string;
    text: string;
    theme: string;
  };
}

const DailyScripture = ({ passage }: DailyScriptureProps) => {
  return (
    <Card className="lectio-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-divine-500" />
            <CardTitle className="text-lg font-medium text-divine-800">Today's Scripture</CardTitle>
          </div>
          <span className="px-3 py-1 bg-divine-100 text-divine-700 text-xs rounded-full">{passage.theme}</span>
        </div>
        <CardDescription className="text-divine-700 font-medium">{passage.reference}</CardDescription>
      </CardHeader>
      <CardContent>
        <blockquote className="border-l-4 border-divine-300 pl-4 my-4 italic text-divine-700">
          "{passage.text}"
        </blockquote>
        <Link to="/practice">
          <Button className="w-full mt-2 bg-divine-500 hover:bg-divine-600 text-white">
            Begin Meditation
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default DailyScripture;
