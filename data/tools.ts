export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  url?: string;
  icon?: string;
}

export const toolsData: Tool[] = [
  // Development Tools
  {
    id: "1",
    name: "NeoVim",
    description: "Primary code editor with productive plugins",
    category: "Development",
    url: "https://neovim.io/",
    icon: "/tools/neovim.png",
  },
  {
    id: "2",
    name: "ZSH",
    description: "Powerful shell with Oh My Zsh configuration",
    category: "Development",
    url: "https://www.zsh.org/",
    icon: "/tools/zsh.png",
  },
  {
    id: "3",
    name: "Postman",
    description: "API testing tool",
    category: "Development",
    url: "https://www.postman.com/",
    icon: "/tools/postman.png",
  },
  {
    id: "4",
    name: "Chrome",
    description: "Primary web browser for development and testing",
    category: "Development",
    url: "https://www.google.com/chrome/",
    icon: "/tools/chrome.png",
  },
  // Productivity
  {
    id: "5",
    name: "Obsidian",
    description: "Local-first knowledge base and note-taking",
    category: "Productivity",
    url: "https://obsidian.md/",
    icon: "/tools/obsidian.png",
  },
  // Design
  {
    id: "6",
    name: "Eraser",
    description: "Collaborative diagramming and documentation tool",
    category: "Design",
    url: "https://www.eraser.io/",
    icon: "/tools/eraser.png",
  },
];

