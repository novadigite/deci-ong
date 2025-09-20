import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Heart, Loader2 } from 'lucide-react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    amount: '',
    email: '',
    fullName: '',
    phone: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const predefinedAmounts = [1000, 5000, 10000, 25000, 50000];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAmountSelect = (amount: number) => {
    setFormData(prev => ({ ...prev, amount: amount.toString() }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.email || !formData.fullName) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    const amount = parseInt(formData.amount);
    if (isNaN(amount) || amount < 100) {
      toast({
        title: "Erreur",
        description: "Le montant minimum est de 100 FCFA",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('donation', {
        body: {
          amount,
          email: formData.email,
          fullName: formData.fullName,
          phone: formData.phone,
        },
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      // Redirect to Paystack payment page
      window.open(data.authorization_url, '_blank');
      
      toast({
        title: "Redirection vers Paystack",
        description: "Vous allez être redirigé vers la page de paiement sécurisée",
      });

      // Close modal after successful initialization
      onClose();
      
      // Reset form
      setFormData({
        amount: '',
        email: '',
        fullName: '',
        phone: '',
      });

    } catch (error) {
      console.error('Donation error:', error);
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue lors de l'initialisation du paiement",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Faire un don à DECI
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="amount">Montant (FCFA) *</Label>
            <div className="grid grid-cols-3 gap-2 mt-2 mb-2">
              {predefinedAmounts.map((amount) => (
                <Button
                  key={amount}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleAmountSelect(amount)}
                  className={formData.amount === amount.toString() ? "bg-primary text-primary-foreground" : ""}
                >
                  {amount.toLocaleString()}
                </Button>
              ))}
            </div>
            <Input
              id="amount"
              name="amount"
              type="number"
              min="100"
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="Montant personnalisé"
              required
            />
          </div>

          <div>
            <Label htmlFor="fullName">Nom complet *</Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Votre nom complet"
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Adresse e-mail *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="votre@email.com"
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Téléphone (optionnel)</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+225 XX XX XX XX"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isLoading}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Traitement...
                </>
              ) : (
                'Procéder au paiement'
              )}
            </Button>
          </div>
        </form>

        <div className="text-xs text-muted-foreground mt-4 p-3 bg-muted rounded-md">
          <p className="font-medium mb-1">Paiement sécurisé avec Paystack</p>
          <p>Vos informations de paiement sont protégées et sécurisées. Vous serez redirigé vers la plateforme Paystack pour finaliser votre don.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DonationModal;