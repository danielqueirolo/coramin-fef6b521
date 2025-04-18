
import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Clock, ShoppingBag, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  // Don't show header on these routes
  if (['/onboarding', '/auth'].includes(location.pathname)) {
    return null;
  }

  // Only show header for authenticated users
  if (!user) {
    return null;
  }

  return (
    <header className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50">
      <nav className="flex justify-around items-center py-3">
        <NavItem 
          to="/dashboard" 
          icon={<Home className="w-6 h-6" />} 
          label="Home" 
          isActive={location.pathname === '/dashboard'} 
        />
        <NavItem 
          to="/meditation" 
          icon={<BookOpen className="w-6 h-6" />} 
          label="Meditate" 
          isActive={location.pathname === '/meditation'} 
        />
        <NavItem 
          to="/history" 
          icon={<Clock className="w-6 h-6" />} 
          label="History" 
          isActive={location.pathname === '/history'} 
        />
        <NavItem 
          to="/store" 
          icon={<ShoppingBag className="w-6 h-6" />} 
          label="Store" 
          isActive={location.pathname === '/store'} 
        />
        <NavItem 
          to="/settings" 
          icon={<Settings className="w-6 h-6" />} 
          label="Settings" 
          isActive={location.pathname === '/settings'} 
        />
      </nav>
    </header>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem = ({ to, icon, label, isActive }: NavItemProps) => {
  return (
    <Link to={to} className="flex flex-col items-center">
      <div className={cn(
        "p-1.5 rounded-full transition-colors",
        isActive ? "text-blue-600" : "text-slate-500"
      )}>
        {icon}
      </div>
      <span className={cn(
        "text-xs mt-1 font-medium",
        isActive ? "text-blue-600" : "text-slate-500"
      )}>
        {label}
      </span>
    </Link>
  );
};

export default Header;
