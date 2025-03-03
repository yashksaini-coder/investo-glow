
import React from 'react';

interface FundamentalMetricProps {
  label: string;
  value: string;
}

const FundamentalMetric = ({ label, value }: FundamentalMetricProps) => {
  return (
    <div className="flex justify-between items-center border-b border-white/10 pb-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
};

export default FundamentalMetric;
