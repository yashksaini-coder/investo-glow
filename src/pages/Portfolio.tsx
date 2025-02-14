
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';

const Portfolio = () => {
  const portfolioData = [
    { symbol: 'AAPL', shares: 10, avgPrice: 150.23, currentPrice: 155.45, totalValue: 1554.50 },
    { symbol: 'GOOGL', shares: 5, avgPrice: 2780.34, currentPrice: 2800.12, totalValue: 14000.60 },
    { symbol: 'MSFT', shares: 15, avgPrice: 290.12, currentPrice: 295.67, totalValue: 4435.05 },
  ];

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Portfolio</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Position
        </Button>
      </div>

      <Card className="glass-panel mb-6">
        <CardHeader>
          <CardTitle>Portfolio Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm text-muted-foreground">Total Value</p>
              <p className="text-2xl font-bold">$19,990.15</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Today's Gain/Loss</p>
              <p className="text-2xl font-bold text-green-500">+$523.45</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Return</p>
              <p className="text-2xl font-bold text-green-500">+12.5%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {portfolioData.map((position) => (
          <Card key={position.symbol} className="glass-panel">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Symbol</p>
                  <p className="font-semibold">{position.symbol}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Shares</p>
                  <p className="font-semibold">{position.shares}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Price</p>
                  <p className="font-semibold">${position.avgPrice.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Price</p>
                  <p className="font-semibold">${position.currentPrice.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Value</p>
                  <p className="font-semibold">${position.totalValue.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
