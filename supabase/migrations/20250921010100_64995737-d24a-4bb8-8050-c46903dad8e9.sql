-- IDENTIFICATION ET SUPPRESSION DES VUES SECURITY DEFINER RESTANTES

-- Rechercher et supprimer toutes les vues potentiellement problématiques
DROP VIEW IF EXISTS public.donation_stats CASCADE;

-- S'assurer qu'aucune vue avec SECURITY DEFINER n'existe
-- (Cette commande va lister toutes les vues avec SECURITY DEFINER)
DO $$
DECLARE
    view_rec RECORD;
BEGIN
    FOR view_rec IN 
        SELECT schemaname, viewname 
        FROM pg_views 
        WHERE schemaname = 'public' 
        AND definition ILIKE '%security definer%'
    LOOP
        EXECUTE 'DROP VIEW IF EXISTS ' || view_rec.schemaname || '.' || view_rec.viewname || ' CASCADE';
        RAISE NOTICE 'Dropped view: %.%', view_rec.schemaname, view_rec.viewname;
    END LOOP;
END $$;