
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, ChevronDown, TrendingUp, TrendingDown, Briefcase } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import FundamentalMetric from './FundamentalMetric';

// Enhanced data for stock fundamentals
const stockFundamentals = {
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
}

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
  peRatio: 'up',
  roe: 'up',
  debtToEquity: 'down',
  operatingMargin: 'up',
  netMargin: 'down',
}

const StockFundamentals = () => {
  return (
    <Card className="glass-panel">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Fundamentals
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            HDFC Bank Ltd (HDFCBANK.NS)
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
                trend={metricTrends.peRatio as any}
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
                trend={metricTrends.roe as any}
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
                trend={metricTrends.operatingMargin as any}
                description={metricDescriptions.operatingMargin}
              />
              <FundamentalMetric 
                label="Net Margin" 
                value={stockFundamentals.netMargin} 
                trend={metricTrends.netMargin as any}
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
                trend={metricTrends.debtToEquity as any}
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
          <Button variant="ghost" size="sm" className="text-sm flex items-center">
            <span>Understand Fundamentals</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="ml-1 h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-xs">
                    These financial metrics help you assess the company's financial health, performance, and valuation relative to its peers.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockFundamentals;
