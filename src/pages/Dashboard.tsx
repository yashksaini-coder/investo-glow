
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { ArrowUpRight, ArrowDownRight, DollarSign, TrendingUp, Briefcase, Info } from 'lucide-react';
import StockFundamentals from '@/components/stock/StockFundamentals';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  // Enhanced stock performance data with realistic HDFC Bank data
  const [stockData, setStockData] = useState({
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
  });
  
  const [activeTimeframe, setActiveTimeframe] = useState('daily');

  // Calculate percentages and changes
  const calculateChange = () => {
    const currentData = stockData[activeTimeframe as keyof typeof stockData];
    if (currentData.length >= 2) {
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

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="glass-panel">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Portfolio Value
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
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
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              2 new positions today
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
            <div className="text-2xl font-bold">Bullish</div>
            <p className="text-xs text-muted-foreground">
              Market showing strength
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-panel">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>HDFC Bank Performance</CardTitle>
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
      <StockFundamentals />
    </div>
  );
};

export default Dashboard;
