
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import ProfileCard from "@/components/ProfileCard";
import ProfileShowcase from "@/components/ProfileShowcase";
import EmptyState from "@/components/EmptyState";
import BlockchainBackground from "@/components/Blockchain";
import { mockUsers } from "@/data/mockUsers";
import { UserProfile, MatchStatus } from "@/types/userTypes";

const Index = () => {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [matches, setMatches] = useState<string[]>([]);
  const [profileStatus, setProfileStatus] = useState<Record<string, MatchStatus>>({});
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading profiles from blockchain
    const loadProfiles = async () => {
      // In a real implementation, this would fetch from the blockchain
      setTimeout(() => {
        setProfiles(mockUsers);
      }, 1000);
    };
    
    loadProfiles();
  }, []);

  const handleLike = (id: string) => {
    // Simulate blockchain transaction for liking
    const matchProbability = 0.5; // 50% chance of matching
    const isMatch = Math.random() < matchProbability;
    
    if (isMatch) {
      setMatches(prev => [...prev, id]);
      toast({
        title: "It's a match!",
        description: "You have a new connection on the blockchain.",
      });
    }
    
    // Set profile status
    setProfileStatus(prev => ({
      ...prev,
      [id]: 'liked'
    }));
  };

  const handleDislike = (id: string) => {
    // Set profile status
    setProfileStatus(prev => ({
      ...prev,
      [id]: 'disliked'
    }));
  };

  const resetProfiles = () => {
    setProfileStatus({});
    toast({
      title: "Profiles reset",
      description: "All profiles have been restored.",
    });
  };

  // Filter profiles for the main card (profiles not yet acted on)
  const pendingProfiles = profiles.filter(
    profile => !profileStatus[profile.id] || profileStatus[profile.id] === 'pending'
  );
  
  return (
    <div className="min-h-screen w-full bg-background">
      <BlockchainBackground />
      <Header />
      
      <main className="container pt-24 pb-16 px-4 flex flex-col items-center">
        <div className="max-w-md w-full mx-auto mb-16">
          <div className="mb-8 text-center animate-fade-in">
            <h1 className="text-3xl font-bold bg-gradient-blockchain bg-clip-text text-transparent mb-2">
              Find Your Perfect Match on the Blockchain
            </h1>
            <p className="text-muted-foreground">
              Decentralized dating with security and transparency
            </p>
          </div>
          
          <div className="w-full animate-fade-in">
            {pendingProfiles.length > 0 ? (
              <ProfileCard 
                profile={pendingProfiles[0]} 
                onLike={handleLike} 
                onDislike={handleDislike} 
              />
            ) : (
              <EmptyState onReset={resetProfiles} />
            )}
          </div>
        </div>
        
        {profiles.length > 0 && (
          <div className="w-full mt-12 animate-fade-in">
            <ProfileShowcase 
              profiles={profiles} 
              onLike={handleLike} 
              onDislike={handleDislike} 
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
