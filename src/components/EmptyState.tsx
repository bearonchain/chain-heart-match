
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface EmptyStateProps {
  onReset: () => void;
}

const EmptyState = ({ onReset }: EmptyStateProps) => {
  return (
    <div className="blockchain-card blockchain-glow max-w-md w-full mx-auto p-8 flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-love-light-purple/30 flex items-center justify-center mb-6 animate-float">
        <Heart className="h-8 w-8 text-love-purple" />
      </div>
      <h2 className="text-2xl font-bold mb-2">No more profiles</h2>
      <p className="text-muted-foreground mb-6">
        You've seen all available profiles. Check back later or reset to see them again.
      </p>
      <Button onClick={onReset} className="btn-primary-glow">
        Reset Profiles
      </Button>
    </div>
  );
};

export default EmptyState;
