import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DonationModal from "@/components/DonationModal";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bonjour ! Je suis l\'assistant virtuel de l\'ONG DECI. Comment puis-je vous aider aujourd\'hui ? 😊',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Détection mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('https://bqrfxeagkawxtsljqtpz.supabase.co/functions/v1/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputValue }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur de communication');
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);

      // Vérifier si la réponse contient une invitation à faire un don
      if (data.response.includes('OPEN_DONATION_MODAL')) {
        const cleanedResponse = data.response.replace('OPEN_DONATION_MODAL', '').trim();
        botMessage.text = cleanedResponse;
        setMessages(prev => prev.map(msg => msg.id === botMessage.id ? botMessage : msg));
        setTimeout(() => {
          setIsDonationModalOpen(true);
        }, 1000);
      }
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Erreur",
        description: "Impossible de contacter l'assistant. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Version mobile plein écran */}
      {isOpen && isMobile ? (
        <div className="fixed inset-0 z-50 bg-background animate-slide-up">
          <div className="flex flex-col h-full">
            {/* Header mobile */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary to-primary/90 text-white shadow-lg">
              <div className="flex items-center gap-3">
                <MessageCircle className="h-6 w-6 animate-float" />
                <span className="font-bold text-lg">Assistant DECI</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-10 w-10 text-white hover:bg-white/20 hover-lift transition-all duration-300"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            {/* Messages mobile */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-background to-muted/20">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-slide-up`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-2xl text-base leading-relaxed shadow-lg hover-lift transition-all duration-300 ${
                      message.isBot
                        ? 'bg-gradient-to-br from-card to-card/80 text-foreground border-2 border-primary/10'
                        : 'bg-gradient-to-br from-primary to-primary/90 text-white'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start animate-bounce-in">
                  <div className="bg-gradient-to-br from-card to-card/80 p-4 rounded-2xl flex items-center gap-3 border-2 border-primary/10 shadow-lg">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    <span className="text-base text-muted-foreground">L'assistant réfléchit...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input mobile */}
            <div className="p-4 border-t bg-card/50 backdrop-blur-sm">
              <div className="flex gap-2 items-center">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Tapez votre message..."
                  disabled={isLoading}
                  className="flex-1 text-base h-12 bg-background border-2 border-primary/20 focus:border-primary/40 rounded-xl transition-all duration-300"
                />
                <Button
                  onClick={sendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  size="icon"
                  className="h-12 w-12 shrink-0 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary hover-lift shadow-xl rounded-xl transition-all duration-300"
                >
                  <Send className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Version desktop et bouton */
        <div className="fixed bottom-4 right-4 z-50">
          {isOpen ? (
            <Card className="w-80 sm:w-96 h-[28rem] sm:h-[32rem] lg:h-[36rem] shadow-2xl border-2 border-primary/20 animate-bounce-in backdrop-blur-sm">
              <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-primary to-primary/90 text-white rounded-t-lg">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 animate-float" />
                  <span className="font-semibold text-sm sm:text-base">Assistant DECI</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-6 w-6 sm:h-8 sm:w-8 text-white hover:bg-white/20 hover-lift transition-all duration-300"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>
              
              <CardContent className="p-0 h-full flex flex-col">
                <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-slide-up`}
                    >
                      <div
                        className={`max-w-[85%] sm:max-w-[75%] p-3 rounded-xl text-sm sm:text-base leading-relaxed shadow-sm hover-lift transition-all duration-300 ${
                          message.isBot
                            ? 'bg-gradient-to-br from-muted to-muted/80 text-foreground border border-border/50'
                            : 'bg-gradient-to-br from-primary to-primary/90 text-white shadow-lg'
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start animate-bounce-in">
                      <div className="bg-gradient-to-br from-muted to-muted/80 p-3 rounded-xl flex items-center gap-3 border border-border/50 hover-lift">
                        <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin text-primary" />
                        <span className="text-sm sm:text-base text-muted-foreground">L'assistant réfléchit...</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                
                <div className="p-3 sm:p-4 border-t bg-gradient-to-r from-background to-muted/20">
                  <div className="flex gap-2 items-center">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Tapez votre message..."
                      disabled={isLoading}
                      className="flex-1 text-sm sm:text-base h-10 sm:h-11 bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary/40 transition-all duration-300"
                    />
                    <Button
                      onClick={sendMessage}
                      disabled={isLoading || !inputValue.trim()}
                      size="icon"
                      className="h-10 w-10 sm:h-11 sm:w-11 shrink-0 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary hover-lift shadow-lg transition-all duration-300"
                    >
                      <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Button
              onClick={() => setIsOpen(true)}
              size="lg"
              className="rounded-full h-12 w-12 sm:h-14 sm:w-14 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary animate-glow-pulse hover-lift"
            >
              <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white animate-float" />
            </Button>
          )}
        </div>
      )}

      {/* Modal de donation */}
      <DonationModal 
        isOpen={isDonationModalOpen} 
        onClose={() => setIsDonationModalOpen(false)} 
      />
    </>
  );
};

export default Chatbot;