import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Star } from 'lucide-react';
import TradingViewWidget from './TradingViewWidget';

const Market = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStock, setSelectedStock] = useState('NASDAQ:AAPL');

  const marketData = [
    { symbol: 'NASDAQ:AAPL', name: 'Apple Inc.', price: 150.23, change: 2.5 },
    { symbol: 'NASDAQ:GOOGL', name: 'Alphabet Inc.', price: 2780.34, change: -1.2 },
    { symbol: 'NASDAQ:MSFT', name: 'Microsoft Corp.', price: 290.12, change: 1.8 },
    { symbol: 'NASDAQ:AMZN', name: 'Amazon.com Inc.', price: 3300.45, change: -0.5 },
  ];

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
        {marketData.map((stock) => (
          <Card key={stock.symbol} className="glass-panel cursor-pointer" onClick={() => setSelectedStock(stock.symbol)}>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <h3 className="text-lg font-semibold">{stock.symbol.split(':')[1]}</h3>
                <p className="text-sm text-muted-foreground">{stock.name}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">${stock.price}</p>
                <p className={`text-sm ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>{stock.change >= 0 ? '+' : ''}{stock.change}%</p>
              </div>
              <Button variant="ghost" size="icon">
                <Star className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <TradingViewWidget />
      </div>
    </div>
  );
};

export default Market;
