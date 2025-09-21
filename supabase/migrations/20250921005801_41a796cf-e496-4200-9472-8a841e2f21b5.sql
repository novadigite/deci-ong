-- CORRECTION SÉCURITAIRE : Politiques RLS pour protéger les données des donateurs

-- 1. Supprimer les anciennes politiques non sécurisées
DROP POLICY IF EXISTS "Authenticated users can view all donations" ON public.donations;
DROP POLICY IF EXISTS "Authenticated users can update donations" ON public.donations;

-- 2. Créer une fonction sécurisée pour vérifier les rôles d'administrateur
-- (Pour l'instant, nous utiliserons les emails d'admin - à améliorer avec un système de rôles complet)
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
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- 3. Créer une fonction pour vérifier si l'utilisateur peut voir une donation
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
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- 4. Nouvelles politiques RLS sécurisées

-- Politique SELECT : Seuls les admins peuvent voir toutes les donations, 
-- les utilisateurs ne voient que les leurs
CREATE POLICY "Secure donation viewing" ON public.donations
  FOR SELECT 
  USING (public.can_view_donation(email));

-- Politique UPDATE : Seuls les admins peuvent modifier les donations
CREATE POLICY "Admin only donation updates" ON public.donations
  FOR UPDATE 
  USING (public.is_admin_user());

-- Politique DELETE : Seuls les admins peuvent supprimer les donations
CREATE POLICY "Admin only donation deletes" ON public.donations
  FOR DELETE 
  USING (public.is_admin_user());

-- 5. Créer une vue publique pour les statistiques (sans données personnelles)
CREATE OR REPLACE VIEW public.donation_stats AS
SELECT 
  COUNT(*) as total_donations,
  SUM(montant) as total_amount,
  AVG(montant) as average_amount,
  DATE_TRUNC('month', created_at) as month,
  moyen_paiement,
  statut
FROM public.donations
GROUP BY DATE_TRUNC('month', created_at), moyen_paiement, statut;

-- 6. Autoriser l'accès public aux statistiques (pas d'infos personnelles)
ALTER VIEW public.donation_stats OWNER TO postgres;
GRANT SELECT ON public.donation_stats TO anon;
GRANT SELECT ON public.donation_stats TO authenticated;