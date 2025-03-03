
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { ArrowUpRight, ArrowDownRight, DollarSign, TrendingUp, Briefcase, Info, Search } from 'lucide-react';
import StockFundamentals from '@/components/stock/StockFundamentals';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Stock data for different tickers
const stocksData = {
  'HDFCBANK': {
    name: 'HDFC Bank',
    symbol: 'HDFCBANK.NS',
    portfolioValue: '₹45,231.89',
    portfolioChange: '+20.1%',
    activePositions: '12',
    newPositions: '2',
    marketTrend: 'Bullish',
    trendDescription: 'Market showing strength',
    daily: [
      { date: '2023-06-01', price: 1650.25, volume: 1245000 },
      { date: '2023-06-02', price: 1642.10, volume: 1120000 },
      { date: '2023-06-05', price: 1658.75, volume: 1356000 },
      { date: '2023-06-06', price: 1670.40, volume: 1432000 },
      { date: '2023-06-07', price: 1665.90, volume: 1254000 },
      { date: '2023-06-08', price: 1675.35, volume: 1378000 },
      { date: '2023-06-09', price: 1680.60, volume: 1465000 },
      { date: '2023-06-12', price: 1695.20, volume: 1521000 },
      { date: '2023-06-13', price: 1710.45, volume: 1687000 },
      { date: '2023-06-14', price: 1715.30, volume: 1542000 },
      { date: '2023-06-15', price: 1708.75, volume: 1432000 },
      { date: '2023-06-16', price: 1720.90, volume: 1654000 },
      { date: '2023-06-19', price: 1732.15, volume: 1723000 },
      { date: '2023-06-20', price: 1725.50, volume: 1598000 },
    ],
    weekly: [
      { date: '2023-05-26', price: 1632.40, volume: 6785000 },
      { date: '2023-06-02', price: 1642.10, volume: 7123000 },
      { date: '2023-06-09', price: 1680.60, volume: 7354000 },
      { date: '2023-06-16', price: 1720.90, volume: 7865000 },
      { date: '2023-06-23', price: 1728.35, volume: 7432000 },
      { date: '2023-06-30', price: 1742.80, volume: 7654000 },
      { date: '2023-07-07', price: 1756.25, volume: 7865000 },
      { date: '2023-07-14', price: 1768.90, volume: 8123000 },
    ],
    monthly: [
      { date: '2023-01-31', price: 1560.75, volume: 28654000 },
      { date: '2023-02-28', price: 1575.90, volume: 29785000 },
      { date: '2023-03-31', price: 1598.45, volume: 30125000 },
      { date: '2023-04-30', price: 1620.30, volume: 30458000 },
      { date: '2023-05-31', price: 1635.80, volume: 31254000 },
      { date: '2023-06-30', price: 1742.80, volume: 32145000 },
    ],
  },
  'RELIANCE': {
    name: 'Reliance Industries',
    symbol: 'RELIANCE.NS',
    portfolioValue: '₹67,456.32',
    portfolioChange: '+15.3%',
    activePositions: '8',
    newPositions: '1',
    marketTrend: 'Bullish',
    trendDescription: 'Strong momentum',
    daily: [
      { date: '2023-06-01', price: 2450.75, volume: 2345000 },
      { date: '2023-06-02', price: 2468.20, volume: 2520000 },
      { date: '2023-06-05', price: 2455.50, volume: 2156000 },
      { date: '2023-06-06', price: 2470.80, volume: 2332000 },
      { date: '2023-06-07', price: 2485.60, volume: 2454000 },
      { date: '2023-06-08', price: 2490.35, volume: 2578000 },
      { date: '2023-06-09', price: 2510.60, volume: 2765000 },
      { date: '2023-06-12', price: 2525.20, volume: 2821000 },
      { date: '2023-06-13', price: 2530.45, volume: 2687000 },
      { date: '2023-06-14', price: 2545.30, volume: 2842000 },
      { date: '2023-06-15', price: 2538.75, volume: 2732000 },
      { date: '2023-06-16', price: 2550.90, volume: 2954000 },
      { date: '2023-06-19', price: 2562.15, volume: 3023000 },
      { date: '2023-06-20', price: 2575.50, volume: 3198000 },
    ],
    weekly: [
      { date: '2023-05-26', price: 2432.40, volume: 12785000 },
      { date: '2023-06-02', price: 2468.20, volume: 13123000 },
      { date: '2023-06-09', price: 2510.60, volume: 13354000 },
      { date: '2023-06-16', price: 2550.90, volume: 13865000 },
      { date: '2023-06-23', price: 2568.35, volume: 13432000 },
      { date: '2023-06-30', price: 2582.80, volume: 13654000 },
      { date: '2023-07-07', price: 2596.25, volume: 13865000 },
      { date: '2023-07-14', price: 2608.90, volume: 14123000 },
    ],
    monthly: [
      { date: '2023-01-31', price: 2360.75, volume: 58654000 },
      { date: '2023-02-28', price: 2375.90, volume: 59785000 },
      { date: '2023-03-31', price: 2398.45, volume: 60125000 },
      { date: '2023-04-30', price: 2420.30, volume: 60458000 },
      { date: '2023-05-31', price: 2435.80, volume: 61254000 },
      { date: '2023-06-30', price: 2582.80, volume: 62145000 },
    ],
  },
  'TCS': {
    name: 'Tata Consultancy Services',
    symbol: 'TCS.NS',
    portfolioValue: '₹34,256.78',
    portfolioChange: '+8.7%',
    activePositions: '5',
    newPositions: '0',
    marketTrend: 'Neutral',
    trendDescription: 'Consolidating phase',
    daily: [
      { date: '2023-06-01', price: 3250.25, volume: 1145000 },
      { date: '2023-06-02', price: 3242.10, volume: 1020000 },
      { date: '2023-06-05', price: 3258.75, volume: 1156000 },
      { date: '2023-06-06', price: 3270.40, volume: 1232000 },
      { date: '2023-06-07', price: 3265.90, volume: 1154000 },
      { date: '2023-06-08', price: 3275.35, volume: 1278000 },
      { date: '2023-06-09', price: 3280.60, volume: 1365000 },
      { date: '2023-06-12', price: 3295.20, volume: 1421000 },
      { date: '2023-06-13', price: 3310.45, volume: 1587000 },
      { date: '2023-06-14', price: 3315.30, volume: 1442000 },
      { date: '2023-06-15', price: 3308.75, volume: 1332000 },
      { date: '2023-06-16', price: 3320.90, volume: 1554000 },
      { date: '2023-06-19', price: 3332.15, volume: 1623000 },
      { date: '2023-06-20', price: 3325.50, volume: 1498000 },
    ],
    weekly: [
      { date: '2023-05-26', price: 3232.40, volume: 5785000 },
      { date: '2023-06-02', price: 3242.10, volume: 6123000 },
      { date: '2023-06-09', price: 3280.60, volume: 6354000 },
      { date: '2023-06-16', price: 3320.90, volume: 6865000 },
      { date: '2023-06-23', price: 3328.35, volume: 6432000 },
      { date: '2023-06-30', price: 3342.80, volume: 6654000 },
      { date: '2023-07-07', price: 3356.25, volume: 6865000 },
      { date: '2023-07-14', price: 3368.90, volume: 7123000 },
    ],
    monthly: [
      { date: '2023-01-31', price: 3160.75, volume: 24654000 },
      { date: '2023-02-28', price: 3175.90, volume: 25785000 },
      { date: '2023-03-31', price: 3198.45, volume: 26125000 },
      { date: '2023-04-30', price: 3220.30, volume: 26458000 },
      { date: '2023-05-31', price: 3235.80, volume: 27254000 },
      { date: '2023-06-30', price: 3342.80, volume: 28145000 },
    ],
  }
};

// Available stock options for search
const stockOptions = [
  { id: 'HDFCBANK', name: 'HDFC Bank Ltd' },
  { id: 'RELIANCE', name: 'Reliance Industries Ltd' },
  { id: 'TCS', name: 'Tata Consultancy Services Ltd' },
];

const Dashboard = () => {
  const [activeTimeframe, setActiveTimeframe] = useState('daily');
  const [selectedStock, setSelectedStock] = useState('HDFCBANK');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStocks, setFilteredStocks] = useState(stockOptions);
  const [showResults, setShowResults] = useState(false);
  
  // Get current stock data
  const stockData = stocksData[selectedStock as keyof typeof stocksData];
  
  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredStocks(stockOptions);
    } else {
      const filtered = stockOptions.filter(
        stock => stock.name.toLowerCase().includes(query.toLowerCase()) || 
                stock.id.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredStocks(filtered);
    }
    
    setShowResults(query.trim() !== '');
  };
  
  // Handle stock selection
  const handleSelectStock = (stockId: string) => {
    setSelectedStock(stockId);
    setSearchQuery(stockOptions.find(s => s.id === stockId)?.name || '');
    setShowResults(false);
  };

  // Calculate price change for selected timeframe
  const calculateChange = () => {
    const currentData = stockData[activeTimeframe as keyof typeof stockData];
    if (Array.isArray(currentData) && currentData.length >= 2) {
      const latestPrice = currentData[currentData.length - 1].price;
      const previousPrice = currentData[0].price;
      const change = latestPrice - previousPrice;
      const percentChange = (change / previousPrice) * 100;
      return {
        change: change.toFixed(2),
        percentChange: percentChange.toFixed(2),
        isPositive: change >= 0
      };
    }
    return { change: '0.00', percentChange: '0.00', isPositive: true };
  };

  const priceChange = calculateChange();

  return (
    <div className="py-8 space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      {/* Search Bar */}
      <div className="w-full relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search stocks..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-9 w-full"
            />
            {showResults && filteredStocks.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 p-2 bg-card border rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                {filteredStocks.map(stock => (
                  <div 
                    key={stock.id}
                    className="p-2 hover:bg-accent rounded-md cursor-pointer"
                    onClick={() => handleSelectStock(stock.id)}
                  >
                    <div className="font-medium">{stock.name}</div>
                    <div className="text-xs text-muted-foreground">{stock.id}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Button onClick={() => handleSelectStock(selectedStock)}>
            Search
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="glass-panel">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Portfolio Value
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stockData.portfolioValue}</div>
            <p className="text-xs text-muted-foreground">
              {stockData.portfolioChange} from last month
            </p>
          </CardContent>
        </Card>
        <Card className="glass-panel">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Active Positions
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stockData.activePositions}</div>
            <p className="text-xs text-muted-foreground">
              {stockData.newPositions} new positions today
            </p>
          </CardContent>
        </Card>
        <Card className="glass-panel">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Market Trend
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stockData.marketTrend}</div>
            <p className="text-xs text-muted-foreground">
              {stockData.trendDescription}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-panel">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{stockData.name} Performance</CardTitle>
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-medium ${priceChange.isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {priceChange.isPositive ? '+' : ''}{priceChange.change} ({priceChange.isPositive ? '+' : ''}{priceChange.percentChange}%)
            </span>
            {priceChange.isPositive ? 
              <ArrowUpRight className="h-4 w-4 text-green-500" /> : 
              <ArrowDownRight className="h-4 w-4 text-red-500" />
            }
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="daily" className="w-full" onValueChange={setActiveTimeframe}>
            <TabsList className="mb-4">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
            
            <TabsContent value="daily" className="space-y-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stockData.daily} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#888888" 
                      tickFormatter={(date) => new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} 
                    />
                    <YAxis 
                      stroke="#888888" 
                      domain={['auto', 'auto']}
                      tickFormatter={(value) => `₹${value}`}
                    />
                    <Tooltip 
                      formatter={(value, name) => [
                        `₹${value}`, name === 'price' ? 'Price' : 'Volume'
                      ]}
                      labelFormatter={(label) => new Date(label).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#8884d8" 
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 6 }}
                      name="Price"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="weekly" className="space-y-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stockData.weekly} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#888888" 
                      tickFormatter={(date) => new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} 
                    />
                    <YAxis 
                      stroke="#888888" 
                      domain={['auto', 'auto']}
                      tickFormatter={(value) => `₹${value}`}
                    />
                    <Tooltip 
                      formatter={(value, name) => [
                        `₹${value}`, name === 'price' ? 'Price' : 'Volume'
                      ]}
                      labelFormatter={(label) => new Date(label).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#8884d8" 
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 6 }}
                      name="Price"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="monthly" className="space-y-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stockData.monthly} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#888888" 
                      tickFormatter={(date) => new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} 
                    />
                    <YAxis 
                      stroke="#888888" 
                      domain={['auto', 'auto']}
                      tickFormatter={(value) => `₹${value}`}
                    />
                    <Tooltip 
                      formatter={(value, name) => [
                        `₹${value}`, name === 'price' ? 'Price' : 'Volume'
                      ]}
                      labelFormatter={(label) => new Date(label).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#8884d8" 
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 6 }}
                      name="Price"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Stock Fundamentals Section */}
      <StockFundamentals stockSymbol={stockData.symbol} />
    </div>
  );
};

export default Dashboard;
