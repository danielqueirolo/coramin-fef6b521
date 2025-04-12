
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

const FeatureCard = ({ title, description, icon: Icon }: FeatureCardProps) => {
  return (
    <Card className="lectio-card h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="bg-divine-100 p-2 rounded-full">
            <Icon className="h-5 w-5 text-divine-600" />
          </div>
          <CardTitle className="text-lg font-medium text-divine-800">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-divine-700">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
