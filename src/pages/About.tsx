
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Shield, TrendingUp } from 'lucide-react';

const About = () => {
  return (
    <div className="py-12 max-w-6xl mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About InvestoGlow</h1>
        <p className="text-xl text-muted-foreground">
          Your intelligent investment companion powered by advanced AI technology
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To democratize investing by providing cutting-edge AI tools and market insights to investors of all levels.
            </p>
          </CardContent>
        </Card>

        <Card className="glass-panel">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-400" />
              Our Values
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We believe in transparency, security, and providing reliable investment insights backed by data.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-panel mb-12">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-purple-400" />
            What We Offer
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">AI-Powered Insights</h3>
            <p className="text-muted-foreground">
              Get personalized investment recommendations and market analysis from our advanced AI system.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Real-Time Data</h3>
            <p className="text-muted-foreground">
              Access up-to-the-minute market data and trends to make informed decisions.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Portfolio Management</h3>
            <p className="text-muted-foreground">
              Track and manage your investments with our intuitive portfolio tools.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-panel">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-orange-400" />
            Our Team
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center">
            We're a team of passionate developers, financial experts, and AI specialists working together to revolutionize the investment experience.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
