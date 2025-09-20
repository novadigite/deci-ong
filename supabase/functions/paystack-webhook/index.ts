import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { createHmac } from 'https://deno.land/std@0.177.0/node/crypto.ts';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-paystack-signature',
};

interface PaystackWebhookEvent {
  event: string;
  data: {
    reference: string;
    amount: number;
    status: string;
    customer: {
      email: string;
    };
    metadata?: {
      full_name?: string;
    };
  };
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders });
  }

  try {
    const PAYSTACK_SECRET_KEY = Deno.env.get('PAYSTACK_SECRET_KEY');
    
    if (!PAYSTACK_SECRET_KEY) {
      console.error('PAYSTACK_SECRET_KEY not found');
      return new Response('Configuration error', { status: 500, headers: corsHeaders });
    }

    // Get raw body for signature verification
    const body = await req.text();
    const signature = req.headers.get('x-paystack-signature');

    // Verify webhook signature
    if (signature) {
      const hash = createHmac('sha512', PAYSTACK_SECRET_KEY)
        .update(body, 'utf8')
        .digest('hex');
      
      if (hash !== signature) {
        console.error('Invalid webhook signature');
        return new Response('Invalid signature', { status: 401, headers: corsHeaders });
      }
    }

    const event: PaystackWebhookEvent = JSON.parse(body);
    console.log('Webhook event received:', event.event, event.data.reference);

    // Handle successful payment
    if (event.event === 'charge.success') {
      const { reference, amount, status } = event.data;
      
      // Update donation status in database
      const { data, error } = await supabase
        .from('donations')
        .update({ 
          statut: status === 'success' ? 'reussi' : 'echoue',
          updated_at: new Date().toISOString()
        })
        .eq('transaction_id', reference)
        .select();

      if (error) {
        console.error('Database update error:', error);
        return new Response('Database error', { status: 500, headers: corsHeaders });
      }

      console.log('Donation status updated:', data);
    }

    // Handle failed payment
    if (event.event === 'charge.failed') {
      const { reference } = event.data;
      
      const { data, error } = await supabase
        .from('donations')
        .update({ 
          statut: 'echoue',
          updated_at: new Date().toISOString()
        })
        .eq('transaction_id', reference)
        .select();

      if (error) {
        console.error('Database update error:', error);
        return new Response('Database error', { status: 500, headers: corsHeaders });
      }

      console.log('Donation marked as failed:', data);
    }

    return new Response('OK', { status: 200, headers: corsHeaders });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return new Response('Internal server error', { status: 500, headers: corsHeaders });
  }
});