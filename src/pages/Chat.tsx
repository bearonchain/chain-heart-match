import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { UserProfile } from "@/types/userTypes";
import { mockUsers } from "@/data/mockUsers";
import { ArrowLeft, Send, Sparkles } from "lucide-react";

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
}

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      senderId: "current-user",
      receiverId: "1",
      content: "Hey! I love your profile. Would you like to discuss blockchain technology?",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    },
    {
      id: "2",
      senderId: "1",
      receiverId: "current-user",
      content: "Thank you! I'd love to chat about blockchain. What aspects interest you the most?",
      timestamp: new Date(Date.now() - 3000000), // 50 minutes ago
    },
    {
      id: "3",
      senderId: "current-user",
      receiverId: "1",
      content: "I'm particularly interested in DeFi and smart contracts. Have you worked on any interesting projects?",
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  // Filter users to show only matches
  const matches = mockUsers.slice(0, 3); // For demo, showing first 3 users as matches

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: "current-user",
      receiverId: selectedUser.id,
      content: newMessage,
      timestamp: new Date(),
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="container pt-24 pb-16 px-4">
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Discover
        </Link>

        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 bg-gradient-blockchain bg-clip-text text-transparent">Messages</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left sidebar - Matches list */}
            <Card className="p-4 blockchain-card h-[600px]">
              <h2 className="text-lg font-semibold mb-4">Your Matches</h2>
              <ScrollArea className="h-[calc(100%-2rem)]">
                <div className="space-y-2">
                  {matches.map((match) => (
                    <div key={match.id}>
                      <button
                        className={`w-full p-3 rounded-lg flex items-center gap-3 transition-colors
                          ${selectedUser?.id === match.id 
                            ? 'bg-love-purple/20 text-love-purple' 
                            : 'hover:bg-accent'
                          }`}
                        onClick={() => setSelectedUser(match)}
                      >
                        <div className="relative">
                          <img
                            src={match.images[0]}
                            alt={match.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          {match.walletConnected && (
                            <div className="absolute -top-1 -right-1 bg-love-blue/20 backdrop-blur-sm p-1 rounded-full">
                              <Sparkles className="h-3 w-3 text-love-blue" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-medium">{match.name}</div>
                          <div className="text-sm text-muted-foreground truncate">
                            {match.location}
                          </div>
                        </div>
                      </button>
                      <Separator className="my-2" />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>

            {/* Right side - Chat area */}
            <Card className="md:col-span-2 p-4 blockchain-card h-[600px] flex flex-col">
              {selectedUser ? (
                <>
                  {/* Chat header */}
                  <div className="flex items-center gap-3 p-2 border-b">
                    <img
                      src={selectedUser.images[0]}
                      alt={selectedUser.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium">{selectedUser.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {selectedUser.walletConnected ? 'Verified on Chain' : 'Not Verified'}
                      </div>
                    </div>
                  </div>

                  {/* Messages area */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages
                        .filter(msg => 
                          (msg.senderId === "current-user" && msg.receiverId === selectedUser.id) ||
                          (msg.senderId === selectedUser.id && msg.receiverId === "current-user")
                        )
                        .map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.senderId === "current-user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                                message.senderId === "current-user"
                                  ? "bg-love-purple text-white"
                                  : "bg-accent/50 backdrop-blur-sm"
                              }`}
                            >
                              <p className="mb-1 whitespace-pre-wrap break-words">{message.content}</p>
                              <p className={message.senderId === "current-user" ? "text-xs text-white/70" : "text-xs text-muted-foreground"}>
                                {formatTime(message.timestamp)}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </ScrollArea>

                  {/* Message input */}
                  <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1"
                    />
                    <Button 
                      type="submit" 
                      className="btn-primary-glow"
                      disabled={!newMessage.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  Select a match to start chatting
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat; 