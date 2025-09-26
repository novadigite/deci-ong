import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Award, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import bannerDeciImg from "@/assets/banner-deci.jpg";
import DonationModal from "@/components/DonationModal";

const Home = () => {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-[70vh] flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden animate-gradient-shift"
        style={{ 
          backgroundImage: `linear-gradient(135deg, rgba(24, 95, 53, 0.7), rgba(24, 95, 53, 0.5), rgba(142, 69, 38, 0.7)), url(${bannerDeciImg})`,
          backgroundSize: '200% 200%'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"></div>
        <div className="text-center text-white max-w-4xl px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up animate-text-shimmer">
            Protéger les Droits des Enfants en Côte d'Ivoire
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-slide-up delay-200">
            Engagez-vous avec nous pour un avenir meilleur pour les enfants en Côte d'Ivoire
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg animate-bounce-in delay-400 hover-lift hover-glow transition-all duration-300"
            onClick={() => setIsDonationModalOpen(true)}
          >
            Je fais un don
          </Button>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-16 bg-gradient-to-br from-muted via-background to-muted relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(24,95,53,0.1),transparent_50%)] animate-pulse"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-slide-in-left delay-100 hover-lift">
              <div className="text-5xl md:text-6xl font-bold text-primary mb-2 animate-scale-pulse">25</div>
              <div className="text-lg text-foreground font-medium">Conseils Communaux d'Enfants</div>
            </div>
            <div className="animate-slide-up delay-200 hover-lift">
              <div className="text-5xl md:text-6xl font-bold text-secondary mb-2 animate-scale-pulse delay-100">5000+</div>
              <div className="text-lg text-foreground font-medium">Adolescents impliqués</div>
            </div>
            <div className="animate-slide-in-right delay-300 hover-lift">
              <div className="text-5xl md:text-6xl font-bold text-humanitarian mb-2 animate-scale-pulse delay-200">20</div>
              <div className="text-lg text-foreground font-medium">Années d'expérience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-light/20 via-transparent to-secondary-light/20 animate-gradient-shift"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 animate-slide-up animate-text-shimmer">
              Notre Mission
            </h2>
            <p className="text-xl text-muted-foreground mb-12 animate-slide-up delay-200 leading-relaxed">
              L'ONG DECI (Droits d'Enfants en Côte d'Ivoire) identifie, encadre, suit et évalue 
              les organisations de promotion des droits de l'enfant dirigées par les enfants 
              en Côte d'Ivoire.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <Card className="group hover-lift hover-glow animate-bounce-in delay-100 bg-gradient-to-br from-card to-card/80 border-2 border-transparent hover:border-primary/20 transition-all duration-500">
                <CardContent className="pt-8 pb-6">
                  <Heart className="h-16 w-16 text-primary mb-6 mx-auto animate-float group-hover:animate-rotate-slow transition-all duration-300" />
                  <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">Protection</h3>
                </CardContent>
              </Card>
              <Card className="group hover-lift hover-glow animate-bounce-in delay-200 bg-gradient-to-br from-card to-card/80 border-2 border-transparent hover:border-secondary/20 transition-all duration-500">
                <CardContent className="pt-8 pb-6">
                  <Users className="h-16 w-16 text-secondary mb-6 mx-auto animate-float delay-100 group-hover:animate-rotate-slow transition-all duration-300" />
                  <h3 className="font-bold text-lg text-foreground group-hover:text-secondary transition-colors">Participation</h3>
                </CardContent>
              </Card>
              <Card className="group hover-lift hover-glow animate-bounce-in delay-300 bg-gradient-to-br from-card to-card/80 border-2 border-transparent hover:border-humanitarian/20 transition-all duration-500">
                <CardContent className="pt-8 pb-6">
                  <Award className="h-16 w-16 text-humanitarian mb-6 mx-auto animate-float delay-200 group-hover:animate-rotate-slow transition-all duration-300" />
                  <h3 className="font-bold text-lg text-foreground group-hover:text-humanitarian transition-colors">Reconnaissance</h3>
                </CardContent>
              </Card>
              <Card className="group hover-lift hover-glow animate-bounce-in delay-400 bg-gradient-to-br from-card to-card/80 border-2 border-transparent hover:border-primary/20 transition-all duration-500">
                <CardContent className="pt-8 pb-6">
                  <BookOpen className="h-16 w-16 text-primary mb-6 mx-auto animate-float delay-300 group-hover:animate-rotate-slow transition-all duration-300" />
                  <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">Éducation</h3>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-gradient-to-br from-primary-light via-primary-light/80 to-secondary-light/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(142,69,38,0.15),transparent_60%)] animate-pulse"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="glass-effect rounded-2xl p-8 md:p-12 hover-lift">
            <div className="text-6xl text-primary/20 mb-4 animate-float">"</div>
            <blockquote className="text-2xl md:text-3xl text-foreground mb-8 italic animate-slide-up leading-relaxed font-light">
              L'ONG DECI a transformé ma vie grâce à son engagement envers les enfants. 
              Aujourd'hui, je peux participer aux décisions qui concernent mon avenir.
            </blockquote>
            <cite className="text-xl font-bold text-primary animate-slide-up delay-200 block">
              — Djédjé Aurelia Esther, 16 ans
            </cite>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary/90 to-secondary relative overflow-hidden animate-gradient-shift">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute top-32 right-20 w-12 h-12 bg-white/5 rounded-full animate-float delay-200"></div>
          <div className="absolute bottom-20 left-1/3 w-16 h-16 bg-white/8 rounded-full animate-float delay-400"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 animate-slide-up animate-text-shimmer">
            Rejoignez-nous dans notre mission
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-12 animate-slide-up delay-200 leading-relaxed">
            Ensemble, nous pouvons faire la différence dans la vie des enfants en Côte d'Ivoire
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="px-10 py-4 text-lg font-semibold animate-bounce-in delay-300 hover-lift hover-glow shadow-lg"
              onClick={() => setIsDonationModalOpen(true)}
            >
              Faire un don
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-10 py-4 text-lg font-semibold bg-white/10 border-2 border-white text-white hover:bg-white hover:text-primary animate-bounce-in delay-400 hover-lift transition-all duration-300 backdrop-blur-sm"
              asChild
            >
              <Link to="/contact">
                Nous contacter
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Donation Modal */}
      <DonationModal 
        isOpen={isDonationModalOpen} 
        onClose={() => setIsDonationModalOpen(false)} 
      />
    </div>
  );
};

export default Home;