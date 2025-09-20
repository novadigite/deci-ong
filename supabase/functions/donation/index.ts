import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface DonationRequest {
  amount: number;
  email: string;
  fullName: string;
  phone?: string;
}

interface PaystackInitializeResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const PAYSTACK_SECRET_KEY = Deno.env.get('PAYSTACK_SECRET_KEY');
    
    if (!PAYSTACK_SECRET_KEY) {
      console.error('PAYSTACK_SECRET_KEY not found in environment variables');
      return new Response(
        JSON.stringify({ error: 'Configuration manquante' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const { amount, email, fullName, phone }: DonationRequest = await req.json();
    
    console.log('Processing donation request:', { amount, email, fullName });

    // Validate input
    if (!amount || !email || !fullName) {
      return new Response(
        JSON.stringify({ error: 'Données manquantes' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    if (amount < 100) {
      return new Response(
        JSON.stringify({ error: 'Le montant minimum est de 100 FCFA' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Initialize Paystack transaction
    const paystackResponse = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount: amount * 100, // Paystack expects amount in kobo (smallest currency unit)
        currency: 'XOF', // West African CFA franc
        metadata: {
          full_name: fullName,
          phone: phone || '',
          purpose: 'Don pour ONG DECI',
        },
        callback_url: `${req.headers.get('origin')}/donation-success`,
      }),
    });

    const paystackData: PaystackInitializeResponse = await paystackResponse.json();
    
    console.log('Paystack response:', paystackData);

    if (!paystackData.status) {
      console.error('Paystack initialization failed:', paystackData.message);
      return new Response(
        JSON.stringify({ error: 'Erreur lors de l\'initialisation du paiement' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Save donation to database
    const { data: donationData, error: dbError } = await supabase
      .from('donations')
      .insert({
        nom: fullName,
        email: email,
        montant: amount,
        transaction_id: paystackData.data.reference,
        moyen_paiement: 'Paystack',
        statut: 'en_attente'
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      // Continue even if database insert fails - payment can still proceed
    } else {
      console.log('Donation saved to database:', donationData);
    }

    return new Response(
      JSON.stringify({
        success: true,
        authorization_url: paystackData.data.authorization_url,
        reference: paystackData.data.reference,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error processing donation:', error);
    return new Response(
      JSON.stringify({ error: 'Erreur serveur' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});