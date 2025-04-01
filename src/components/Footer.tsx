import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="text-sm text-muted-foreground">
          © 2024 Love on Chain. Made with ❤️ by Bearonchain
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/bearonchain/chain-heart-match"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="ghost" size="icon">
              <Github className="h-5 w-5" />
            </Button>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 