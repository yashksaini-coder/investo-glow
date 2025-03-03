import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, ChevronDown, TrendingUp, TrendingDown, Briefcase } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import FundamentalMetric from './FundamentalMetric';
import FundamentalsInfoDialog from './FundamentalsInfoDialog';

// Stock fundamentals for different tickers
const stockFundamentalsData = {
  'HDFCBANK.NS': {
    // Valuation Metrics
    marketCap: "₹70,860Cr",
    peRatio: "38.52",
    pbRatio: "8.25",
    industryPE: "35.78",
    enterpriseValue: "₹69,421Cr",
    evToEBITDA: "28.3",
    
    // Performance Metrics
    roe: "20.88%",
    roa: "15.24%",
    roic: "22.15%",
    operatingMargin: "27.6%",
    netMargin: "19.3%",
    
    // Financial Metrics
    debtToEquity: "0.02",
    currentRatio: "3.85",
    quickRatio: "3.42",
    interestCoverage: "152.6x",
    
    // Per Share Data
    eps: "₹122.28",
    bookValue: "₹571.32",
    dividendYield: "0.64%",
    dividendPayout: "12.5%",
    faceValue: "₹10",
    
    // Trading Data  
    beta: "0.85",
    avgVolume: "1.28M",
    yearHigh: "₹4,790",
    yearLow: "₹3,510",
  },
  'RELIANCE.NS': {
    // Valuation Metrics
    marketCap: "₹380,525Cr",
    peRatio: "32.15",
    pbRatio: "4.62",
    industryPE: "28.96",
    enterpriseValue: "₹410,325Cr",
    evToEBITDA: "18.7",
    
    // Performance Metrics
    roe: "16.35%",
    roa: "9.87%",
    roic: "15.42%",
    operatingMargin: "21.8%",
    netMargin: "12.4%",
    
    // Financial Metrics
    debtToEquity: "0.28",
    currentRatio: "2.25",
    quickRatio: "1.98",
    interestCoverage: "78.3x",
    
    // Per Share Data
    eps: "₹78.56",
    bookValue: "₹556.48",
    dividendYield: "0.42%",
    dividendPayout: "13.8%",
    faceValue: "₹10",
    
    // Trading Data  
    beta: "1.15",
    avgVolume: "3.85M",
    yearHigh: "₹2,620",
    yearLow: "₹2,180",
  },
  'TCS.NS': {
    // Valuation Metrics
    marketCap: "₹268,450Cr",
    peRatio: "29.84",
    pbRatio: "12.35",
    industryPE: "26.52",
    enterpriseValue: "₹262,370Cr",
    evToEBITDA: "22.1",
    
    // Performance Metrics
    roe: "41.56%",
    roa: "25.73%",
    roic: "38.92%",
    operatingMargin: "25.3%",
    netMargin: "21.6%",
    
    // Financial Metrics
    debtToEquity: "0.01",
    currentRatio: "4.32",
    quickRatio: "4.21",
    interestCoverage: "356.2x",
    
    // Per Share Data
    eps: "₹112.15",
    bookValue: "₹272.86",
    dividendYield: "1.25%",
    dividendPayout: "36.4%",
    faceValue: "₹1",
    
    // Trading Data  
    beta: "0.72",
    avgVolume: "2.15M",
    yearHigh: "₹3,680",
    yearLow: "₹3,025",
  }
};

// Descriptions for tooltips
const metricDescriptions = {
  marketCap: "Total value of all outstanding shares",
  peRatio: "Price to Earnings ratio - measures company valuation relative to its earnings",
  pbRatio: "Price to Book ratio - compares market value to book value",
  industryPE: "Average P/E ratio for the industry",
  enterpriseValue: "Total company value (market cap + debt - cash)",
  evToEBITDA: "Enterprise Value to EBITDA - valuation multiple",
  roe: "Return on Equity - measures profitability relative to shareholder equity",
  roa: "Return on Assets - measures profitability relative to total assets",
  roic: "Return on Invested Capital - efficiency at allocating capital",
  operatingMargin: "Operating income divided by revenue",
  netMargin: "Net profit divided by revenue",
  debtToEquity: "Total debt divided by equity - measures financial leverage",
  currentRatio: "Current assets divided by current liabilities - liquidity measure",
  quickRatio: "Current assets minus inventory, divided by current liabilities",
  interestCoverage: "EBIT divided by interest expenses - ability to pay interest",
  eps: "Earnings Per Share - profit allocated to each share",
  bookValue: "Net asset value per share",
  dividendYield: "Annual dividend per share divided by share price",
  dividendPayout: "Percentage of earnings paid as dividends",
  faceValue: "Original cost of the stock shown on certificate",
  beta: "Measure of volatility compared to the market",
  avgVolume: "Average daily trading volume",
  yearHigh: "Highest price in the last 52 weeks",
  yearLow: "Lowest price in the last 52 weeks",
}

// Trends for specific metrics
const metricTrends = {
  'HDFCBANK.NS': {
    peRatio: 'up',
    roe: 'up',
    debtToEquity: 'down',
    operatingMargin: 'up',
    netMargin: 'down',
  },
  'RELIANCE.NS': {
    peRatio: 'up',
    roe: 'down',
    debtToEquity: 'up',
    operatingMargin: 'down',
    netMargin: 'up',
  },
  'TCS.NS': {
    peRatio: 'down',
    roe: 'up',
    debtToEquity: 'down',
    operatingMargin: 'up',
    netMargin: 'up',
  }
};

interface StockFundamentalsProps {
  stockSymbol?: string;
}

const StockFundamentals: React.FC<StockFundamentalsProps> = ({ stockSymbol = 'HDFCBANK.NS' }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Get data for the selected stock
  const stockFundamentals = stockFundamentalsData[stockSymbol as keyof typeof stockFundamentalsData] || stockFundamentalsData['HDFCBANK.NS'];
  const trends = metricTrends[stockSymbol as keyof typeof metricTrends] || metricTrends['HDFCBANK.NS'];

  return (
    <Card className="glass-panel">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Fundamentals
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            {stockSymbol}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            <h3 className="text-sm font-medium mb-3 text-primary">Valuation Metrics</h3>
            <div className="space-y-1">
              <FundamentalMetric 
                label="Market Cap" 
                value={stockFundamentals.marketCap} 
                description={metricDescriptions.marketCap}
              />
              <FundamentalMetric 
                label="P/E Ratio (TTM)" 
                value={stockFundamentals.peRatio} 
                trend={trends.peRatio as any}
                description={metricDescriptions.peRatio}
              />
              <FundamentalMetric 
                label="Industry P/E" 
                value={stockFundamentals.industryPE} 
                description={metricDescriptions.industryPE}
              />
              <FundamentalMetric 
                label="P/B Ratio" 
                value={stockFundamentals.pbRatio} 
                description={metricDescriptions.pbRatio}
              />
              <FundamentalMetric 
                label="EV/EBITDA" 
                value={stockFundamentals.evToEBITDA} 
                description={metricDescriptions.evToEBITDA}
              />
            </div>
            
            <h3 className="text-sm font-medium mt-6 mb-3 text-primary">Performance Metrics</h3>
            <div className="space-y-1">
              <FundamentalMetric 
                label="ROE" 
                value={stockFundamentals.roe} 
                trend={trends.roe as any}
                description={metricDescriptions.roe}
              />
              <FundamentalMetric 
                label="ROA" 
                value={stockFundamentals.roa} 
                description={metricDescriptions.roa}
              />
              <FundamentalMetric 
                label="Operating Margin" 
                value={stockFundamentals.operatingMargin} 
                trend={trends.operatingMargin as any}
                description={metricDescriptions.operatingMargin}
              />
              <FundamentalMetric 
                label="Net Margin" 
                value={stockFundamentals.netMargin} 
                trend={trends.netMargin as any}
                description={metricDescriptions.netMargin}
              />
            </div>
          </div>
          
          {/* Right Column */}
          <div>
            <h3 className="text-sm font-medium mb-3 text-primary">Financial Health</h3>
            <div className="space-y-1">
              <FundamentalMetric 
                label="Debt to Equity" 
                value={stockFundamentals.debtToEquity} 
                trend={trends.debtToEquity as any}
                description={metricDescriptions.debtToEquity}
              />
              <FundamentalMetric 
                label="Current Ratio" 
                value={stockFundamentals.currentRatio} 
                description={metricDescriptions.currentRatio}
              />
              <FundamentalMetric 
                label="Quick Ratio" 
                value={stockFundamentals.quickRatio} 
                description={metricDescriptions.quickRatio}
              />
              <FundamentalMetric 
                label="Interest Coverage" 
                value={stockFundamentals.interestCoverage} 
                description={metricDescriptions.interestCoverage}
              />
            </div>
            
            <h3 className="text-sm font-medium mt-6 mb-3 text-primary">Per Share Data</h3>
            <div className="space-y-1">
              <FundamentalMetric 
                label="EPS (TTM)" 
                value={stockFundamentals.eps} 
                description={metricDescriptions.eps}
              />
              <FundamentalMetric 
                label="Book Value" 
                value={stockFundamentals.bookValue} 
                description={metricDescriptions.bookValue}
              />
              <FundamentalMetric 
                label="Dividend Yield" 
                value={stockFundamentals.dividendYield} 
                description={metricDescriptions.dividendYield}
              />
              <FundamentalMetric 
                label="52-Week High" 
                value={stockFundamentals.yearHigh} 
                description={metricDescriptions.yearHigh}
              />
              <FundamentalMetric 
                label="52-Week Low" 
                value={stockFundamentals.yearLow} 
                description={metricDescriptions.yearLow}
              />
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex items-center justify-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-sm flex items-center"
            onClick={() => setDialogOpen(true)}
          >
            <span>Understand Fundamentals</span>
            <Info className="ml-1 h-4 w-4" />
          </Button>
        </div>

        {/* Fundamentals Info Dialog */}
        <FundamentalsInfoDialog 
          open={dialogOpen} 
          onOpenChange={setDialogOpen} 
        />
      </CardContent>
    </Card>
  );
};

export default StockFundamentals;
