-- Create donations table
CREATE TABLE public.donations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  email TEXT NOT NULL,
  montant INTEGER NOT NULL CHECK (montant > 0),
  transaction_id TEXT UNIQUE,
  moyen_paiement TEXT NOT NULL DEFAULT 'Paystack',
  statut TEXT NOT NULL DEFAULT 'en_attente' CHECK (statut IN ('en_attente', 'reussi', 'echoue')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Create policies for donations table
-- Allow anyone to insert donations (for public donation form)
CREATE POLICY "Anyone can create donations" 
ON public.donations 
FOR INSERT 
WITH CHECK (true);

-- Only allow reading donations for authenticated users (admin access)
CREATE POLICY "Authenticated users can view all donations" 
ON public.donations 
FOR SELECT 
USING (auth.role() = 'authenticated');

-- Only allow updates for authenticated users (for status updates)
CREATE POLICY "Authenticated users can update donations" 
ON public.donations 
FOR UPDATE 
USING (auth.role() = 'authenticated');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_donations_updated_at
BEFORE UPDATE ON public.donations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better performance
CREATE INDEX idx_donations_transaction_id ON public.donations(transaction_id);
CREATE INDEX idx_donations_email ON public.donations(email);
CREATE INDEX idx_donations_created_at ON public.donations(created_at DESC);