import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { UserProfile } from "@/types/userTypes";
import { Upload, X, Plus, Heart, Edit2, Save, Camera } from "lucide-react";
import { mockUsers } from "@/data/mockUsers";

const PROFILE_STATUS_KEY = 'chainHeartMatch_profileStatus';
const MY_PROFILE_KEY = 'chainHeartMatch_myProfile';

interface Interest {
  id: string;
  name: string;
}

const defaultInterests = [
  "Blockchain", "DeFi", "NFTs", "Web3", "Crypto Trading",
  "Smart Contracts", "DAOs", "Mining", "Tokenomics", "Metaverse",
  "Gaming", "Art", "Music", "Sports", "Travel"
].map((name, index) => ({ id: `interest-${index + 1}`, name }));

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [likedProfiles, setLikedProfiles] = useState<UserProfile[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Load profile from localStorage
    const savedProfile = localStorage.getItem(MY_PROFILE_KEY);
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      setProfile(parsedProfile);
      setSelectedInterests(parsedProfile.interests || []);
      setImages(parsedProfile.images || []);
    }

    // Load liked profiles
    const profileStatus = localStorage.getItem(PROFILE_STATUS_KEY);
    const statuses = profileStatus ? JSON.parse(profileStatus) : {};
    const likedIds = Object.entries(statuses)
      .filter(([_, status]) => status === 'liked')
      .map(([id]) => id);
    
    const liked = mockUsers.filter(user => likedIds.includes(user.id));
    setLikedProfiles(liked);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Convert files to URLs
    const newImages = Array.from(files).map(file => URL.createObjectURL(file));
    setImages(prev => [...prev, ...newImages]);

    toast({
      title: "Images uploaded",
      description: `${files.length} image(s) added to your profile`,
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSave = () => {
    if (!profile) return;

    const updatedProfile: UserProfile = {
      ...profile,
      interests: selectedInterests,
      images: images,
    };

    localStorage.setItem(MY_PROFILE_KEY, JSON.stringify(updatedProfile));
    setProfile(updatedProfile);
    setIsEditing(false);

    toast({
      title: "Profile saved",
      description: "Your changes have been saved successfully",
    });
  };

  return (
    <div className="min-h-screen w-full bg-background pt-24 pb-16">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold bg-gradient-blockchain bg-clip-text text-transparent mb-8">
            {profile ? 'My Profile' : 'Create Profile'}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Images */}
            <div>
              <Card className="p-6 blockchain-card">
                <h2 className="text-xl font-semibold mb-4">Profile Images</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden blockchain-glow">
                      <img src={image} alt={`Profile ${index + 1}`} className="w-full h-full object-cover" />
                      {isEditing && (
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  {isEditing && images.length < 4 && (
                    <label className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/50 hover:border-muted-foreground cursor-pointer flex items-center justify-center">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      <div className="text-center">
                        <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Add Photos</span>
                      </div>
                    </label>
                  )}
                </div>
                {isEditing ? (
                  <Button onClick={handleSave} className="w-full btn-primary-glow">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                ) : (
                  <Button onClick={() => setIsEditing(true)} className="w-full">
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </Card>

              {/* Liked Profiles */}
              <Card className="mt-8 p-6 blockchain-card">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Heart className="h-5 w-5 text-love-purple" />
                  Liked Profiles
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {likedProfiles.map(profile => (
                    <div key={profile.id} className="relative rounded-lg overflow-hidden blockchain-glow">
                      <img src={profile.images[0]} alt={profile.name} className="w-full aspect-square object-cover" />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                        <p className="text-white font-semibold">{profile.name}, {profile.age}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Right Column - Profile Info */}
            <div>
              <Card className="p-6 blockchain-card">
                <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Name</label>
                    <Input
                      placeholder="Your name"
                      value={profile?.name || ''}
                      disabled={!isEditing}
                      onChange={e => setProfile(prev => prev ? { ...prev, name: e.target.value } : null)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Age</label>
                    <Input
                      type="number"
                      placeholder="Your age"
                      value={profile?.age || ''}
                      disabled={!isEditing}
                      onChange={e => setProfile(prev => prev ? { ...prev, age: parseInt(e.target.value) || 0 } : null)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Location</label>
                    <Input
                      placeholder="Your location"
                      value={profile?.location || ''}
                      disabled={!isEditing}
                      onChange={e => setProfile(prev => prev ? { ...prev, location: e.target.value } : null)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Bio</label>
                    <Textarea
                      placeholder="Tell us about yourself..."
                      value={profile?.bio || ''}
                      disabled={!isEditing}
                      onChange={e => setProfile(prev => prev ? { ...prev, bio: e.target.value } : null)}
                      className="min-h-[100px]"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Interests</label>
                    <div className="flex flex-wrap gap-2">
                      {defaultInterests.map(interest => (
                        <Badge
                          key={interest.id}
                          variant={selectedInterests.includes(interest.name) ? "default" : "outline"}
                          className={`cursor-pointer ${
                            !isEditing ? 'cursor-default' : ''
                          } ${
                            selectedInterests.includes(interest.name)
                              ? 'bg-love-purple hover:bg-love-purple/90'
                              : 'bg-white/10 hover:bg-white/20'
                          }`}
                          onClick={() => isEditing && toggleInterest(interest.name)}
                        >
                          {interest.name}
                        </Badge>
                      ))}
                    </div>
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

export default Profile; 