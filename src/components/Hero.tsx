
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-b from-divine-50 to-white pt-16 pb-20 lg:pt-24 lg:pb-28">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-divine-900 mb-6 leading-tight">
            <span className="text-divine-700">Grow</span> Closer to God Through Ancient Prayer
          </h1>
          <p className="text-lg md:text-xl text-divine-700 mb-8">
            Experience the transformative power of Lectio Divina with Coramino - a sacred way to read, 
            reflect, and respond to Scripture designed for your spiritual journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/daily">
              <Button className="divine-button w-full sm:w-auto">
                Today's Reading
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/practice">
              <Button variant="outline" className="w-full sm:w-auto border-divine-300 text-divine-700 hover:bg-divine-50">
                How It Works
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
