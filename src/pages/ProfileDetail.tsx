
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, X, MapPin, MessageCircle, Wallet, User, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { UserProfile } from "@/types/userTypes";
import { mockUsers } from "@/data/mockUsers";

const ProfileDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, we would fetch from the blockchain
    // For now, we'll use mock data
    const foundProfile = mockUsers.find(user => user.id === id);
    if (foundProfile) {
      setProfile(foundProfile);
    }
  }, [id]);

  const handleLike = () => {
    toast({
      title: "Liked profile",
      description: `You liked ${profile?.name}'s profile`,
    });
  };

  const handleDislike = () => {
    toast({
      title: "Disliked profile",
      description: `You disliked ${profile?.name}'s profile`,
    });
  };

  const handleMessage = () => {
    toast({
      title: "Message feature",
      description: "Messaging will be available in the next update",
    });
  };

  const nextImage = () => {
    if (profile && profile.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % profile.images.length);
    }
  };

  const prevImage = () => {
    if (profile && profile.images.length > 0) {
      setCurrentImageIndex((prev) => (prev === 0 ? profile.images.length - 1 : prev - 1));
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen w-full bg-background pt-24 flex items-center justify-center">
        <Card className="p-8 max-w-md w-full">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Profile Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The profile you're looking for does not exist
            </p>
            <Link to="/">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="container pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Discover
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Left Column - Profile Images */}
            <div className="md:col-span-3">
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden blockchain-glow">
                <img 
                  src={profile.images[currentImageIndex] || "/placeholder.svg"} 
                  alt={profile.name} 
                  className="w-full h-full object-cover"
                />
                
                {profile.images.length > 1 && (
                  <>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/20 backdrop-blur-sm border-white/10 hover:bg-black/40"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-5 w-5 text-white" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/20 backdrop-blur-sm border-white/10 hover:bg-black/40"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-5 w-5 text-white" />
                    </Button>
                    
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1">
                      {profile.images.map((_, index) => (
                        <div 
                          key={index} 
                          className={`w-2 h-2 rounded-full ${currentImageIndex === index ? 'bg-white' : 'bg-white/30'}`}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      ))}
                    </div>
                  </>
                )}
                
                {profile.walletConnected && (
                  <div className="absolute top-4 right-4 bg-love-blue/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <Wallet className="h-3 w-3 text-love-blue" />
                    <span className="text-xs font-semibold text-white">Verified on Chain</span>
                  </div>
                )}
              </div>

              <div className="flex justify-center gap-4 mt-6">
                <Button 
                  variant="outline" 
                  className="rounded-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 hover:text-white text-white"
                  onClick={handleDislike}
                >
                  <X className="h-5 w-5" />
                </Button>
                <Button 
                  className="rounded-full bg-love-purple hover:bg-love-purple/90 text-white btn-primary-glow"
                  onClick={handleLike}
                >
                  <Heart className="h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  className="rounded-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 hover:text-white text-white"
                  onClick={handleMessage}
                >
                  <MessageCircle className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Right Column - Profile Info */}
            <div className="md:col-span-2">
              <Card className="p-6 blockchain-card">
                <div className="mb-4">
                  <h1 className="text-3xl font-bold">{profile.name}, {profile.age}</h1>
                  <div className="flex items-center text-muted-foreground mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{profile.location}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-lg font-medium mb-2">About</h2>
                  <p className="text-muted-foreground">{profile.bio}</p>
                </div>

                <div className="mb-6">
                  <h2 className="text-lg font-medium mb-2">Interests</h2>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest, index) => (
                      <Badge 
                        key={index}
                        variant="outline" 
                        className="bg-white/10 hover:bg-white/20 text-foreground border-white/20"
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flex items-center gap-2 mb-3">
                    <User className="h-4 w-4 text-love-purple" />
                    <span className="text-sm text-muted-foreground">Member since 2023</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-love-purple" />
                    <span className="text-sm text-muted-foreground">
                      {profile.walletConnected ? "Wallet connected" : "Wallet not connected"}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
