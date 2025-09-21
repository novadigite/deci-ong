-- CORRECTION FINALE DE LA SÉCURITÉ - SYNTAXE CORRIGÉE

-- 1. Supprimer toutes les anciennes politiques existantes
DROP POLICY IF EXISTS "Secure donation viewing" ON public.donations;
DROP POLICY IF EXISTS "Admin only donation updates" ON public.donations;
DROP POLICY IF EXISTS "Admin only donation deletes" ON public.donations;

-- 2. Créer les nouvelles politiques RLS sécurisées avec syntaxe correcte

-- Politique SELECT : Seuls les admins ou propriétaires de l'email peuvent voir
CREATE POLICY "Secure donation viewing" ON public.donations
  FOR SELECT 
  USING (
    -- Admins (basé sur des emails spécifiques)
    auth.jwt() ->> 'email' IN ('admin@ongdeci.com', 'contact@ongdeci.com', 'ongdeci@yahoo.fr')
    OR
    -- Utilisateurs qui voient leurs propres donations
    auth.jwt() ->> 'email' = email
  );

-- Politique UPDATE : Seuls les admins spécifiques
CREATE POLICY "Admin only donation updates" ON public.donations
  FOR UPDATE 
  USING (
    auth.jwt() ->> 'email' IN ('admin@ongdeci.com', 'contact@ongdeci.com', 'ongdeci@yahoo.fr')
  );

-- Politique DELETE : Seuls les admins spécifiques  
CREATE POLICY "Admin only donation deletes" ON public.donations
  FOR DELETE 
  USING (
    auth.jwt() ->> 'email' IN ('admin@ongdeci.com', 'contact@ongdeci.com', 'ongdeci@yahoo.fr')
  );

-- 3. Créer une table pour les statistiques publiques (au lieu d'une vue)
CREATE TABLE IF NOT EXISTS public.donation_public_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  total_donations INTEGER DEFAULT 0,
  total_amount INTEGER DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 4. Politique RLS pour les stats publiques
ALTER TABLE public.donation_public_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public stats are viewable by everyone" ON public.donation_public_stats
  FOR SELECT USING (true);

CREATE POLICY "Only admins can update stats" ON public.donation_public_stats
  FOR ALL USING (
    auth.jwt() ->> 'email' IN ('admin@ongdeci.com', 'contact@ongdeci.com', 'ongdeci@yahoo.fr')
  );

-- 5. Fonction pour mettre à jour les statistiques
CREATE OR REPLACE FUNCTION public.update_donation_stats()
RETURNS void AS $$
BEGIN
  DELETE FROM public.donation_public_stats;
  INSERT INTO public.donation_public_stats (total_donations, total_amount, last_updated)
  SELECT 
    COUNT(*) as total_donations,
    COALESCE(SUM(montant), 0) as total_amount,
    now() as last_updated
  FROM public.donations 
  WHERE statut = 'reussi';
END;
$$ LANGUAGE plpgsql
SET search_path = public;

-- 6. Insérer des statistiques initiales
SELECT public.update_donation_stats();