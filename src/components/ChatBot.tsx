
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { MessageSquare, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const ChatBot = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{ query: string; response: string }[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || !user) return;

    setLoading(true);
    try {
      // For now, we'll use a simple mock response
      const mockResponse = "Thank you for your question! As an AI assistant, I can help you analyze market trends and provide investment insights. Would you like to know more about a specific topic?";
      
      // Store the interaction in the database
      const { error } = await supabase
        .from('ai_queries')
        .insert([
          {
            user_id: user.id,
            query: query.trim(),
            response: mockResponse,
            assistant_type: 'general' // Default to general assistant type
          }
        ]);

      if (error) throw error;

      setMessages([...messages, { query: query.trim(), response: mockResponse }]);
      setQuery('');
    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process your request. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="glass-panel fixed bottom-20 right-4 w-96 z-50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          AI Assistant
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-60 overflow-y-auto mb-4 space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className="space-y-2">
              <div className="bg-primary/10 p-2 rounded-lg">
                <p className="text-sm">{msg.query}</p>
              </div>
              <div className="bg-muted p-2 rounded-lg">
                <p className="text-sm">{msg.response}</p>
              </div>
            </div>
          ))}
        </div>
        
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about investments..."
            disabled={loading || !user}
          />
          <Button type="submit" size="icon" disabled={loading || !user}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
        
        {!user && (
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Please login to use the AI assistant
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ChatBot;
