import { useState } from "react";
import { Heart, UserRound, MessageCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Link, useLocation } from "react-router-dom";
import ConnectWallet from "./ConnectWallet";

const Header = () => {
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();
  const location = useLocation();
  const isChat = location.pathname === '/chat';
  const isProfile = location.pathname === '/profile';

  const handleConnectWallet = () => {
    setIsConnected(true);
    toast({
      title: "Wallet connected",
      description: "Your wallet has been successfully connected.",
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container flex items-center justify-between h-16 px-4">
        <Link to="/" className="text-xl font-bold bg-gradient-blockchain bg-clip-text text-transparent">
          ChainHeartMatch
        </Link>
        
        <div className="flex items-center gap-2">
          <Link to="/chat">
            <Button
              variant={isChat ? "default" : "ghost"}
              size="icon"
              className={isChat ? "bg-love-purple hover:bg-love-purple/90" : ""}
            >
              <MessageCircle className="h-5 w-5" />
            </Button>
          </Link>
          
          <Link to="/profile">
            <Button
              variant={isProfile ? "default" : "ghost"}
              size="icon"
              className={isProfile ? "bg-love-purple hover:bg-love-purple/90" : ""}
            >
              <User className="h-5 w-5" />
            </Button>
          </Link>

          <ConnectWallet />
        </div>
      </div>
    </header>
  );
};

export default Header;
