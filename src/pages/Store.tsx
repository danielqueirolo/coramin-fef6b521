
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import { ExternalLink, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

// Mock product data - this would come from a database in a real app
const products = [
  {
    id: 1,
    name: "Wooden Rosary",
    price: 24.99,
    image: "https://placehold.co/300x200/e6e6e6/4688f0?text=Rosary",
    description: "Handcrafted wooden rosary beads with a metal crucifix.",
    url: "https://example.com/product/1"
  },
  {
    id: 2,
    name: "Lectio Divina Journal",
    price: 18.50,
    image: "https://placehold.co/300x200/e6e6e6/4688f0?text=Journal",
    description: "Premium journal with guided Lectio Divina prompts and scripture passages.",
    url: "https://example.com/product/2"
  },
  {
    id: 3,
    name: "Biblical Essential Oils",
    price: 32.99,
    image: "https://placehold.co/300x200/e6e6e6/4688f0?text=Oils",
    description: "Set of 3 essential oils mentioned in the Bible - Frankincense, Myrrh, and Cedarwood.",
    url: "https://example.com/product/3"
  },
  {
    id: 4,
    name: "Christian Meditation Candle",
    price: 15.99,
    image: "https://placehold.co/300x200/e6e6e6/4688f0?text=Candle",
    description: "Hand-poured prayer candle with calming scent of lavender and sage.",
    url: "https://example.com/product/4"
  }
];

const Store = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  const handleExternalLink = (url: string) => {
    window.open(url, "_blank");
    toast("Visiting external site", {
      description: "You are now being redirected to an external website."
    });
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <div className="bg-blue-600 text-white p-6">
        <h1 className="text-2xl font-semibold">Christian Store</h1>
        <p className="opacity-90">Products to enhance your spiritual journey</p>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="border-none shadow-sm overflow-hidden">
            <div className="h-48 bg-slate-200">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-slate-900">{product.name}</h3>
                <span className="font-semibold text-blue-600">${product.price}</span>
              </div>
              
              <p className="text-sm text-slate-600 mb-4">
                {product.description}
              </p>
              
              <Button 
                onClick={() => handleExternalLink(product.url)}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <ExternalLink className="h-4 w-4" />
                View Product
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Header />
    </div>
  );
};

export default Store;
