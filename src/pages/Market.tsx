import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Star } from 'lucide-react';


// Define metadata for the page
export const metadata = {
  title: 'Market - InvestoGlow',
  description: 'View and track real-time market data and stock prices',
};

interface StockData {
  symbol: string;
  name: string;
  currentPrice: number;
  previousClose: number;
  sector: string;
}

const stock_url = "Stock-URL/";

export default function MarketPage() {
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
  }, []);

  return (
    <>
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Market</h1>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search stocks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 w-[300px]"
              />
            </div>
          </div>
        </div>

        {loading && marketData.length === 0 ? (
          <div className="py-8 text-center">Loading market data...</div>
        ) : error ? (
          <div className="py-8 text-center text-red-500">{error}</div>
        ) : marketData.length === 0 ? (
          <div className="text-center py-4">No stocks data available</div>
        ) : (
          <div className="grid grid-cols-2 gap-4 w-full">
            {filteredStocks.map((stock) => {
              const priceChange = stock.currentPrice - stock.previousClose;
              const percentageChange = ((priceChange / stock.previousClose) * 100).toFixed(2);

              return (
                <Card 
                  key={stock.symbol} 
                  className="glass-panel hover:shadow-lg transition-shadow"
                >
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{stock.symbol}</h3>
                      <p className="text-sm text-muted-foreground">{stock.name}</p>
                      <p className="text-xs text-muted-foreground">{stock.sector}</p>
                    </div>
                    <div className="text-right flex-1">
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
                      className="ml-4"
                    >
                      <Star className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}
