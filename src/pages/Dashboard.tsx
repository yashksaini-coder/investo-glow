import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { ArrowUpRight, ArrowDownRight, DollarSign, TrendingUp, Briefcase, Search, AlertTriangle } from 'lucide-react';
import StockFundamentals from '@/components/stock/StockFundamentals';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from '@tanstack/react-query';
import { BasicStockInfo, StockData } from '@/lib/types';
import { useToast } from '@/components/ui/use-toast';

// Available stock options for search
const stockOptions = [
  { id: 'MSFT', name: 'Microsoft Corporation' },
  { id: 'AAPL', name: 'Apple Inc.' },
  { id: 'GOOGL', name: 'Alphabet Inc.' },
  { id: 'AMZN', name: 'Amazon.com Inc.' },
  { id: 'META', name: 'Meta Platforms Inc.' },
  { id: 'NVDA', name: 'NVIDIA Corporation' },
  { id: 'TSLA', name: 'Tesla Inc.' },
];

// Fetch basic stock info
const fetchStockInfo = async (symbol: string): Promise<BasicStockInfo> => {
  const response = await fetch(`https://investo-server-dlii.onrender.com/stock/${symbol.toLowerCase()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch stock info');
  }
  return response.json();
};

// Generate mock stock price data based on current price and previous close
const generateMockPriceData = (stockInfo: BasicStockInfo, timeframe: string): StockData[] => {
  const currentPrice = stockInfo.currentPrice;
  const previousClose = stockInfo.previousClose;
  const priceDiff = currentPrice - previousClose;
  const volatility = Math.abs(priceDiff) * 0.3; // Use price difference to determine volatility
  
  const now = new Date();
  let dataPoints: StockData[] = [];
  
  if (timeframe === 'daily') {
    // Generate hourly data for the last day
    for (let i = 0; i < 8; i++) {
      const date = new Date(now);
      date.setHours(9 + i);
      date.setMinutes(0);
      date.setSeconds(0);
      
      // Price trends upwards or downwards based on the actual daily change
      const progress = i / 7; // 0 to 1 as the day progresses
      const randomFactor = (Math.random() - 0.5) * volatility;
      const price = previousClose + (priceDiff * progress) + randomFactor;
      
      dataPoints.push({
        date: date.toISOString(),
        price: Number(price.toFixed(2)),
        volume: Math.floor(100000 + Math.random() * 900000)
      });
    }
  } else if (timeframe === 'weekly') {
    // Generate daily data for the last week
    for (let i = 0; i < 5; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - (4 - i));
      
      const progress = i / 4;
      const randomFactor = (Math.random() - 0.5) * volatility * 2;
      const price = previousClose * 0.98 + (priceDiff * 5 * progress) + randomFactor;
      
      dataPoints.push({
        date: date.toISOString(),
        price: Number(price.toFixed(2)),
        volume: Math.floor(500000 + Math.random() * 1500000)
      });
    }
  } else if (timeframe === 'monthly') {
    // Generate weekly data for the last month
    for (let i = 0; i < 4; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - (21 - (i * 7)));
      
      const progress = i / 3;
      const randomFactor = (Math.random() - 0.5) * volatility * 3;
      const price = previousClose * 0.95 + (priceDiff * 20 * progress) + randomFactor;
      
      dataPoints.push({
        date: date.toISOString(),
        price: Number(price.toFixed(2)),
        volume: Math.floor(2000000 + Math.random() * 3000000)
      });
    }
  }
  
  return dataPoints;
};

// Get market trend description based on price change percentage
const getMarketTrend = (changePercent: number) => {
  if (changePercent > 2) return { trend: 'Bullish', description: 'Strong upward momentum' };
  if (changePercent > 0.5) return { trend: 'Bullish', description: 'Positive market sentiment' };
  if (changePercent > -0.5) return { trend: 'Neutral', description: 'Market consolidating' };
  if (changePercent > -2) return { trend: 'Bearish', description: 'Cautious market sentiment' };
  return { trend: 'Bearish', description: 'Strong downward pressure' };
};

// Format currency values
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

const Dashboard = () => {
  const [activeTimeframe, setActiveTimeframe] = useState('daily');
  const [selectedStock, setSelectedStock] = useState('MSFT');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStocks, setFilteredStocks] = useState(stockOptions);
  const [showResults, setShowResults] = useState(false);
  const [customTicker, setCustomTicker] = useState('');
  const { toast } = useToast();
  
  // Query for stock information
  const { 
    data: stockInfo, 
    isLoading: isStockInfoLoading, 
    error: stockInfoError,
    refetch: refetchStockInfo
  } = useQuery({
    queryKey: ['stockInfo', selectedStock],
    queryFn: () => fetchStockInfo(selectedStock),
    staleTime: 60000, // 1 minute
    refetchOnWindowFocus: false,
  });
  
  // Generate chart data based on stock info
  const chartData = stockInfo ? generateMockPriceData(stockInfo, activeTimeframe) : [];
  
  // Handle errors
  useEffect(() => {
    if (stockInfoError) {
      toast({
        title: "Error loading stock data",
        description: "Could not fetch the stock information. Please try again later.",
        variant: "destructive",
      });
    }
  }, [stockInfoError, toast]);
  
  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setCustomTicker(query);
    
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
    setSearchQuery(stockOptions.find(s => s.id === stockId)?.name || stockId);
    setShowResults(false);
    refetchStockInfo();
  };

  // Handle custom stock search
  const handleSearch = () => {
    // If the search query matches one of our predefined options, use that
    const matchedStock = stockOptions.find(
      s => s.id.toLowerCase() === searchQuery.toLowerCase() || 
           s.name.toLowerCase() === searchQuery.toLowerCase()
    );
    
    if (matchedStock) {
      handleSelectStock(matchedStock.id);
    } else if (customTicker.trim() !== '') {
      // Otherwise use the custom ticker (could be any valid stock symbol)
      const ticker = customTicker.trim().toUpperCase();
      setSelectedStock(ticker);
      refetchStockInfo();
      setShowResults(false);
    }
  };

  // Handle pressing Enter in the search box
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Calculate price change for display
  const calculateChange = () => {
    if (!stockInfo) return { change: '0.00', percentChange: '0.00', isPositive: true };
    
    const currentPrice = stockInfo.currentPrice;
    const previousClose = stockInfo.previousClose;
    const change = currentPrice - previousClose;
    const percentChange = (change / previousClose) * 100;
    
    return {
      change: change.toFixed(2),
      percentChange: percentChange.toFixed(2),
      isPositive: change >= 0
    };
  };

  const priceChange = calculateChange();
  
  // Get market trend based on price change
  const marketTrend = stockInfo ? getMarketTrend(parseFloat(priceChange.percentChange)) : { trend: 'Neutral', description: 'Market consolidating' };
  
  // Mock portfolio data (would come from a real API in production)
  const portfolioValue = stockInfo ? (stockInfo.currentPrice * 10).toFixed(2) : '0.00'; // Mocking 10 shares
  const portfolioChange = priceChange.isPositive ? 
    `+${(parseFloat(priceChange.percentChange) * 1.2).toFixed(2)}%` : 
    `${(parseFloat(priceChange.percentChange) * 1.2).toFixed(2)}%`;
  
  // Mock positions data
  const activePositions = stockInfo ? Math.floor(Math.random() * 15) + 5 : 0;
  const newPositions = stockInfo ? Math.floor(Math.random() * 3) : 0;

  if (isStockInfoLoading) {
    return (
      <div className="py-8 space-y-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>
        <div className="flex items-center justify-center h-[400px]">
          <div className="text-center flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
            <p className="text-muted-foreground">Loading dashboard data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (stockInfoError) {
    return (
      <div className="py-8 space-y-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>
        <div className="flex items-center justify-center h-[400px]">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Failed to load dashboard</h2>
            <p className="text-muted-foreground mb-4">There was an error loading the stock data.</p>
            <Button onClick={() => refetchStockInfo()}>Try Again</Button>
          </div>
        </div>
      </div>
    );
  }

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
              onKeyPress={handleKeyPress}
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
          <Button onClick={handleSearch}>
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
            <div className="text-2xl font-bold">{formatCurrency(parseFloat(portfolioValue))}</div>
            <p className="text-xs text-muted-foreground">
              {portfolioChange} from last day
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
            <div className="text-2xl font-bold">{activePositions}</div>
            <p className="text-xs text-muted-foreground">
              {newPositions} new positions today
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
            <div className="text-2xl font-bold">{marketTrend.trend}</div>
            <p className="text-xs text-muted-foreground">
              {marketTrend.description}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-panel">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{stockInfo?.name} Performance</CardTitle>
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
                  <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#888888" 
                      tickFormatter={(date) => new Date(date).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })} 
                    />
                    <YAxis 
                      stroke="#888888" 
                      domain={['auto', 'auto']}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip 
                      formatter={(value, name) => [
                        `$${value}`, name === 'price' ? 'Price' : 'Volume'
                      ]}
                      labelFormatter={(label) => new Date(label).toLocaleString(undefined, { 
                        year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                      })}
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
                  <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#888888" 
                      tickFormatter={(date) => new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} 
                    />
                    <YAxis 
                      stroke="#888888" 
                      domain={['auto', 'auto']}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip 
                      formatter={(value, name) => [
                        `$${value}`, name === 'price' ? 'Price' : 'Volume'
                      ]}
                      labelFormatter={(label) => new Date(label).toLocaleDateString(undefined, { 
                        year: 'numeric', month: 'long', day: 'numeric' 
                      })}
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
                  <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#888888" 
                      tickFormatter={(date) => new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} 
                    />
                    <YAxis 
                      stroke="#888888" 
                      domain={['auto', 'auto']}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip 
                      formatter={(value, name) => [
                        `$${value}`, name === 'price' ? 'Price' : 'Volume'
                      ]}
                      labelFormatter={(label) => new Date(label).toLocaleDateString(undefined, { 
                        year: 'numeric', month: 'long', day: 'numeric' 
                      })}
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
      <StockFundamentals stockSymbol={selectedStock} />
    </div>
  );
};

export default Dashboard;
