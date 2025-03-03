
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import FundamentalMetric from './FundamentalMetric';

// Mock data for stock fundamentals
const stockFundamentals = {
  marketCap: "₹70,860Cr",
  peRatio: "38.52",
  pbRatio: "8.25",
  industryPE: "35.78",
  debtToEquity: "0.02",
  roe: "20.88%",
  eps: "122.28",
  dividendYield: "0.64%",
  bookValue: "571.32",
  faceValue: "10"
};

const StockFundamentals = () => {
  return (
    <Card className="glass-panel">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Fundamentals</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-4">
            <FundamentalMetric label="Market Cap" value={stockFundamentals.marketCap} />
            <FundamentalMetric label="P/E Ratio(TTM)" value={stockFundamentals.peRatio} />
            <FundamentalMetric label="P/B Ratio" value={stockFundamentals.pbRatio} />
            <FundamentalMetric label="Industry P/E" value={stockFundamentals.industryPE} />
            <FundamentalMetric label="Debt to Equity" value={stockFundamentals.debtToEquity} />
          </div>
          
          {/* Right Column */}
          <div className="space-y-4">
            <FundamentalMetric label="ROE" value={stockFundamentals.roe} />
            <FundamentalMetric label="EPS(TTM)" value={stockFundamentals.eps} />
            <FundamentalMetric label="Dividend Yield" value={stockFundamentals.dividendYield} />
            <FundamentalMetric label="Book Value" value={stockFundamentals.bookValue} />
            <FundamentalMetric label="Face Value" value={stockFundamentals.faceValue} />
          </div>
        </div>
        
        <div className="mt-6 flex items-center">
          <Button variant="ghost" className="text-sm flex items-center">
            <span>Understand Fundamentals</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="ml-1 h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    These financial metrics help you assess the company's financial health and performance.
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
