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
    name: "VS Code",
    description: "Primary code editor with extensive extensions",
    category: "Development",
    url: "https://code.visualstudio.com/",
    icon: "/tools/vscode.png",
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
    name: "Thunder Client",
    description: "Lightweight REST API testing extension for VS Code",
    category: "Development",
    url: "https://www.thunderclient.com/",
    icon: "/tools/thunderclient.png",
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