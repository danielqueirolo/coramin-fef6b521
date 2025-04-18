
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Settings, ShoppingBag, HeartHandshake } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const tabs = [
    { name: "Home", icon: <Home size={24} />, path: "/dashboard" },
    { name: "Meditate", icon: <HeartHandshake size={24} />, path: "/meditation" },
    { name: "History", icon: <BookOpen size={24} />, path: "/history" },
    { name: "Store", icon: <ShoppingBag size={24} />, path: "/store" },
    { name: "Settings", icon: <Settings size={24} />, path: "/settings" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50">
      <div className="flex justify-around items-center py-2">
        {tabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            className={`flex flex-col items-center py-2 px-4 ${
              activeTab === tab.path
                ? "text-blue-600"
                : "text-slate-500 hover:text-slate-700"
            }`}
            onClick={() => setActiveTab(tab.path)}
          >
            {tab.icon}
            <span className="text-xs mt-1">{tab.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Header;
