import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import DonationModal from "@/components/DonationModal";
import logoDeciImg from "@/assets/logo-deci.jpg";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Accueil", path: "/" },
    { name: "Mission & Vision", path: "/mission" },
    { name: "Équipe", path: "/equipe" },
    { name: "Projets", path: "/projets" },
    { name: "Actions", path: "/actions" },
    { name: "Galerie", path: "/galerie" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-card/80 backdrop-blur-lg border-b border-border sticky top-0 z-50 shadow-lg hover-glow transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3 group hover-lift transition-all duration-300">
            <img 
              src={logoDeciImg} 
              alt="Logo ONG DECI" 
              className="h-12 w-12 rounded-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 hover-glow"
            />
            <div>
              <h1 className="text-xl font-bold text-primary group-hover:animate-text-shimmer transition-all duration-300">ONG DECI</h1>
              <p className="text-xs text-muted-foreground group-hover:text-primary/70 transition-colors duration-300">Droits d'Enfants en Côte d'Ivoire</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 rounded-md transition-all duration-300 hover-lift ${
                  isActive(item.path)
                    ? "text-primary font-bold bg-primary-light/20 animate-glow-pulse"
                    : "text-foreground hover:text-primary hover:bg-primary-light/10 hover:scale-105"
                } after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full`}
              >
                {item.name}
              </Link>
            ))}
            <Button 
              variant="default" 
              size="sm" 
              className="ml-4 hover-lift hover-glow animate-glow-pulse font-bold shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
              onClick={() => setIsDonationModalOpen(true)}
            >
              Je fais un don
            </Button>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card border-t border-border">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md transition-colors duration-200 ${
                    isActive(item.path)
                      ? "bg-primary-light text-primary font-medium"
                      : "text-foreground hover:bg-muted hover:text-primary"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                <Button 
                  variant="default" 
                  size="sm" 
                  className="w-full"
                  onClick={() => {
                    setIsDonationModalOpen(true);
                    setIsOpen(false);
                  }}
                >
                  Je fais un don
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <DonationModal 
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
      />
    </nav>
  );
};

export default Navigation;