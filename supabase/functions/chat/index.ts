import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message } = await req.json()
    
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured')
    }

    const systemPrompt = `Tu es l'assistant virtuel de l'ONG DECI (Droits d'Enfants en Côte d'Ivoire), une organisation non gouvernementale basée en Côte d'Ivoire qui promeut et défend les droits de l'enfant.

MISSION DE L'ONG DECI :
- Identifier, encadrer, suivre et évaluer les organisations de promotion des droits de l'enfant dirigées par les enfants en Côte d'Ivoire
- 25 Conseils Communaux d'Enfants créés
- Plus de 5000 adolescents impliqués
- 20 années d'expérience

VISION : Contribuer à faire de la Côte d'Ivoire une nation où la participation des enfants dans toutes les décisions qui les concernent est une réalité.

ACTIONS PRINCIPALES :
- Protection des enfants
- Participation des enfants aux décisions
- Reconnaissance de leurs droits  
- Éducation et sensibilisation

COORDONNÉES :
- Adresse : Yopougon-Ananeraie, Abidjan, Côte d'Ivoire
- Email : ongdeci@yahoo.fr / contact@ongdeci.com
- Téléphone : +225 07 48 43 00 97

INSTRUCTIONS :
1. Ton : Bienveillant, clair et professionnel
2. Si on te demande des dons : "Pour faire un don et soutenir nos actions, visitez notre page dédiée ou contactez-nous directement."
3. Si on te demande des contacts/partenariats : "Pour nous contacter ou discuter d'un partenariat, rendez-vous sur notre page contact."
4. Si la question sort du cadre (ONG, enfants, dons, contacts) : Donne une réponse courte puis recentre sur la mission de l'ONG
5. Réponds en français
6. Garde tes réponses concises et utiles`

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'OpenAI API error')
    }

    return new Response(
      JSON.stringify({ 
        response: data.choices[0].message.content 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Chat error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Désolé, je rencontre un problème technique. Veuillez réessayer.' 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
        status: 500
      }
    )
  }
})