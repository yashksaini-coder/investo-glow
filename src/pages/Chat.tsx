
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { MessageSquare, Send, Bot } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const presetPrompts = [
  "What's the current market sentiment for Bitcoin?",
  "Explain the concept of DeFi in simple terms",
  "What are the key factors affecting crypto prices?",
  "How do I create a diversified crypto portfolio?",
  "What are the risks of cryptocurrency investing?",
];

const Chat = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{ query: string; response: string }[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (promptText: string) => {
    if (!promptText.trim() || !user) return;

    setLoading(true);
    try {
      // For now, we'll use a simple mock response
      const mockResponse = "Thanks for your question about cryptocurrency! I'm analyzing market data and trends to provide you with accurate insights. Would you like to know more about specific aspects of crypto investing?";
      
      const { error } = await supabase
        .from('ai_queries')
        .insert([
          {
            user_id: user.id,
            query: promptText.trim(),
            response: mockResponse
          }
        ]);

      if (error) throw error;

      setMessages([...messages, { query: promptText.trim(), response: mockResponse }]);
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
    <div className="container max-w-4xl mx-auto py-8">
      <Card className="glass-panel mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-6 w-6" />
            AI Investment Assistant
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Ask me anything about cryptocurrency, market analysis, or investment strategies.
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {presetPrompts.map((prompt, index) => (
              <Button
                key={index}
                variant="secondary"
                size="sm"
                onClick={() => handleSubmit(prompt)}
                disabled={loading}
              >
                {prompt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="glass-panel">
        <CardContent className="p-4">
          <div className="h-[500px] overflow-y-auto mb-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground p-8">
                <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No messages yet. Start by asking a question or selecting a preset prompt above.</p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className="space-y-2">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <p className="text-sm">{msg.query}</p>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm">{msg.response}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(query);
            }} 
            className="flex gap-2"
          >
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about investments..."
              disabled={loading}
            />
            <Button type="submit" disabled={loading}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chat;
