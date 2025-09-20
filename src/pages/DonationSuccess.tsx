import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Heart, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DonationSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get('reference');

  useEffect(() => {
    // You could add analytics tracking here
    console.log('Donation success page visited with reference:', reference);
  }, [reference]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <Heart className="h-6 w-6 text-red-500 absolute -top-1 -right-1" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Merci pour votre générosité !
          </h1>
          
          <p className="text-gray-600 mb-6">
            Votre don a été traité avec succès. Grâce à votre soutien, l'ONG DECI peut continuer son combat pour la défense et l'engagement des enfants en Côte d'Ivoire.
          </p>

          {reference && (
            <div className="bg-gray-50 rounded-md p-3 mb-6">
              <p className="text-sm text-gray-500">Référence de transaction</p>
              <p className="font-mono text-sm text-gray-800">{reference}</p>
            </div>
          )}

          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              Un reçu de votre don vous sera envoyé par e-mail sous peu.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="flex-1">
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" />
                  Retour à l'accueil
                </Link>
              </Button>
              
              <Button variant="outline" asChild className="flex-1">
                <Link to="/projets">
                  Voir nos projets
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Pour toute question concernant votre don, contactez-nous à{' '}
              <a href="mailto:contact@ongdeci.org" className="text-primary hover:underline">
                contact@ongdeci.org
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationSuccess;