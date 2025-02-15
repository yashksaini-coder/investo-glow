import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Bitcoin, Send, TrendingUp } from 'lucide-react';
import { format, subDays } from 'date-fns';
import { useQuery } from '@tanstack/react-query';

// Types for our price data
interface PriceData {
  date: string;
  price: number;
}

interface CryptoOption {
  id: string;
  name: string;
  symbol: string;
}

const cryptoOptions: CryptoOption[] = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
  { id: 'binancecoin', name: 'BNB', symbol: 'BNB' },
  { id: 'ripple', name: 'XRP', symbol: 'XRP' },
];

// Function to fetch price data from CoinGecko
const fetchPriceData = async (cryptoId: string): Promise<PriceData[]> => {
  const endDate = new Date();
  const startDate = subDays(endDate, 30);
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart/range?vs_currency=usd&from=${Math.floor(startDate.getTime() / 1000)}&to=${Math.floor(endDate.getTime() / 1000)}`
  );
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data.prices.map(([timestamp, price]: [number, number]) => ({
    date: format(new Date(timestamp), 'MM/dd'),
    price: parseFloat(price.toFixed(2))
  }));
};

// Mock data for featured cryptocurrencies
const featuredCryptos = [
  { name: 'Bitcoin', symbol: 'BTC', price: '$42,356.89', marketCap: '$800.5B', change: '+1.2%', volume: '$28.4B' },
  { name: 'Ethereum', symbol: 'ETH', price: '$2,356.45', marketCap: '$250.7B', change: '+2.3%', volume: '$15.2B' },
  { name: 'XRP', symbol: 'XRP', price: '$0.58', marketCap: '$28.4B', change: '+1.8%', volume: '$2.1B' },
];

// Mock news data
const cryptoNews = [
  { title: 'Bitcoin Reaches New All-Time High', date: '2024-02-15', source: 'CryptoNews' },
  { title: 'Major Exchange Announces New Trading Features', date: '2024-02-14', source: 'BlockchainDaily' },
  { title: 'Regulatory Updates in Crypto Markets', date: '2024-02-13', source: 'CoinDesk' },
];

const Index = () => {
  const [selectedCrypto, setSelectedCrypto] = useState<string>(cryptoOptions[0].id);

  const { data: priceData, isLoading } = useQuery({
    queryKey: ['cryptoPrice', selectedCrypto],
    queryFn: () => fetchPriceData(selectedCrypto),
    refetchInterval: 300000, // Refetch every 5 minutes
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section with Chart */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card className="glass-panel p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Price Chart (30 Days)</h2>
            <Select
              value={selectedCrypto}
              onValueChange={setSelectedCrypto}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {cryptoOptions.map((crypto) => (
                  <SelectItem key={crypto.id} value={crypto.id}>
                    {crypto.symbol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="h-[300px]">
            {isLoading ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-muted-foreground">Loading chart data...</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceData}>
                  <XAxis 
                    dataKey="date" 
                    stroke="#666"
                    tickLine={false}
                    axisLine={false}
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#666"
                    tickLine={false}
                    axisLine={false}
                    fontSize={12}
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                  />
                  <Tooltip 
                    contentStyle={{ background: '#1a1f2c', border: 'none' }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Price']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#9b87f5" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>

        
        <Card className="glass-panel p-6">
            <h3 className="text-3xl font-semibold mb-4">Trending Updates</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-green-400" />
          <span>Bitcoin breaks $45,000 resistance level</span>
              </div>
              <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-green-400" />
          <span>ETH 2.0 staking reaches new milestone</span>
              </div>
              <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-green-400" />
          <span>New regulatory framework announced</span>
              </div>
              <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-green-400" />
          <span>Japanese Energy Firm Boosts Crypto Holdings More Than 8,000% in 9 Months</span>
              </div>
            </div>
          </Card>
      </div>

      {/* Featured Cryptocurrencies */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Featured Cryptocurrencies</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {featuredCryptos.map((crypto) => (
            <Card key={crypto.symbol} className="glass-panel hover-effect">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <Bitcoin className="h-6 w-6 text-blue-400" />
                    <div>
                      <h3 className="font-semibold">{crypto.name}</h3>
                      <span className="text-sm text-muted-foreground">{crypto.symbol}</span>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-green-400">{crypto.change}</span>
                </div>
                <div className="space-y-2">
                  <p className="text-xl font-semibold">{crypto.price}</p>
                  <div className="text-sm text-muted-foreground">
                    <p>Market Cap: {crypto.marketCap}</p>
                    <p>Volume (24h): {crypto.volume}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Latest Crypto News */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Latest Crypto News</h2>
        <div className="space-y-4">
          {cryptoNews.map((news, index) => (
            <Card key={index} className="glass-panel hover-effect">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{news.title}</h3>
                  <div className="text-sm text-muted-foreground">
                    <span>{news.date}</span>
                    <span className="mx-2">•</span>
                    <span>{news.source}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <Card className="glass-panel text-center p-8 mb-12">
        <h2 className="text-2xl font-bold mb-4">Start Your Crypto Journey Today</h2>
        <p className="text-muted-foreground mb-6">
          Join thousands of investors making smarter decisions with InvestoGlow
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/register">
            <Button className="hover-effect" size="lg">
              Get Started
              <TrendingUp className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Index;
