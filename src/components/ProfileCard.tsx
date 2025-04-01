import { useState, useEffect } from "react";
import { UserProfile } from "@/types/userTypes";
import { Card } from "@/components/ui/card";
import { Heart, X, Sparkles, MapPin, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const PROFILE_STATUS_KEY = 'chainHeartMatch_profileStatus';

interface ProfileCardProps {
  profile: UserProfile;
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
  isCompact?: boolean;
}

const ProfileCard = ({ profile, onLike, onDislike, isCompact = false }: ProfileCardProps) => {
  const [isAnimating, setIsAnimating] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDisliked, setIsDisliked] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if profile is disliked on mount
  useEffect(() => {
    const profileStatus = localStorage.getItem(PROFILE_STATUS_KEY);
    const statuses = profileStatus ? JSON.parse(profileStatus) : {};
    setIsDisliked(statuses[profile.id] === 'disliked');
  }, [profile.id]);

  const handleLike = (e: React.MouseEvent) => {
    if (!e) return;
    e.preventDefault();
    e.stopPropagation();
    if (isDisliked) return;
    setIsAnimating("right");
    setTimeout(() => {
      onLike(profile.id);
      setIsAnimating(null);
    }, 300);
  };

  const handleDislike = (e: React.MouseEvent) => {
    if (!e) return;
    e.preventDefault();
    e.stopPropagation();
    setIsAnimating("left");
    setIsDisliked(true);
    setTimeout(() => {
      onDislike(profile.id);
      setIsAnimating(null);
      toast({
        title: "Profile removed",
        description: "You won't see this profile again.",
      });
    }, 300);
  };

  const handleViewProfile = (e: React.MouseEvent) => {
    // Only navigate if clicking on the card itself, not on buttons
    const target = e.target as HTMLElement;
    if (target.closest('button')) {
      return;
    }
    
    e.preventDefault();
    e.stopPropagation();
    
    if (isDisliked) {
      return;
    }
    
    navigate(`/profile/${profile.id}`);
  };

  const nextImage = (e: React.MouseEvent) => {
    if (!e) return;
    e.preventDefault();
    e.stopPropagation();
    if (profile.images.length > 0 && !isDisliked) {
      setCurrentImageIndex((prev) => (prev + 1) % profile.images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    if (!e) return;
    e.preventDefault();
    e.stopPropagation();
    if (profile.images.length > 0 && !isDisliked) {
      setCurrentImageIndex((prev) => (prev === 0 ? profile.images.length - 1 : prev - 1));
    }
  };

  if (isDisliked) {
    return null; // Don't render disliked profiles
  }

  return (
    <Card 
      className={`blockchain-card blockchain-glow ${isCompact ? 'max-w-xs' : 'max-w-md'} w-full mx-auto overflow-hidden ${isCompact ? 'h-[400px]' : 'h-[70vh]'} relative cursor-pointer
        ${isAnimating === "right" ? "animate-slide-right" : ""}
        ${isAnimating === "left" ? "animate-slide-left" : ""}
      `}
      onClick={handleViewProfile}
    >
      <div 
        className="h-full bg-gradient-to-b from-transparent to-black/70 relative flex flex-col"
        style={{
          backgroundImage: `url(${profile.images[currentImageIndex] || "/placeholder.svg"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {profile.images.length > 1 && (
          <>
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/20 backdrop-blur-sm border-white/10 hover:bg-black/40"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4 text-white" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/20 backdrop-blur-sm border-white/10 hover:bg-black/40"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4 text-white" />
            </Button>
            
            <div className="absolute top-4 left-0 right-0 flex justify-center gap-1 z-10">
              {profile.images.map((_, index) => (
                <div 
                  key={index} 
                  className={`w-1.5 h-1.5 rounded-full ${currentImageIndex === index ? 'bg-white' : 'bg-white/30'}`}
                />
              ))}
            </div>
          </>
        )}

        {profile.walletConnected && (
          <div className="absolute top-4 right-4 bg-love-blue/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 animate-pulse-slow z-10">
            <Sparkles className="h-3 w-3 text-love-blue" />
            <span className="text-xs font-semibold text-white">Verified on Chain</span>
          </div>
        )}
        
        <div className="mt-auto p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
          <div className="flex items-end justify-between mb-2">
            <div>
              <h2 className={`${isCompact ? 'text-xl' : 'text-2xl'} font-bold`}>{profile.name}, {profile.age}</h2>
              <div className="flex items-center text-white/80 text-sm mb-2">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{profile.location}</span>
              </div>
            </div>
          </div>
          
          <p className={`text-sm text-white/90 mb-3 ${isCompact ? 'line-clamp-1' : 'line-clamp-2'}`}>{profile.bio}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {profile.interests.slice(0, isCompact ? 2 : 3).map((interest, index) => (
              <Badge 
                key={index}
                variant="outline" 
                className="bg-white/10 hover:bg-white/20 text-white border-white/20"
              >
                {interest}
              </Badge>
            ))}
          </div>
          
          <div className="flex justify-between gap-4 mt-4" onClick={e => e.stopPropagation()}>
            <Button 
              size={isCompact ? "default" : "lg"}
              variant="outline" 
              className="rounded-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 hover:text-white text-white flex-1"
              onClick={handleDislike}
            >
              <X className={`${isCompact ? 'h-4 w-4' : 'h-5 w-5'}`} />
            </Button>
            <Button
              size={isCompact ? "default" : "lg"}
              variant="outline"
              className="rounded-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 hover:text-white text-white"
              onClick={handleViewProfile}
            >
              <Eye className={`${isCompact ? 'h-4 w-4' : 'h-5 w-5'}`} />
            </Button>
            <Button 
              size={isCompact ? "default" : "lg"}
              className="rounded-full bg-love-purple hover:bg-love-purple/90 text-white flex-1 btn-primary-glow"
              onClick={handleLike}
            >
              <Heart className={`${isCompact ? 'h-4 w-4' : 'h-5 w-5'}`} />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;
