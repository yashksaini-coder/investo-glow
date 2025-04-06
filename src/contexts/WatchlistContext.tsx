import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface WatchlistItem {
  id: string;
  symbol: string;
  user_id: string;
}

interface WatchlistContextType {
  watchlist: WatchlistItem[];
  addToWatchlist: (symbol: string) => Promise<void>;
  removeFromWatchlist: (id: string) => Promise<void>;
  loading: boolean;
}
const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const WatchlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchUserAndWatchlist();
  }, []);

  const fetchUserAndWatchlist = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      if (user) {
        setUserId(user.id);
        await fetchWatchlist(user.id);
      } else {
        throw new Error('No authenticated user found');
      }
    } catch (error) {
      console.error('Error fetching user or watchlist:', error);
      toast({
        title: "Error",
        description: "Failed to fetch user data or watchlist",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchWatchlist = async (userId: string) => {
    const { data, error } = await supabase
      .from('watchlist')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;

    setWatchlist(data || []);
  };

  const addToWatchlist = async (symbol: string) => {
    if (!userId) {
      toast({
        title: "Error",
        description: "User not authenticated",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('watchlist')
        .insert({ symbol, user_id: userId })
        .single();

      if (error) throw error;

      setWatchlist([...watchlist, data] as WatchlistItem[]);
      toast({
        title: "Success",
        description: `${symbol} added to watchlist`,
      });
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      toast({
        title: "Error",
        description: "Failed to add stock to watchlist",
        variant: "destructive",
      });
    }
  };

  const removeFromWatchlist = async (id: string) => {
    try {
      const { error } = await supabase
        .from('watchlist')
        .delete()
        .match({ id });

      if (error) throw error;

      setWatchlist(watchlist.filter(item => item.id !== id));
      toast({
        title: "Success",
        description: "Stock removed from watchlist",
      });
    } catch (error) {
      console.error('Error removing from watchlist:', error);
      toast({
        title: "Error",
        description: "Failed to remove stock from watchlist",
        variant: "destructive",
      });
    }
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, loading }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
};
