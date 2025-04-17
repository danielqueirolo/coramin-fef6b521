
import { Link } from "react-router-dom";
import { Book, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-divine-100">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Book className="h-6 w-6 text-divine-600" />
          <span className="font-serif text-xl font-semibold text-divine-800">Coramin</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-divine-700 hover:text-divine-900 transition-colors font-medium">
            Home
          </Link>
          <Link to="/daily" className="text-divine-700 hover:text-divine-900 transition-colors font-medium">
            Daily Reading
          </Link>
          <Link to="/journal" className="text-divine-700 hover:text-divine-900 transition-colors font-medium">
            Journal
          </Link>
          <Link to="/library" className="text-divine-700 hover:text-divine-900 transition-colors font-medium">
            Library
          </Link>
          <Link to="/about" className="text-divine-700 hover:text-divine-900 transition-colors font-medium">
            About
          </Link>

          {user ? (
            <Button 
              variant="outline" 
              onClick={signOut}
              className="text-divine-700 hover:text-divine-900"
            >
              Sign Out
            </Button>
          ) : (
            <Link to="/auth">
              <Button 
                variant="outline"
                className="text-divine-700 hover:text-divine-900"
              >
                Sign In
              </Button>
            </Link>
          )}
        </nav>

        <Button 
          variant="ghost" 
          size="sm" 
          className="md:hidden text-divine-700"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-divine-100 animate-fade-in">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link to="/" className="text-divine-700 hover:text-divine-900 transition-colors font-medium py-2">
              Home
            </Link>
            <Link to="/daily" className="text-divine-700 hover:text-divine-900 transition-colors font-medium py-2">
              Daily Reading
            </Link>
            <Link to="/journal" className="text-divine-700 hover:text-divine-900 transition-colors font-medium py-2">
              Journal
            </Link>
            <Link to="/library" className="text-divine-700 hover:text-divine-900 transition-colors font-medium py-2">
              Library
            </Link>
            <Link to="/about" className="text-divine-700 hover:text-divine-900 transition-colors font-medium py-2">
              About
            </Link>

            {user ? (
              <Button 
                variant="outline" 
                onClick={signOut}
                className="text-divine-700 hover:text-divine-900 w-full"
              >
                Sign Out
              </Button>
            ) : (
              <Link to="/auth" className="w-full">
                <Button 
                  variant="outline"
                  className="text-divine-700 hover:text-divine-900 w-full"
                >
                  Sign In
                </Button>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
