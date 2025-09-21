import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Base de connaissances RAG pour l'ONG DECI
const ongDeciKnowledgeBase = {
  mission: {
    keywords: ['mission', 'objectif', 'but', 'raison', 'pourquoi', 'créée', 'création'],
    content: "La mission de l'ONG DECI est d'identifier, encadrer, suivre et évaluer les organisations de promotion des droits de l'enfant dirigées par les enfants en Côte d'Ivoire. Nous travaillons pour faire de la Côte d'Ivoire une nation où la participation des enfants dans toutes les décisions qui les concernent est une réalité."
  },
  vision: {
    keywords: ['vision', 'avenir', 'rêve', 'objectif long terme', 'aspiration'],
    content: "Notre vision est de contribuer à faire de la Côte d'Ivoire une nation où la participation des enfants dans toutes les décisions qui les concernent est une réalité."
  },
  chiffres: {
    keywords: ['chiffres', 'nombre', 'statistiques', 'combien', 'résultats', 'impact', 'conseils', 'adolescents', 'expérience', 'années'],
    content: "L'ONG DECI a des résultats concrets : 25 Conseils Communaux d'Enfants créés, plus de 5000 adolescents impliqués, et 20 années d'expérience dans la défense des droits de l'enfant."
  },
  actions: {
    keywords: ['actions', 'activités', 'que faites-vous', 'programmes', 'projets', 'protection', 'participation', 'reconnaissance', 'éducation'],
    content: "Nos principales actions incluent : la Protection des enfants contre toutes formes de violences, la Participation des enfants aux décisions qui les concernent, la Reconnaissance de leurs droits fondamentaux, et l'Éducation et sensibilisation sur les droits de l'enfant."
  },
  contact: {
    keywords: ['contact', 'adresse', 'téléphone', 'email', 'où', 'localisation', 'siège', 'bureau'],
    content: "Pour nous contacter : Adresse : Yopougon-Ananeraie, Abidjan, Côte d'Ivoire. Email : ongdeci@yahoo.fr ou contact@ongdeci.com. Téléphone : +225 07 48 43 00 97"
  },
  don: {
    keywords: ['don', 'donation', 'soutenir', 'aider', 'contribuer', 'financer', 'argent'],
    content: "Pour faire un don et soutenir nos actions en faveur des enfants, vous pouvez visiter notre page dédiée aux dons sur notre site web ou nous contacter directement. Chaque contribution nous aide à mieux protéger et promouvoir les droits des enfants en Côte d'Ivoire."
  },
  partenariat: {
    keywords: ['partenariat', 'collaboration', 'travailler ensemble', 'partenaire', 'coopération'],
    content: "Nous sommes ouverts aux partenariats avec d'autres organisations, institutions et personnes partageant notre vision. Pour discuter d'un partenariat, rendez-vous sur notre page contact ou contactez-nous directement."
  },
  equipe: {
    keywords: ['équipe', 'qui', 'fondateur', 'président', 'dirigeants', 'staff', 'martial', 'toha'],
    content: "L'ONG DECI est dirigée par son fondateur et président Martial Toha, un militant passionné des droits de l'enfant avec plus de 20 ans d'expérience. Notre équipe est composée de professionnels dévoués à la cause des enfants."
  },
  conseils_communaux: {
    keywords: ['conseils communaux', 'enfants conseil', 'participation enfants', 'gouvernance'],
    content: "Les Conseils Communaux d'Enfants sont des structures de participation que nous avons créées pour permettre aux enfants de participer activement aux décisions qui les concernent dans leurs communautés. Nous en avons créé 25 à travers la Côte d'Ivoire."
  }
}

// Fonction de recherche sémantique simple
function findBestMatch(query: string): string {
  const queryLower = query.toLowerCase()
  
  // Détecter les demandes de don
  const donationKeywords = ['don', 'donation', 'donner', 'contribuer', 'contribution', 'soutenir', 'aide financière', 'financer', 'participer financièrement', 'comment aider', 'comment soutenir']
  const isDonationQuery = donationKeywords.some(keyword => queryLower.includes(keyword))
  
  if (isDonationQuery) {
    return `OPEN_DONATION_MODAL Merci de votre intérêt pour soutenir l'ONG DECI ! Nous avons mis en place un système de don sécurisé pour vous permettre de contribuer facilement à nos actions en faveur des enfants en Côte d'Ivoire. Je vais ouvrir le formulaire de donation pour vous.`
  }
  
  let bestMatch = ''
  let bestScore = 0
  
  // Recherche par mots-clés
  for (const [category, data] of Object.entries(ongDeciKnowledgeBase)) {
    const keywordMatches = data.keywords.filter(keyword => 
      queryLower.includes(keyword.toLowerCase())
    ).length
    
    // Recherche dans le contenu aussi
    const contentWords = queryLower.split(' ')
    const contentMatches = contentWords.filter(word => 
      data.content.toLowerCase().includes(word)
    ).length
    
    const totalScore = keywordMatches * 3 + contentMatches
    
    if (totalScore > bestScore) {
      bestScore = totalScore
      bestMatch = data.content
    }
  }
  
  return bestMatch
}

// Réponses par défaut pour les cas non trouvés
function getDefaultResponse(query: string): string {
  const queryLower = query.toLowerCase()
  
  if (queryLower.includes('salut') || queryLower.includes('bonjour') || queryLower.includes('hello')) {
    return "Bonjour ! Je suis l'assistant virtuel de l'ONG DECI. Comment puis-je vous aider à découvrir nos actions pour les droits des enfants en Côte d'Ivoire ? 😊"
  }
  
  if (queryLower.includes('merci') || queryLower.includes('thank')) {
    return "Je vous en prie ! N'hésitez pas si vous avez d'autres questions sur l'ONG DECI et nos actions pour les enfants."
  }
  
  if (queryLower.includes('au revoir') || queryLower.includes('bye')) {
    return "Au revoir ! Merci de votre intérêt pour l'ONG DECI. N'hésitez pas à revenir si vous avez des questions."
  }
  
  return "Je ne trouve pas d'information spécifique sur ce sujet dans ma base de connaissances. Pour plus d'informations sur l'ONG DECI, vous pouvez me demander sur notre mission, nos actions, nos résultats, ou comment nous contacter. Sinon, n'hésitez pas à nous contacter directement à ongdeci@yahoo.fr"
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message } = await req.json()
    console.log('Message reçu:', message)
    
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    
    // Système RAG par défaut - fonctionne sans clé OpenAI
    if (!openaiApiKey) {
      console.log('Utilisation du système RAG (pas de clé OpenAI)')
      
      // Recherche dans la base de connaissances
      const ragResponse = findBestMatch(message)
      
      if (ragResponse) {
        console.log('Réponse RAG trouvée:', ragResponse)
        return new Response(
          JSON.stringify({ 
            response: ragResponse
          }),
          { 
            headers: { 
              ...corsHeaders, 
              'Content-Type': 'application/json' 
            } 
          }
        )
      } else {
        // Réponse par défaut si aucune correspondance
        const defaultResponse = getDefaultResponse(message)
        console.log('Réponse par défaut:', defaultResponse)
        return new Response(
          JSON.stringify({ 
            response: defaultResponse
          }),
          { 
            headers: { 
              ...corsHeaders, 
              'Content-Type': 'application/json' 
            } 
          }
        )
      }
    }

    // Si clé OpenAI disponible, utiliser comme fallback intelligent
    console.log('Utilisation d\'OpenAI avec RAG enrichie')
    
    const systemPrompt = `Tu es l'assistant virtuel de l'ONG DECI (Droits d'Enfants en Côte d'Ivoire), une organisation non gouvernementale basée en Côte d'Ivoire qui promeut et défend les droits de l'enfant.

MISSION DE L'ONG DECI :
- Identifier, encadrer, suivre et évaluer les organisations de promotion des droits de l'enfant dirigées par les enfants en Côte d'Ivoire
- 25 Conseils Communaux d'Enfants créés
- Plus de 5000 adolescents impliqués
- 20 années d'expérience

VISION : Contribuer à faire de la Côte d'Ivoire une nation où la participation des enfants dans toutes les décisions qui les concernent est une réalité.

ACTIONS PRINCIPALES :
- Protection des enfants contre toutes formes de violences
- Participation des enfants aux décisions qui les concernent
- Reconnaissance de leurs droits fondamentaux
- Éducation et sensibilisation sur les droits de l'enfant

COORDONNÉES :
- Adresse : Yopougon-Ananeraie, Abidjan, Côte d'Ivoire
- Email : ongdeci@yahoo.fr / contact@ongdeci.com
- Téléphone : +225 07 48 43 00 97

FONDATEUR ET PRÉSIDENT : Martial Toha, militant passionné des droits de l'enfant avec plus de 20 ans d'expérience.

CONSEILS COMMUNAUX D'ENFANTS : Structures de participation créées pour permettre aux enfants de participer activement aux décisions dans leurs communautés.

INSTRUCTIONS :
1. Ton : Bienveillant, clair et professionnel
2. Si on te demande des dons ou comment soutenir financièrement : Tu DOIS commencer ta réponse par "OPEN_DONATION_MODAL" puis expliquer que tu vas ouvrir le formulaire de donation sécurisé.
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
      console.error('OpenAI API error:', data)
      // Fallback sur RAG en cas d'erreur OpenAI
      const ragResponse = findBestMatch(message) || getDefaultResponse(message)
      return new Response(
        JSON.stringify({ 
          response: ragResponse
        }),
        { 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json' 
          } 
        }
      )
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
    
    // En cas d'erreur, essayer le système RAG
    try {
      const { message: errorMessage } = await req.json()
      const ragResponse = findBestMatch(errorMessage) || getDefaultResponse(errorMessage)
      
      return new Response(
        JSON.stringify({ 
          response: ragResponse
        }),
        { 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json' 
          } 
        }
      )
    } catch (fallbackError) {
      console.error('Fallback RAG error:', fallbackError)
      return new Response(
        JSON.stringify({ 
          response: 'Bonjour ! Je suis l\'assistant de l\'ONG DECI. Comment puis-je vous aider à découvrir nos actions pour les droits des enfants en Côte d\'Ivoire ? Vous pouvez me demander des informations sur notre mission, nos actions, comment nous contacter ou faire un don.'
        }),
        { 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json' 
          }
        }
      )
    }
  }
})