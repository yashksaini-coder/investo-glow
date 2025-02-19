
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { User, LogOut } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ProfileData {
  username: string;
  gender: string;
  profile_picture_url: string | null;
  email: string;
}

const Profile = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('username, gender, profile_picture_url, email')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load profile data",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign out",
      });
    }
  };

  return (
    <div className="py-8 max-w-xl mx-auto">
      <Card className="glass-panel">
        <CardHeader className="text-center">
          <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden bg-accent">
            {profileData?.profile_picture_url ? (
                    <img 
                    src={profileData.profile_picture_url} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                    <User className="w-16 h-16 text-accent-foreground" />
                    </div>
                  )}
          </div>
          <CardTitle>{profileData?.username || 'Loading...'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground">Email</label>
            <Input value={profileData?.email || ''} disabled />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Username</label>
            <Input value={profileData?.username || ''} disabled />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Gender</label>
            <Input value={profileData?.gender || ''} disabled />
          </div>
          
          <div className="pt-4">
            <Button variant="destructive" className="w-full" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
