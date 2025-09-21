-- SOLUTION FINALE : Éliminer complètement les problèmes SECURITY DEFINER

-- 1. Supprimer toutes les vues existantes
DROP VIEW IF EXISTS public.donation_stats;

-- 2. Recréer les fonctions avec une approche différente pour éviter SECURITY DEFINER
-- On va utiliser des politiques RLS directement au lieu de fonctions SECURITY DEFINER

-- Supprimer les anciennes fonctions
DROP FUNCTION IF EXISTS public.is_admin_user();
DROP FUNCTION IF EXISTS public.can_view_donation(text);

-- 3. Recréer les politiques RLS de manière plus directe et sécurisée

-- Politique SELECT sécurisée : Seuls les admins ou les propriétaires de l'email peuvent voir
CREATE OR REPLACE POLICY "Secure donation viewing" ON public.donations
  FOR SELECT 
  USING (
    -- Admins (basé sur des emails spécifiques pour commencer)
    auth.jwt() ->> 'email' IN ('admin@ongdeci.com', 'contact@ongdeci.com', 'ongdeci@yahoo.fr')
    OR
    -- Utilisateurs qui voient leurs propres donations
    auth.jwt() ->> 'email' = email
  );

-- Politique UPDATE : Seuls les admins spécifiques
CREATE OR REPLACE POLICY "Admin only donation updates" ON public.donations
  FOR UPDATE 
  USING (
    auth.jwt() ->> 'email' IN ('admin@ongdeci.com', 'contact@ongdeci.com', 'ongdeci@yahoo.fr')
  );

-- Politique DELETE : Seuls les admins spécifiques  
CREATE OR REPLACE POLICY "Admin only donation deletes" ON public.donations
  FOR DELETE 
  USING (
    auth.jwt() ->> 'email' IN ('admin@ongdeci.com', 'contact@ongdeci.com', 'ongdeci@yahoo.fr')
  );

-- 4. Créer une table séparée pour les statistiques publiques
-- (au lieu d'une vue qui pourrait poser des problèmes)
CREATE TABLE IF NOT EXISTS public.donation_public_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  total_donations INTEGER DEFAULT 0,
  total_amount INTEGER DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Politique RLS pour les stats publiques
ALTER TABLE public.donation_public_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public stats are viewable by everyone" ON public.donation_public_stats
  FOR SELECT USING (true);

CREATE POLICY "Only admins can update stats" ON public.donation_public_stats
  FOR ALL USING (
    auth.jwt() ->> 'email' IN ('admin@ongdeci.com', 'contact@ongdeci.com', 'ongdeci@yahoo.fr')
  );

-- 5. Fonction simple pour mettre à jour les statistiques (appelée par les admins)
CREATE OR REPLACE FUNCTION public.update_donation_stats()
RETURNS void AS $$
BEGIN
  -- Mettre à jour ou insérer les statistiques
  INSERT INTO public.donation_public_stats (total_donations, total_amount, last_updated)
  SELECT 
    COUNT(*) as total_donations,
    COALESCE(SUM(montant), 0) as total_amount,
    now() as last_updated
  FROM public.donations 
  WHERE statut = 'reussi'
  ON CONFLICT (id) DO UPDATE SET
    total_donations = EXCLUDED.total_donations,
    total_amount = EXCLUDED.total_amount,
    last_updated = EXCLUDED.last_updated;
END;
$$ LANGUAGE plpgsql
SET search_path = public;

-- 6. Insérer des statistiques initiales
INSERT INTO public.donation_public_stats (total_donations, total_amount)
SELECT 
  COUNT(*) as total_donations,
  COALESCE(SUM(montant), 0) as total_amount
FROM public.donations 
WHERE statut = 'reussi'
ON CONFLICT DO NOTHING;