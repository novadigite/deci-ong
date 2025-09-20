import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Twitter } from "lucide-react";

const Team = () => {
  const teamMembers = [
    {
      name: "Dr. Kouamé Marie-Claire",
      role: "Directrice Exécutive",
      description: "Spécialiste en droits de l'enfant avec plus de 15 ans d'expérience dans le secteur humanitaire.",
      image: "/api/placeholder/300/300",
    },
    {
      name: "Yao Benjamin",
      role: "Coordinateur des Programmes",
      description: "Expert en développement communautaire et protection de l'enfance en Côte d'Ivoire.",
      image: "/api/placeholder/300/300",
    },
    {
      name: "Adjoa Christine",
      role: "Responsable Formation",
      description: "Formatrice certifiée en droits de l'enfant et participation citoyenne des jeunes.",
      image: "/api/placeholder/300/300",
    },
    {
      name: "Kouassi Alain",
      role: "Chargé de Suivi-Évaluation",
      description: "Spécialiste en suivi-évaluation de projets sociaux et analyse d'impact.",
      image: "/api/placeholder/300/300",
    },
    {
      name: "Bamba Fatou",
      role: "Coordinatrice Régionale",
      description: "Experte en mobilisation communautaire et développement de partenariats locaux.",
      image: "/api/placeholder/300/300",
    },
    {
      name: "N'Guessan Paul",
      role: "Responsable Communication",
      description: "Journaliste et communicateur spécialisé dans les questions sociales et droits humains.",
      image: "/api/placeholder/300/300",
    },
  ];

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

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow group">
              <CardHeader className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-primary-light to-secondary-light rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-28 h-28 bg-muted rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                <p className="text-primary font-semibold">{member.role}</p>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">
                  {member.description}
                </p>
                <div className="flex justify-center space-x-3">
                  <Button variant="ghost" size="sm" className="p-2">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Twitter className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
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
            <Button size="lg" variant="default">
              Postuler
            </Button>
            <Button size="lg" variant="outline">
              Devenir bénévole
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;