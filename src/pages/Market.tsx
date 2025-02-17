import { useState,useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Star } from 'lucide-react';
import TradingViewWidget from './TradingViewWidget';

interface StockData {
  symbol: string;
  name: string;
  currentPrice: number;
  previousClose: number;
  sector: string;
}

const Market = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStock, setSelectedStock] = useState('NASDAQ:AAPL');
  const [marketData, setMarketData] = useState<StockData[]>([]);
  
  useEffect(() => {
    const fetchStockData = async () => {

      try {
        const response = await fetch('https://stocks-api-wne4.onrender.com/top-stocks');  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMarketData(data);
      } catch (error) {
        console.error('Failed to fetch market data:', error);
      }
    };
    const interval = setInterval(() => {
    fetchStockData();
  }, 5000);
    return () => clearInterval(interval);
  }, []);

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
      <div className="grid gap-4">
  {marketData.map((stock) => {
    const priceChange = stock.currentPrice - stock.previousClose;
    const percentageChange = ((priceChange / stock.previousClose) * 100).toFixed(2);
    console.log(stock.currentPrice - stock.previousClose,stock.currentPrice,stock.previousClose)

    return (
      <Card 
        key={stock.symbol} 
        className="glass-panel cursor-pointer" 
        onClick={() => setSelectedStock(stock.symbol)}
      >
        <CardContent className="flex items-center justify-between p-4">
          <div>
            <h3 className="text-lg font-semibold">{stock.symbol.split(':')[1]}</h3>
            <p className="text-sm text-muted-foreground">{stock.name}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">${stock.currentPrice.toFixed(2)}</p>
            <p className={`text-sm ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {priceChange >= 0 ? '+' : ''}
              {percentageChange}%
            </p>
          </div>
          <Button variant="ghost" size="icon">
            <Star className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    );
  })}
</div>


      <div className="mt-8">
        <TradingViewWidget  />
      </div>
    </div>
  );
};

export default Market;
