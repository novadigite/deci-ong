import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Eye, Heart, Users, Shield, BookOpen, MapPin, UserCheck, Music } from "lucide-react";

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

        {/* Présentation de l'ONG */}
        <div className="mb-16">
          <Card className="border-l-4 border-l-primary shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">
                Présentation de l'ONG DECI
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed text-muted-foreground mb-4">
                L'ONG <strong>Droits d'Enfants en Côte d'Ivoire (DECI)</strong> est une organisation non gouvernementale, apolitique et laïque. 
                Créée en Septembre 2000, elle a été déclarée au ministère de l'intérieur le 28 Juillet 2003 sous le numéro 730 
                et a reçu son autorisation de déclaration le 29 Avril 2021 sous le numéro 0452/MIS/DCAT/DAG/SDVA.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Informations générales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <MapPin className="h-6 w-6 text-primary mr-3" />
                Siège Social
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Elle est située à Yopougon Ananeraie
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Target className="h-6 w-6 text-secondary mr-3" />
                Zone d'intervention
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Elle intervient en milieu scolaire et communautaire en Côte d'Ivoire
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Users className="h-6 w-6 text-humanitarian mr-3" />
                Bénéficiaires Direct
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Les bénéficiaires directs de ses activités sont les personnes de moins de 18 ans
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <UserCheck className="h-6 w-6 text-primary mr-3" />
                Exécutants
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Les activités de DECI sont exécutées par des personnes de tous âges ayant pour priorité le bien-être de l'enfant.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Canaux de Participation */}
        <div className="mb-16">
          <Card className="border-l-4 border-l-secondary shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Music className="h-8 w-8 text-secondary mr-3" />
                Canaux de Participation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Les moins de 18 ans se regroupent au sein des <strong>clubs d'Education aux Droits de l'Homme, 
                de l'Enfant et la Citoyenneté en milieu scolaire (Club EDHC)</strong> et les <strong>Conseils Communaux 
                d'Enfants (CCE)</strong> dans la commune pour promouvoir les droits de l'homme, de l'Enfant et la Citoyenneté. 
                La musique, le théâtre, le dessin, les causeries de groupes et bien d'autres canaux d'expressions sont utilisés 
                par les enfants et adolescents.
              </p>
            </CardContent>
          </Card>
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
                Nous rêvons d'une <strong>Côte d'Ivoire où les enfants, adolescents et jeunes volontaires 
                sont soutenus et participent pleinement aux actions citoyennes.</strong>
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