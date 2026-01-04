export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  isPinned: boolean;
  isNew: boolean;
  isPublished: boolean;
  readingTime: string;
  coverImage?: string;
  content: string;
}

export interface BlogMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  isPinned: boolean;
  isNew: boolean;
  isPublished: boolean;
  readingTime: string;
  coverImage?: string;
}

export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  isPinned?: boolean;
  isNew?: boolean;
  isPublished?: boolean;
  coverImage?: string;
}
