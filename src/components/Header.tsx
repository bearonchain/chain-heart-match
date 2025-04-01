
import { useState } from "react";
import { Heart, UserRound, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Header = () => {
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  const handleConnectWallet = () => {
    setIsConnected(true);
    toast({
      title: "Wallet connected",
      description: "Your wallet has been successfully connected.",
    });
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-border">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-love-purple" fill="#8B5CF6" />
          <h1 className="text-xl font-bold bg-gradient-blockchain bg-clip-text text-transparent">
            LoveOnChain
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {!isConnected ? (
            <Button 
              className="btn-primary-glow" 
              size="sm"
              onClick={handleConnectWallet}
            >
              Connect Wallet
            </Button>
          ) : (
            <>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground hover:text-foreground"
              >
                <MessageCircle className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground hover:text-foreground"
              >
                <UserRound className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
