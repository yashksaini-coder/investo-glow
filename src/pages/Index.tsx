
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Bitcoin, Send, TrendingUp } from 'lucide-react';

// Mock data for the price chart
const priceData = [
  { date: '01/01', price: 42000 },
  { date: '01/02', price: 43500 },
  { date: '01/03', price: 42800 },
  { date: '01/04', price: 44000 },
  { date: '01/05', price: 43200 },
  { date: '01/06', price: 45000 },
  { date: '01/07', price: 44500 },
];

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
  return (
    <div className="min-h-screen">
      {/* Hero Section with Chart */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card className="glass-panel p-6">
          <h2 className="text-xl font-semibold mb-4">Bitcoin Price Chart (30 Days)</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceData}>
                <XAxis dataKey="date" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip contentStyle={{ background: '#1a1f2c', border: 'none' }} />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#9b87f5" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="glass-panel p-6">
          <h2 className="text-xl font-semibold mb-4">Ask me about any cryptocurrency</h2>
          <p className="text-muted-foreground mb-4">
            Get real-time insights and analysis about any crypto asset
          </p>
          <div className="flex gap-2">
            <Input 
              placeholder="Ask about cryptocurrency..." 
              className="bg-background/50"
            />
            <Button size="icon">
              <Send className="h-4 w-4" />
            </Button>
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
