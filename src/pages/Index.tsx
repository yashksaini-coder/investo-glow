
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronRight, TrendingUp, Shield, LineChart } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-3xl mx-auto animate-fade-in">
        <span className="px-4 py-1.5 text-xs font-semibold bg-accent rounded-full text-accent-foreground mb-6 inline-block">
          Welcome to InvestoGlow
        </span>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Smart Investment Decisions
          <span className="text-gradient"> Made Simple</span>
        </h1>
        
        <p className="text-lg text-muted-foreground mb-8">
          Empower your investment journey with AI-driven insights, real-time market data, and personalized portfolio tracking.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link to="/register">
            <Button className="hover-effect" size="lg">
              Get Started <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/about">
            <Button variant="outline" size="lg" className="hover-effect">
              Learn More
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="glass-panel p-6 rounded-lg hover-effect">
            <TrendingUp className="h-12 w-12 mb-4 mx-auto text-blue-400" />
            <h3 className="text-lg font-semibold mb-2">Market Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Real-time market data and AI-powered insights
            </p>
          </div>

          <div className="glass-panel p-6 rounded-lg hover-effect">
            <Shield className="h-12 w-12 mb-4 mx-auto text-green-400" />
            <h3 className="text-lg font-semibold mb-2">Smart Portfolio</h3>
            <p className="text-sm text-muted-foreground">
              Track and optimize your investments
            </p>
          </div>

          <div className="glass-panel p-6 rounded-lg hover-effect">
            <LineChart className="h-12 w-12 mb-4 mx-auto text-purple-400" />
            <h3 className="text-lg font-semibold mb-2">AI Insights</h3>
            <p className="text-sm text-muted-foreground">
              Get intelligent investment recommendations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
