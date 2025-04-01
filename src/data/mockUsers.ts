import { UserProfile } from "../types/userTypes";

export const mockUsers: UserProfile[] = [
  {
    id: "1",
    name: "Emma",
    age: 28,
    bio: "Crypto enthusiast and yoga instructor. Looking for someone to share adventures and discuss blockchain technology with.",
    location: "San Francisco",
    images: ["/images/emma/1.png", "/images/emma/2.png", "/images/emma/3.png"],
    interests: ["Cryptocurrency", "Yoga", "Travel", "Reading"],
    walletConnected: true
  },
  {
    id: "2",
    name: "James",
    age: 32,
    bio: "Blockchain developer by day, chef by night. I believe in decentralization and perfectly seared steaks.",
    location: "New York",
    images: ["/images/james/1.png", "/images/james/2.png", "/images/james/3.png", "/images/james/4.png"],
    interests: ["Blockchain", "Cooking", "Hiking", "Photography"],
    walletConnected: true
  },
  {
    id: "3",
    name: "Sophie",
    age: 26,
    bio: "NFT artist looking for meaningful connections. I value authenticity and creative minds.",
    location: "Austin",
    images: ["/images/sophie/1.png", "/images/sophie/2.png", "/images/sophie/3.png"],
    interests: ["Art", "NFTs", "Music", "Philosophy"],
    walletConnected: true
  },
  {
    id: "4",
    name: "Michael",
    age: 30,
    bio: "DeFi researcher and mountain biker. I enjoy deep conversations about the future of finance and adrenaline-filled weekends.",
    location: "Seattle",
    images: ["/images/michael/1.png", "/images/michael/2.png"],
    interests: ["DeFi", "Mountain Biking", "Economics", "Sci-Fi"],
    walletConnected: true
  },
  {
    id: "5",
    name: "Olivia",
    age: 27,
    bio: "Smart contract auditor with a passion for dance. Looking for someone who can keep up with both technical discussions and dance moves.",
    location: "Miami",
    images: ["/images/olivia/1.png", "/images/olivia/2.png"],
    interests: ["Smart Contracts", "Dancing", "Cybersecurity", "Beach"],
    walletConnected: true
  }
];
