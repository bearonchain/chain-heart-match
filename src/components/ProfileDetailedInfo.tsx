import { UserProfile } from "@/types/userTypes";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Wallet,
  User,
  Briefcase,
  GraduationCap,
  Globe,
  Music,
  Coffee,
  Book,
  Code,
  Heart
} from "lucide-react";

interface ProfileDetailedInfoProps {
  profile: UserProfile;
}

const ProfileDetailedInfo = ({ profile }: ProfileDetailedInfoProps) => {
  // Extended profile information based on interests
  const getDetailedInfo = (profile: UserProfile) => {
    switch (profile.name) {
      case "Emma":
        return {
          occupation: "Senior Yoga Instructor & Crypto Educator",
          education: "BS in Computer Science, Certified Yoga Instructor",
          languages: ["English", "Sanskrit", "Python"],
          favoriteBooks: ["The Bitcoin Standard", "Light on Yoga"],
          musicTaste: ["Meditation Music", "Electronic", "World Music"],
          idealDate: "A yoga session followed by a deep discussion about DeFi over organic tea"
        };
      case "James":
        return {
          occupation: "Lead Blockchain Developer at ETH Labs",
          education: "MS in Distributed Systems",
          languages: ["English", "Solidity", "Rust"],
          favoriteBooks: ["Mastering Ethereum", "The Art of French Cooking"],
          musicTaste: ["Jazz", "Classical", "Ambient"],
          idealDate: "Cooking a gourmet meal while explaining the latest blockchain protocols"
        };
      case "Sophie":
        return {
          occupation: "NFT Artist & Creative Director",
          education: "BFA in Digital Arts",
          languages: ["English", "French", "Processing"],
          favoriteBooks: ["The Story of Art", "Token Economy"],
          musicTaste: ["Alternative", "Indie Electronic", "Synthwave"],
          idealDate: "Gallery hopping followed by creating digital art together"
        };
      case "Michael":
        return {
          occupation: "DeFi Protocol Researcher",
          education: "PhD in Financial Engineering",
          languages: ["English", "Japanese", "Haskell"],
          favoriteBooks: ["DeFi and the Future of Finance", "The Trail Runner's Companion"],
          musicTaste: ["Tech House", "Progressive Metal", "Ambient"],
          idealDate: "Mountain biking followed by a discussion about tokenomics"
        };
      case "Olivia":
        return {
          occupation: "Senior Smart Contract Auditor",
          education: "MS in Cybersecurity",
          languages: ["English", "Spanish", "Solidity"],
          favoriteBooks: ["Smart Contract Security", "The Art of Movement"],
          musicTaste: ["Latin", "Electronic", "Pop"],
          idealDate: "Salsa dancing class followed by a blockchain security workshop"
        };
      default:
        return null;
    }
  };

  const detailedInfo = getDetailedInfo(profile);

  if (!detailedInfo) return null;

  return (
    <Card className="p-6 blockchain-card mt-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium flex items-center gap-2 mb-3">
            <Briefcase className="h-5 w-5 text-love-purple" />
            Career
          </h2>
          <p className="text-muted-foreground">{detailedInfo.occupation}</p>
        </div>

        <Separator />

        <div>
          <h2 className="text-lg font-medium flex items-center gap-2 mb-3">
            <GraduationCap className="h-5 w-5 text-love-purple" />
            Education
          </h2>
          <p className="text-muted-foreground">{detailedInfo.education}</p>
        </div>

        <Separator />

        <div>
          <h2 className="text-lg font-medium flex items-center gap-2 mb-3">
            <Globe className="h-5 w-5 text-love-purple" />
            Languages
          </h2>
          <div className="flex flex-wrap gap-2">
            {detailedInfo.languages.map((lang, index) => (
              <Badge 
                key={index}
                variant="outline" 
                className="bg-white/10 hover:bg-white/20 text-foreground border-white/20"
              >
                {lang}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h2 className="text-lg font-medium flex items-center gap-2 mb-3">
            <Book className="h-5 w-5 text-love-purple" />
            Favorite Books
          </h2>
          <div className="space-y-1">
            {detailedInfo.favoriteBooks.map((book, index) => (
              <p key={index} className="text-muted-foreground">{book}</p>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h2 className="text-lg font-medium flex items-center gap-2 mb-3">
            <Music className="h-5 w-5 text-love-purple" />
            Music Taste
          </h2>
          <div className="flex flex-wrap gap-2">
            {detailedInfo.musicTaste.map((genre, index) => (
              <Badge 
                key={index}
                variant="outline" 
                className="bg-white/10 hover:bg-white/20 text-foreground border-white/20"
              >
                {genre}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h2 className="text-lg font-medium flex items-center gap-2 mb-3">
            <Heart className="h-5 w-5 text-love-purple" />
            Ideal First Date
          </h2>
          <p className="text-muted-foreground">{detailedInfo.idealDate}</p>
        </div>
      </div>
    </Card>
  );
};

export default ProfileDetailedInfo; 