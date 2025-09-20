import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Eye, Heart, Users, Shield, BookOpen } from "lucide-react";

const Mission = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Mission & Vision
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez notre engagement pour les droits de l'enfant en Côte d'Ivoire
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <Card className="border-l-4 border-l-primary shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Target className="h-8 w-8 text-primary mr-3" />
                Notre Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed text-muted-foreground">
                L'ONG DECI a pour mission d'<strong>identifier, encadrer, suivre et évaluer</strong> 
                les organisations de promotion des droits de l'enfant dirigées par les enfants 
                en Côte d'Ivoire. Nous œuvrons pour que chaque enfant puisse faire entendre 
                sa voix et participer activement aux décisions qui concernent son avenir.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Vision Section */}
        <div className="mb-16">
          <Card className="border-l-4 border-l-secondary shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Eye className="h-8 w-8 text-secondary mr-3" />
                Notre Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Nous aspirons à <strong>contribuer à faire de la Côte d'Ivoire une nation</strong> 
                où la participation des enfants dans toutes les décisions qui les concernent 
                est une réalité. Un pays où chaque enfant grandit dans la dignité, 
                la sécurité et avec les opportunités de s'épanouir pleinement.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Nos Valeurs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="h-16 w-16 text-primary mx-auto mb-4" />
                <CardTitle className="text-xl">Protection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Nous protégeons les droits fondamentaux de chaque enfant 
                  et veillons à leur bien-être physique et psychologique.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-16 w-16 text-secondary mx-auto mb-4" />
                <CardTitle className="text-xl">Participation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Nous encourageons la participation active des enfants 
                  dans les processus décisionnels qui les concernent.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-16 w-16 text-humanitarian mx-auto mb-4" />
                <CardTitle className="text-xl">Intégrité</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Nous agissons avec transparence, honnêteté et 
                  responsabilité dans toutes nos actions.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <BookOpen className="h-16 w-16 text-primary mx-auto mb-4" />
                <CardTitle className="text-xl">Éducation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Nous promouvons l'éducation aux droits de l'enfant 
                  pour tous les acteurs de la société.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Target className="h-16 w-16 text-secondary mx-auto mb-4" />
                <CardTitle className="text-xl">Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Nous visons l'excellence dans tous nos programmes 
                  et activités de promotion des droits de l'enfant.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="h-16 w-16 text-humanitarian mx-auto mb-4" />
                <CardTitle className="text-xl">Solidarité</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Nous cultivons l'esprit de solidarité et d'entraide 
                  au service de l'enfance ivoirienne.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Impact Section */}
        <div className="bg-gradient-to-r from-primary-light to-secondary-light rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Notre Impact depuis 20 ans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">25</div>
              <div className="text-lg text-foreground">Conseils Communaux d'Enfants créés</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary mb-2">5000+</div>
              <div className="text-lg text-foreground">Enfants et adolescents accompagnés</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-humanitarian mb-2">100+</div>
              <div className="text-lg text-foreground">Projets réalisés</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mission;