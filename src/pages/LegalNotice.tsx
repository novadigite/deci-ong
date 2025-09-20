import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Scale, FileText, Shield } from "lucide-react";

const LegalNotice = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Mentions Légales
          </h1>
          <p className="text-xl text-muted-foreground">
            Informations légales et réglementaires de l'ONG DECI
          </p>
        </div>

        <div className="space-y-8">
          {/* Organization Status */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Building className="h-6 w-6 text-primary mr-3" />
                Statut Juridique
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Dénomination sociale</h3>
                <p className="text-muted-foreground">
                  Organisation Non Gouvernementale DECI<br />
                  (Droits d'Enfants en Côte d'Ivoire)
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">Statut juridique</h3>
                <p className="text-muted-foreground">
                  Organisation Non Gouvernementale (ONG)<br />
                  Enregistrée en République de Côte d'Ivoire
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">Siège social</h3>
                <p className="text-muted-foreground">
                  Yopougon-Ananeraie<br />
                  Abidjan, Côte d'Ivoire
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">Année de création</h3>
                <p className="text-muted-foreground">2004 (20 ans d'expérience)</p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <FileText className="h-6 w-6 text-secondary mr-3" />
                Coordonnées Officielles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Adresse postale</h3>
                <p className="text-muted-foreground">
                  ONG DECI<br />
                  Yopougon-Ananeraie<br />
                  Abidjan, Côte d'Ivoire
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">Téléphone</h3>
                <p className="text-muted-foreground">+225 07 48 43 00 97</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">Adresses électroniques</h3>
                <p className="text-muted-foreground">
                  contact@ongdeci.com<br />
                  ongdeci@yahoo.fr
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">Site web</h3>
                <p className="text-muted-foreground">ongdeci.com</p>
              </div>
            </CardContent>
          </Card>

          {/* Mission and Objectives */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Scale className="h-6 w-6 text-humanitarian mr-3" />
                Mission et Objectifs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Mission principale</h3>
                <p className="text-muted-foreground">
                  Identifier, encadrer, suivre et évaluer les organisations de promotion 
                  des droits de l'enfant dirigées par les enfants en Côte d'Ivoire.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">Objectifs</h3>
                <ul className="text-muted-foreground space-y-2">
                  <li>• Promouvoir et défendre les droits de l'enfant</li>
                  <li>• Favoriser la participation des enfants aux décisions qui les concernent</li>
                  <li>• Créer et accompagner les Conseils Communaux d'Enfants</li>
                  <li>• Former les acteurs communautaires aux droits de l'enfant</li>
                  <li>• Lutter contre toutes formes de violences faites aux enfants</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">Zone d'intervention</h3>
                <p className="text-muted-foreground">
                  République de Côte d'Ivoire - Territoire national
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Privacy and Data Protection */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Shield className="h-6 w-6 text-primary mr-3" />
                Protection des Données
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Collecte des données</h3>
                <p className="text-muted-foreground">
                  Les données personnelles collectées via ce site web sont utilisées 
                  uniquement dans le cadre de nos activités statutaires et ne sont 
                  jamais transmises à des tiers sans consentement explicite.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">Droits des utilisateurs</h3>
                <p className="text-muted-foreground">
                  Conformément à la réglementation en vigueur, vous disposez d'un droit 
                  d'accès, de rectification et de suppression de vos données personnelles. 
                  Pour exercer ces droits, contactez-nous à : contact@ongdeci.com
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">Cookies</h3>
                <p className="text-muted-foreground">
                  Ce site utilise des cookies techniques nécessaires à son fonctionnement. 
                  Aucun cookie publicitaire ou de traçage n'est utilisé.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Transparency */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Transparence et Gouvernance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Gouvernance</h3>
                <p className="text-muted-foreground">
                  L'ONG DECI est dirigée par un Conseil d'Administration composé de 
                  professionnels expérimentés dans le domaine des droits de l'enfant 
                  et du développement social.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">Rapports d'activité</h3>
                <p className="text-muted-foreground">
                  Nos rapports d'activité annuels sont disponibles sur demande 
                  et publiés en conformité avec la réglementation ivoirienne 
                  sur les organisations non gouvernementales.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">Partenaires institutionnels</h3>
                <p className="text-muted-foreground">
                  L'ONG DECI collabore avec les institutions nationales et 
                  internationales œuvrant pour la protection de l'enfance, 
                  dans le respect des réglementations en vigueur.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact for Legal Matters */}
          <Card className="border-l-4 border-l-primary shadow-lg">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Questions juridiques
                </h3>
                <p className="text-muted-foreground mb-4">
                  Pour toute question concernant ces mentions légales ou 
                  nos obligations réglementaires, contactez-nous :
                </p>
                <p className="text-primary font-semibold">
                  contact@ongdeci.com<br />
                  +225 07 48 43 00 97
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Last Updated */}
        <div className="text-center mt-12 text-sm text-muted-foreground">
          <p>Dernière mise à jour : Septembre 2024</p>
        </div>
      </div>
    </div>
  );
};

export default LegalNotice;