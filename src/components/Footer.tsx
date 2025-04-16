
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-divine-50 border-t border-divine-100 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-divine-700">
              © {new Date().getFullYear()} Coramino
            </p>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-divine-700">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-divine-500 fill-divine-500" />
            <span>for spiritual growth</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
