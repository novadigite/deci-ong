import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Heart, Users, BookOpen, Shield, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import DonationModal from "@/components/DonationModal";

const Actions = () => {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    message: ""
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    toast({
      title: "Message envoyé !",
      description: "Nous avons bien reçu votre message et vous recontacterons bientôt.",
    });
    
    // Reset form
    setFormData({
      firstName: "",
      email: "",
      message: ""
    });
  };

  const actions = [
    {
      title: "Actions ONG",
      description: "Découvrez les projets menés par l'ONG Deci pour aider.",
      icon: BookOpen,
      color: "primary",
      action: "Découvrir",
      link: "/projets"
    },
    {
      title: "Projets ONG",
      description: "Soutenez nos initiatives pour un changement positif durable.",
      icon: Heart,
      color: "secondary",
      action: "Soutenir",
      onClick: () => setIsDonationModalOpen(true)
    },
    {
      title: "Impact Social",
      description: "Participez à nos actions pour améliorer la vie communautaire.",
      icon: Users,
      color: "humanitarian",
      action: "Agir",
      link: "/contact"
    }
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Actions de l'ONG
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez nos initiatives et engagements pour un impact positif dans la communauté avec l'ONG Deci.
          </p>
        </div>

        {/* Notre engagement section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Notre engagement pour un avenir meilleur
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Nous sommes une ONG dédiée à l'action sociale et à l'amélioration des conditions de vie. 
                Découvrez nos initiatives et rejoignez-nous pour faire une différence significative.
              </p>
              <div className="bg-muted rounded-lg p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Un impact positif sur la communauté
                </h3>
                <div className="flex items-center space-x-4">
                  <Badge className="px-3 py-1 bg-primary/10 text-primary border-primary/20">
                    Communauté
                  </Badge>
                  <Badge className="px-3 py-1 bg-secondary/10 text-secondary border-secondary/20">
                    Agir
                  </Badge>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-primary/5 rounded-lg p-4 text-center">
                  <Heart className="h-12 w-12 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium">Action Humanitaire</p>
                </div>
                <div className="bg-secondary/5 rounded-lg p-4 text-center">
                  <Users className="h-12 w-12 text-secondary mx-auto mb-2" />
                  <p className="text-sm font-medium">Développement Social</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-humanitarian/5 rounded-lg p-4 text-center">
                  <Shield className="h-12 w-12 text-humanitarian mx-auto mb-2" />
                  <p className="text-sm font-medium">Protection des Droits</p>
                </div>
                <div className="bg-primary/5 rounded-lg p-4 text-center">
                  <BookOpen className="h-12 w-12 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium">Éducation</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Actions Grid */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {actions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow group">
                  <CardHeader className="text-center pb-4">
                    <div className={`inline-flex p-4 rounded-full bg-${action.color}/10 mb-4`}>
                      <IconComponent className={`h-8 w-8 text-${action.color}`} />
                    </div>
                    <CardTitle className="text-xl">{action.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground mb-6">
                      {action.description}
                    </p>
                    {action.link ? (
                      <Button 
                        variant="outline" 
                        className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                        asChild
                      >
                        <Link to={action.link}>
                          {action.action}
                        </Link>
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                        onClick={action.onClick}
                      >
                        {action.action}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-muted rounded-xl p-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Contactez-nous
              </h2>
              <p className="text-lg text-muted-foreground">
                Pour toute question sur les actions de l'ONG Deci.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="firstName">Votre prénom s'il vous plaît</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Votre adresse e-mail*</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="message">Votre message ou question*</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button type="submit" className="flex-1">
                  Envoyer le message
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setIsDonationModalOpen(true)}
                >
                  Faire un don
                </Button>
              </div>
            </form>
          </div>
        </section>
      </div>

      {/* Donation Modal */}
      <DonationModal 
        isOpen={isDonationModalOpen} 
        onClose={() => setIsDonationModalOpen(false)} 
      />
    </div>
  );
};

export default Actions;