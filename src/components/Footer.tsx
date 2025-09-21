import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import logoDeciImg from "@/assets/logo-deci.jpg";
import { useState } from "react";
import DonationModal from "./DonationModal";

const Footer = () => {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src={logoDeciImg} 
                alt="Logo ONG DECI" 
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-bold text-primary">ONG DECI</h3>
                <p className="text-sm text-muted">Droits d'Enfants en Côte d'Ivoire</p>
              </div>
            </div>
            <p className="text-muted mb-6 max-w-md">
              Engagez-vous avec nous pour un avenir meilleur pour les enfants en Côte d'Ivoire. 
              Ensemble, protégeons et promouvons les droits de l'enfant.
            </p>
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => setIsDonationModalOpen(true)}
            >
              Faire un don maintenant
            </Button>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-background">Liens rapides</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted hover:text-primary transition-colors">Accueil</Link></li>
              <li><Link to="/mission" className="text-muted hover:text-primary transition-colors">Mission & Vision</Link></li>
              <li><Link to="/equipe" className="text-muted hover:text-primary transition-colors">Notre Équipe</Link></li>
              <li><Link to="/projets" className="text-muted hover:text-primary transition-colors">Nos Projets</Link></li>
              <li><Link to="/contact" className="text-muted hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/mentions-legales" className="text-muted hover:text-primary transition-colors">Mentions légales</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-background">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <span className="text-muted text-sm">
                  Yopougon-Ananeraie<br />
                  Abidjan, Côte d'Ivoire
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-muted text-sm">+225 07 48 43 00 97</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-muted text-sm">contact@ongdeci.com</span>
              </div>
            </div>
            
            {/* Social Media */}
            <div className="flex space-x-4 mt-6">
              <a 
                href="https://web.facebook.com/ONGDECI?_rdc=1&_rdr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted hover:text-primary transition-colors"
                aria-label="Suivez-nous sur Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://www.instagram.com/ong_deci/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted hover:text-primary transition-colors"
                aria-label="Suivez-nous sur Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://www.youtube.com/@ongdeci2915" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted hover:text-primary transition-colors"
                aria-label="Suivez-nous sur YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a 
                href="https://www.tiktok.com/@ong.deci" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted hover:text-primary transition-colors"
                aria-label="Suivez-nous sur TikTok"
              >
                <FaTiktok className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-muted">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted text-sm">
              © 2024 ONG DECI. Tous droits réservés.
            </p>
            <p className="text-muted text-sm mt-2 md:mt-0">
              Organisation Non Gouvernementale • Côte d'Ivoire
            </p>
          </div>
        </div>
      </div>
      
      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
      />
    </footer>
  );
};

export default Footer;