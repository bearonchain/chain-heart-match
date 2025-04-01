import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { UserProfile } from "@/types/userTypes";
import { Button } from "@/components/ui/button";
import ProfileCard from "@/components/ProfileCard";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";

const PROFILE_STATUS_KEY = 'chainHeartMatch_profileStatus';

interface ProfileShowcaseProps {
  profiles: UserProfile[];
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
}

const ProfileShowcase = ({ profiles, onLike, onDislike }: ProfileShowcaseProps) => {
  const [availableProfiles, setAvailableProfiles] = useState<UserProfile[]>([]);

  useEffect(() => {
    // Filter out disliked profiles
    const profileStatus = localStorage.getItem(PROFILE_STATUS_KEY);
    const statuses = profileStatus ? JSON.parse(profileStatus) : {};
    const filtered = profiles.filter(profile => !statuses[profile.id] || statuses[profile.id] !== 'disliked');
    setAvailableProfiles(filtered);
  }, [profiles]);

  const handleDislike = (id: string) => {
    // Remove the profile from the available profiles immediately
    setAvailableProfiles(prev => prev.filter(profile => profile.id !== id));
    // Call the parent's onDislike handler
    onDislike(id);
  };

  if (availableProfiles.length === 0) return null;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold bg-gradient-blockchain bg-clip-text text-transparent mb-6 text-center">
        Discover New Connections
      </h2>
      
      <Carousel className="w-full max-w-3xl">
        <CarouselContent className="-ml-2 md:-ml-4">
          {availableProfiles.map((profile) => (
            <CarouselItem key={profile.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <ProfileCard 
                  profile={profile} 
                  onLike={onLike} 
                  onDislike={handleDislike}
                  isCompact={true}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {availableProfiles.length > 1 && (
          <div className="flex justify-center mt-4 gap-2">
            <CarouselPrevious className="relative static left-0 translate-y-0 mr-2" />
            <CarouselNext className="relative static right-0 translate-y-0 ml-2" />
          </div>
        )}
      </Carousel>
    </div>
  );
};

export default ProfileShowcase;
