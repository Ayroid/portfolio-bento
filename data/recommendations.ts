export interface Recommendation {
  id: string;
  name: string;
  description: string;
  category: string;
  url?: string;
  creator?: string;
  icon?: string;
}

export const recommendationsData: Recommendation[] = [
  // YouTube Channels
  {
    id: "1",
    name: "Fireship",
    creator: "Jeff Delaney",
    description: "High-intensity web development tutorials and tech news",
    category: "YouTube",
    url: "https://www.youtube.com/@Fireship",
    icon: "/youtube/fireship.jpg",
  },
  {
    id: "2",
    name: "ThePrimeagen",
    creator: "ThePrimeagen",
    description: "Vim, coding, and developer productivity",
    category: "YouTube",
    url: "https://www.youtube.com/@ThePrimeagen",
    icon: "/youtube/theprimeagen.jpg",
  },
  {
    id: "3",
    name: "Arpit Bhayani",
    creator: "Arpit Bhayani",
    description: "Programming tutorials and tech insights",
    category: "YouTube",
    url: "https://www.youtube.com/@AsliEngineering",
    icon: "/youtube/arpit-bhayani.jpg",
  },
  {
    id: "4",
    name: "Hitesh Choudhary",
    creator: "Hitesh Choudhary",
    description: "Programming tutorials and tech insights",
    category: "YouTube",
    url: "https://www.youtube.com/@HiteshCodeLab",
    icon: "/youtube/hitesh-choudhary.jpg",
  },
  {
    id: "5",
    name: "Piyush Garg",
    creator: "Piyush Garg",
    description: "Tech tutorials and career advice",
    category: "YouTube",
    url: "https://www.youtube.com/@piyushgargdev",
    icon: "/youtube/piyush-garg.jpg",
  },
  {
    id: "6",
    name: "Harkirat Singh",
    creator: "Harkirat Singh",
    description: "Coding tutorials and tech discussions",
    category: "YouTube",
    url: "https://www.youtube.com/@harkirat1",
    icon: "/youtube/harkirat-singh.jpg",
  },
  {
    id: "7",
    name: "AI Engineer",
    creator: "AI Engineer",
    description: "Talks, workshops, events, and training for AI Engineers",
    category: "YouTube",
    url: "https://www.youtube.com/@aiDotEngineer",
    icon: "/youtube/ai-engineer.jpg",
  },
  {
    id: "8",
    name: "Alex Hormozi",
    creator: "Alex Hormozi",
    description: "Business, marketing, and entrepreneurship insights",
    category: "YouTube",
    url: "https://www.youtube.com/@AlexHormozi",
    icon: "/youtube/alex-hormozi.jpg",
  },
  {
    id: "9",
    name: "Raj Shamani",
    creator: "Raj Shamani",
    description: "Entrepreneurship and motivational content",
    category: "Podcast",
    url: "https://www.youtube.com/@rajshamani",
    icon: "/youtube/raj-shamani.jpg",
  },
  {
    id: "10",
    name: "Chris Williamson",
    creator: "Chris Williamson",
    description: "Personal development and productivity",
    category: "Podcast",
    url: "https://www.youtube.com/@ChrisWillx",
    icon: "/youtube/chris-williamson.jpg",
  },
  {
    id: "11",
    name: "Dan Koe",
    creator: "Dan Koe",
    description: "Building in public, content creation, and digital entrepreneurship",
    category: "YouTube",
    url: "https://www.youtube.com/@thedankoe",
    icon: "/youtube/dan-koe.jpg",
  },
];