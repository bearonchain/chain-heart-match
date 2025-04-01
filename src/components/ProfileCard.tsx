
import { useState } from "react";
import { UserProfile } from "@/types/userTypes";
import { Card } from "@/components/ui/card";
import { Heart, X, Sparkles, MapPin, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface ProfileCardProps {
  profile: UserProfile;
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
  isCompact?: boolean;
}

const ProfileCard = ({ profile, onLike, onDislike, isCompact = false }: ProfileCardProps) => {
  const [isAnimating, setIsAnimating] = useState<string | null>(null);

  const handleLike = () => {
    setIsAnimating("right");
    setTimeout(() => {
      onLike(profile.id);
      setIsAnimating(null);
    }, 300);
  };

  const handleDislike = () => {
    setIsAnimating("left");
    setTimeout(() => {
      onDislike(profile.id);
      setIsAnimating(null);
    }, 300);
  };

  return (
    <Card 
      className={`blockchain-card blockchain-glow ${isCompact ? 'max-w-xs' : 'max-w-md'} w-full mx-auto overflow-hidden ${isCompact ? 'h-[400px]' : 'h-[70vh]'} relative
        ${isAnimating === "right" ? "animate-slide-right" : ""}
        ${isAnimating === "left" ? "animate-slide-left" : ""}
      `}
    >
      <div 
        className="h-full bg-gradient-to-b from-transparent to-black/70 relative flex flex-col"
        style={{
          backgroundImage: `url(${profile.images[0] || "/placeholder.svg"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {profile.walletConnected && (
          <div className="absolute top-4 right-4 bg-love-blue/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 animate-pulse-slow">
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
          
          <div className="flex justify-between gap-4 mt-4">
            <Button 
              size={isCompact ? "default" : "lg"}
              variant="outline" 
              className="rounded-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 hover:text-white text-white flex-1"
              onClick={handleDislike}
            >
              <X className={`${isCompact ? 'h-4 w-4' : 'h-5 w-5'}`} />
            </Button>
            <Link to={`/profile/${profile.id}`} className="flex-none">
              <Button
                size={isCompact ? "default" : "lg"}
                variant="outline"
                className="rounded-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 hover:text-white text-white"
              >
                <Eye className={`${isCompact ? 'h-4 w-4' : 'h-5 w-5'}`} />
              </Button>
            </Link>
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
