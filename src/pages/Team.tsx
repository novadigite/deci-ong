import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import martialTohaImage from "@/assets/martial-toha.webp";

const Team = () => {
  const { toast } = useToast();

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Notre Équipe
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Une équipe expérimentée et passionnée, engagée pour la protection 
            et la promotion des droits de l'enfant en Côte d'Ivoire
          </p>
        </div>

        {/* President Fondateur Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Président Fondateur
            </h2>
          </div>
          
          <Card className="max-w-4xl mx-auto border-l-4 border-l-primary shadow-xl">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Photo */}
                <div className="flex-shrink-0 mx-auto lg:mx-0">
                  <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
                    <img 
                      src={martialTohaImage} 
                      alt="Martial Toha - Président Fondateur ONG DECI" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <div className="text-center lg:text-left mb-6">
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      MARTIAL TOHA
                    </h3>
                    <p className="text-primary font-semibold text-lg mb-1">
                      Président du Conseil d'Administration (PCA)
                    </p>
                    <p className="text-secondary font-medium">
                      Fondateur de l'ONG DECI
                    </p>
                    <p className="text-muted-foreground mt-2">
                      Âgé de 43 ans - Enseignant et militant engagé
                    </p>
                  </div>

                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      <strong>MARTIAL TOHA</strong> est un enseignant de formation et un militant engagé 
                      dans la défense des droits de l'enfant depuis plus de deux décennies.
                    </p>
                    
                    <p>
                      Son engagement débute très jeune, à 16 ans, comme bénévole à la Croix-Rouge, 
                      où il découvre sa vocation pour l'action humanitaire. En 2002, il fonde l'ONG DECI, 
                      convaincu que les enfants et les jeunes doivent participer activement aux décisions 
                      qui les concernent, conformément à l'article 12 de la Convention relative aux droits 
                      de l'enfant des Nations Unies.
                    </p>

                    <p>
                      Pour Monsieur Toha, informer, éduquer et responsabiliser la jeunesse est une priorité 
                      nationale. Il milite pour que chaque adolescent en Côte d'Ivoire connaisse ses droits 
                      et ses devoirs, et devienne un acteur du changement social dès aujourd'hui.
                    </p>
                  </div>

                  <div className="mt-8 p-6 bg-gradient-to-r from-primary-light to-secondary-light rounded-lg">
                    <h4 className="font-bold text-foreground mb-4 flex items-center">
                      <Award className="h-5 w-5 text-primary mr-2" />
                      Sous son leadership :
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary mb-1">120+</div>
                        <div className="text-sm text-foreground">Clubs scolaires et conseils communaux créés</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-secondary mb-1">25</div>
                        <div className="text-sm text-foreground">Communes d'intervention</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-humanitarian mb-1">12K+</div>
                        <div className="text-sm text-foreground">Jeunes et adolescents mobilisés</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-6 bg-muted/50 rounded-lg">
                    <div className="mb-4">
                      <h4 className="font-bold text-foreground mb-2 flex items-center">
                        <Target className="h-5 w-5 text-secondary mr-2" />
                        Objectifs de DECI :
                      </h4>
                      <ul className="text-muted-foreground space-y-1">
                        <li>➡️ Promotion des droits de l'enfant</li>
                        <li>➡️ Éducation à la citoyenneté</li>
                        <li>➡️ Développement des Compétences de Vie Courante</li>
                      </ul>
                    </div>
                    
                    <blockquote className="border-l-4 border-primary pl-4 italic text-foreground mt-4">
                      « Mon salaire, c'est le changement que je vois dans les yeux des jeunes que nous accompagnons. »
                    </blockquote>
                    <cite className="text-sm text-muted-foreground mt-2 block">
                      - M. MARTIAL TOHA
                    </cite>
                  </div>

                  <p className="mt-4 text-sm text-muted-foreground">
                    En tant que membre du Forum des ONG, il collabore étroitement avec l'UNICEF 
                    et d'autres partenaires stratégiques. Monsieur Toha travaille bénévolement 
                    et croit en une ONG capable de mobiliser des ressources durables, non pour 
                    le profit, mais pour le développement des enfants et des communautés.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>


        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary-light to-secondary-light rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Rejoignez notre équipe
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Vous partagez notre passion pour les droits de l'enfant ? 
            Découvrez nos opportunités de carrière et de bénévolat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="default" asChild>
              <Link to="/contact">
                Formulaire de contact
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => {
                toast({
                  title: "Merci de votre intérêt !",
                  description: "Pour devenir bénévole, veuillez nous contacter via notre formulaire de contact.",
                });
              }}
            >
              Devenir bénévole
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;