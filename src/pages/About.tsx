
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book } from "lucide-react";

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-divine-800 mb-6">About Lectio Divina</h1>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-divine-800">A Sacred Journey Through Scripture</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-divine-700">
              <p>
                Lectio Divina, Latin for "Divine Reading," is an ancient practice of scriptural reading, 
                meditation and prayer intended to promote communion with God. It treats Scripture as the 
                Living Word of God.
              </p>
              <p>
                The practice dates back to the early centuries of Christian monasticism, and was formalized 
                as a four-step process by the Benedictine monk Guigo II in the 12th century. Today, many practitioners
                add the steps of Preparation (Statio) before beginning and Action (Actio) at the end.
              </p>
              <p>
                Unlike regular Bible study where we analyze text for information, Lectio Divina invites us 
                to sit with Scripture and listen deeply to what God might be saying to us personally through 
                the text.
              </p>
              <p>
                This contemplative practice transforms our relationship with Scripture from merely reading words 
                to encountering the living God who speaks to us directly through these sacred texts.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-divine-50 mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <Book className="h-16 w-16 text-divine-600" />
                </div>
                <div className="flex-grow space-y-3">
                  <h2 className="text-xl font-serif font-bold text-divine-800">Discover More About Lectio Divina</h2>
                  <p className="text-divine-700">
                    Deepen your understanding of this ancient practice with our comprehensive guide to Lectio Divina.
                    Learn the historical context, practical applications, and transformative power of this sacred reading method.
                  </p>
                  <Button 
                    className="bg-divine-600 hover:bg-divine-700"
                    onClick={() => window.open("https://a.co/d/h7bTrrL", "_blank")}
                  >
                    <Book className="mr-2 h-4 w-4" />
                    Get the Book
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default About;
