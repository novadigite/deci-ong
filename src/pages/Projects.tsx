import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, Shield, Heart, Calendar, MapPin } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Conseils Communaux d'Enfants",
      description: "Création et accompagnement de 25 Conseils Communaux d'Enfants dans différentes régions de Côte d'Ivoire pour permettre aux enfants de participer aux décisions locales.",
      icon: Users,
      status: "En cours",
      beneficiaries: "2500+ enfants",
      location: "National",
      color: "primary"
    },
    {
      title: "Formation aux Droits de l'Enfant",
      description: "Programme de formation continue destiné aux leaders communautaires, enseignants et parents sur les droits fondamentaux de l'enfant.",
      icon: BookOpen,
      status: "Permanent",
      beneficiaries: "5000+ adultes",
      location: "Abidjan, Bouaké, San Pedro",
      color: "secondary"
    },
    {
      title: "Protection contre les Violences",
      description: "Initiative de prévention et de lutte contre toutes formes de violences faites aux enfants, incluant un système d'alerte et d'accompagnement.",
      icon: Shield,
      status: "En cours",
      beneficiaries: "1200+ enfants",
      location: "Zones rurales",
      color: "humanitarian"
    },
    {
      title: "Santé et Nutrition Infantile",
      description: "Programme de sensibilisation et d'accompagnement pour améliorer l'état nutritionnel et sanitaire des enfants en milieu rural.",
      icon: Heart,
      status: "En cours",
      beneficiaries: "800+ enfants",
      location: "Nord Côte d'Ivoire",
      color: "primary"
    },
    {
      title: "Éducation Inclusive",
      description: "Projet visant à garantir l'accès à une éducation de qualité pour tous les enfants, y compris ceux en situation de handicap.",
      icon: BookOpen,
      status: "Planifié",
      beneficiaries: "3000+ enfants",
      location: "National",
      color: "secondary"
    },
    {
      title: "Participation Citoyenne des Jeunes",
      description: "Formation de jeunes leaders pour qu'ils deviennent des ambassadeurs des droits de l'enfant dans leurs communautés.",
      icon: Users,
      status: "En cours",
      beneficiaries: "500+ jeunes",
      location: "Abidjan, Yamoussoukro",
      color: "humanitarian"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En cours": return "bg-secondary text-secondary-foreground";
      case "Permanent": return "bg-primary text-primary-foreground";
      case "Planifié": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Nos Projets
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez nos initiatives concrètes pour la protection et la promotion 
            des droits de l'enfant en Côte d'Ivoire
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {projects.map((project, index) => {
            const IconComponent = project.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-${project.color}-light`}>
                      <IconComponent className={`h-8 w-8 text-${project.color}`} />
                    </div>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    {project.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-2" />
                      {project.beneficiaries}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      {project.location}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="default" size="sm" className="flex-1">
                      En savoir plus
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Soutenir ce projet
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Statistics Section */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-8 text-white text-center mb-16">
          <h2 className="text-3xl font-bold mb-8">Impact de nos projets</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <div className="text-4xl font-bold mb-2">25</div>
              <div className="text-lg">Conseils d'Enfants</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">12,000+</div>
              <div className="text-lg">Bénéficiaires directs</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-lg">Communautés touchées</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">20</div>
              <div className="text-lg">Années d'expérience</div>
            </div>
          </div>
        </div>

        {/* Partnership Section */}
        <div className="bg-muted rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Partenaires et Donateurs
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Nos projets sont rendus possibles grâce au soutien de nos partenaires 
            institutionnels, organisations internationales et donateurs privés.
          </p>
          <Button size="lg" variant="default">
            Devenir partenaire
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Projects;