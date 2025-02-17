import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Star } from 'lucide-react';

interface StockData {
  symbol: string;
  name: string;
  currentPrice: number;
  previousClose: number;
  sector: string;
}

const stock_url = import.meta.env.VITE_PUBLIC_SERVER_URL;

const Market = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [marketData, setMarketData] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter stocks based on search query
  const filteredStocks = marketData.filter(stock => 
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  useEffect(() => {
    const fetchStockData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${stock_url}top-stocks`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched stock data:', data); // Debug log
        setMarketData(data);
        setError(null);
      } catch (error) {
        setError('Failed to fetch market data. Please try again later.');
        console.error('Failed to fetch market data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
    const interval = setInterval(fetchStockData, 5000);
    return () => clearInterval(interval);
  }, [stock_url]);

  if (loading && marketData.length === 0) {
    return <div className="py-8 text-center">Loading market data...</div>;
  }

  if (error) {
    return <div className="py-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Market</h1>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search stocks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </div>

      {marketData.length === 0 && !loading ? (
        <div className="text-center py-4">No stocks data available</div>
      ) : (
        <div className="grid gap-4">
          {filteredStocks.map((stock) => {
            const priceChange = stock.currentPrice - stock.previousClose;
            const percentageChange = ((priceChange / stock.previousClose) * 100).toFixed(2);

            return (
              <Card 
                key={stock.symbol} 
                className="glass-panel hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <h3 className="text-lg font-semibold">{stock.symbol}</h3>
                    <p className="text-sm text-muted-foreground">{stock.name}</p>
                    <p className="text-xs text-muted-foreground">{stock.sector}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">${stock.currentPrice.toFixed(2)}</p>
                    <p className={`text-sm ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {priceChange >= 0 ? '+' : ''}
                      {percentageChange}%
                    </p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add favorite functionality here
                    }}
                  >
                    <Star className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Market;
