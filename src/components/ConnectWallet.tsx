import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const ConnectWallet = () => {
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  const handleConnectWallet = () => {
    setIsConnected(true);
    toast({
      title: "Wallet Connected",
      description: "Your wallet has been successfully connected!",
    });
  };

  return (
    <Button 
      className="btn-primary-glow" 
      size="sm"
      onClick={handleConnectWallet}
    >
      {isConnected ? "Connected" : "Connect Wallet"}
    </Button>
  );
};

export default ConnectWallet; 