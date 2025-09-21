-- CORRECTION DES PROBLÈMES DE SÉCURITÉ DÉTECTÉS PAR LE LINTER

-- 1. Corriger les fonctions avec search_path sécurisé
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS BOOLEAN AS $$
BEGIN
  -- Liste des emails administrateurs (à personnaliser selon vos besoins)
  RETURN auth.jwt() ->> 'email' IN (
    'admin@ongdeci.com',
    'contact@ongdeci.com', 
    'ongdeci@yahoo.fr'
  );
END;
$$ LANGUAGE plpgsql 
SECURITY DEFINER 
STABLE 
SET search_path = public;

CREATE OR REPLACE FUNCTION public.can_view_donation(donation_email text)
RETURNS BOOLEAN AS $$
BEGIN
  -- Les admins peuvent tout voir
  IF public.is_admin_user() THEN
    RETURN TRUE;
  END IF;
  
  -- Les utilisateurs authentifiés ne peuvent voir que leurs propres donations (basé sur l'email)
  IF auth.jwt() ->> 'email' = donation_email THEN
    RETURN TRUE;
  END IF;
  
  RETURN FALSE;
END;
$$ LANGUAGE plpgsql 
SECURITY DEFINER 
STABLE 
SET search_path = public;

-- 2. Supprimer la vue SECURITY DEFINER problématique et la recréer sans
DROP VIEW IF EXISTS public.donation_stats;

-- Créer une nouvelle vue normale pour les statistiques publiques (sans SECURITY DEFINER)
CREATE VIEW public.donation_stats AS
SELECT 
  COUNT(*) as total_donations,
  SUM(montant) as total_amount,
  AVG(montant) as average_amount,
  DATE_TRUNC('month', created_at) as month,
  moyen_paiement,
  statut
FROM public.donations
WHERE statut = 'reussi' -- Seulement les donations réussies pour les stats publiques
GROUP BY DATE_TRUNC('month', created_at), moyen_paiement, statut;

-- 3. Créer des politiques RLS pour la vue des statistiques
-- Note: Les vues héritent automatiquement des politiques RLS des tables sous-jacentes
-- Donc nos politiques sur donations s'appliquent déjà

-- 4. Permissions pour la vue (sans être owner)
GRANT SELECT ON public.donation_stats TO anon;
GRANT SELECT ON public.donation_stats TO authenticated;