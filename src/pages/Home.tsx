import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Award, BookOpen } from "lucide-react";
import bannerDeciImg from "@/assets/banner-deci.jpg";
import DonationModal from "@/components/DonationModal";

const Home = () => {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-[70vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bannerDeciImg})` }}
      >
        <div className="text-center text-white max-w-4xl px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Protéger les Droits des Enfants en Côte d'Ivoire
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Engagez-vous avec nous pour un avenir meilleur pour les enfants en Côte d'Ivoire
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg"
            onClick={() => setIsDonationModalOpen(true)}
          >
            Je fais un don
          </Button>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">25</div>
              <div className="text-lg text-foreground">Conseils Communaux d'Enfants</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary mb-2">5000+</div>
              <div className="text-lg text-foreground">Adolescents impliqués</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-humanitarian mb-2">20</div>
              <div className="text-lg text-foreground">Années d'expérience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Notre Mission
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              L'ONG DECI (Droits d'Enfants en Côte d'Ivoire) identifie, encadre, suit et évalue 
              les organisations de promotion des droits de l'enfant dirigées par les enfants 
              en Côte d'Ivoire.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Heart className="h-12 w-12 text-primary mb-4 mx-auto" />
                  <h3 className="font-semibold text-foreground">Protection</h3>
                </CardContent>
              </Card>
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Users className="h-12 w-12 text-secondary mb-4 mx-auto" />
                  <h3 className="font-semibold text-foreground">Participation</h3>
                </CardContent>
              </Card>
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Award className="h-12 w-12 text-humanitarian mb-4 mx-auto" />
                  <h3 className="font-semibold text-foreground">Reconnaissance</h3>
                </CardContent>
              </Card>
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <BookOpen className="h-12 w-12 text-primary mb-4 mx-auto" />
                  <h3 className="font-semibold text-foreground">Éducation</h3>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 bg-primary-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <blockquote className="text-xl md:text-2xl text-foreground mb-6 italic">
            "L'ONG DECI a transformé ma vie grâce à son engagement envers les enfants. 
            Aujourd'hui, je peux participer aux décisions qui concernent mon avenir."
          </blockquote>
          <cite className="text-lg font-semibold text-primary">
            — Djédjé Aurelia Esther, 16 ans
          </cite>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Rejoignez-nous dans notre mission
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Ensemble, nous pouvons faire la différence dans la vie des enfants en Côte d'Ivoire
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="px-8 py-3"
              onClick={() => setIsDonationModalOpen(true)}
            >
              Faire un don
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-3 bg-white/10 border-white text-white hover:bg-white hover:text-primary">
              Nous contacter
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