import { fetchUnsplashImage, getUnsplashQueryForTopic } from '../utils/unsplashService';

export interface Author {
  name: string;
  avatar: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string | (() => Promise<string>);
  readTime: number;
  publishedDate: string;
  author: Author;
  categories: string[];
  tags: string[];
  isFeatured?: boolean;
}

const author = {
  name: 'Sourav Suvra',
  avatar: '/images/sourav.png'
};

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of AI: Transforming Industries",
    slug: "ai-future",
    excerpt: "Exploring how artificial intelligence is revolutionizing various sectors and reshaping our understanding of technology.",
    coverImage: () => fetchUnsplashImage('artificial intelligence robot technology'),
    readTime: 7,
    publishedDate: "2024-01-15",
    author,
    categories: ["AI & Automation"],
    tags: ["Artificial Intelligence", "Machine Learning", "Future Tech"],
    isFeatured: true
  },
  {
    id: 2,
    title: "Modern Software Engineering Practices",
    slug: "software-engineering-best-practices",
    excerpt: "A deep dive into contemporary software development methodologies, tools, and strategies for building scalable applications.",
    coverImage: () => fetchUnsplashImage('software development coding computer'),
    readTime: 6,
    publishedDate: "2024-02-20",
    author,
    categories: ["Tech Tutorials"],
    tags: ["DevOps", "Agile", "Best Practices"],
    isFeatured: true
  },
  {
    id: 3,
    title: "Career Development in Tech",
    slug: "tech-career-growth",
    excerpt: "Strategies for navigating and accelerating your career in the rapidly evolving technology landscape.",
    coverImage: () => fetchUnsplashImage('professional career growth success'),
    readTime: 5,
    publishedDate: "2024-03-10",
    author,
    categories: ["Personal Insights"],
    tags: ["Career Growth", "Tech Industry", "Networking"],
    isFeatured: false
  },
  {
    id: 4,
    title: "Cybersecurity in the Digital Age",
    slug: "cybersecurity-digital-age",
    excerpt: "Understanding the critical importance of cybersecurity and how to protect digital assets in an increasingly connected world.",
    coverImage: () => fetchUnsplashImage(getUnsplashQueryForTopic('Cybersecurity')),
    readTime: 8,
    publishedDate: "2024-04-05",
    author,
    categories: ["Industry News"],
    tags: ["Security", "Digital Protection", "Privacy"],
    isFeatured: false
  },
  {
    id: 5,
    title: "Cloud Computing Revolution",
    slug: "cloud-computing-trends",
    excerpt: "Exploring the latest trends in cloud computing and how they are transforming business infrastructure and operations.",
    coverImage: () => fetchUnsplashImage(getUnsplashQueryForTopic('Cloud Computing')),
    readTime: 6,
    publishedDate: "2024-05-12",
    author,
    categories: ["Learning Resources"],
    tags: ["Cloud Services", "Infrastructure", "Scalability"],
    isFeatured: false
  },
  {
    id: 6,
    title: "Blockchain Beyond Cryptocurrency",
    slug: "blockchain-applications",
    excerpt: "Discovering innovative blockchain applications beyond cryptocurrencies, from supply chain to healthcare.",
    coverImage: () => fetchUnsplashImage(getUnsplashQueryForTopic('Blockchain')),
    readTime: 7,
    publishedDate: "2024-06-18",
    author,
    categories: ["Portfolio Projects"],
    tags: ["Decentralization", "Innovation", "Tech Trends"],
    isFeatured: true
  },
  {
    id: 7,
    title: "Exploring the World: A Digital Nomad's Guide",
    slug: "digital-nomad-travelling",
    excerpt: "Insights into balancing work and travel, top destinations for remote workers, and tips for a successful nomadic lifestyle.",
    coverImage: () => fetchUnsplashImage(getUnsplashQueryForTopic('Travel')),
    readTime: 6,
    publishedDate: "2024-07-05",
    author,
    categories: ["Tips & Tricks"],
    tags: ["Remote Work", "Digital Nomad", "Travel Tips"],
    isFeatured: false
  },
  {
    id: 8,
    title: "Step-by-Step React Tutorial: Building a Modern Web App",
    slug: "react-web-app-tutorial",
    excerpt: "A comprehensive guide to building a full-featured React application from scratch, covering best practices and advanced techniques.",
    coverImage: () => fetchUnsplashImage(getUnsplashQueryForTopic('Web Development')),
    readTime: 9,
    publishedDate: "2024-08-15",
    author,
    categories: ["Tech Tutorials"],
    tags: ["React", "Web Development", "JavaScript"],
    isFeatured: true
  },
  {
    id: 9,
    title: "Scaling Your Business in the Digital Economy",
    slug: "business-growth-strategies",
    excerpt: "Innovative strategies for business development, leveraging digital technologies and modern marketing techniques.",
    coverImage: () => fetchUnsplashImage(getUnsplashQueryForTopic('Business')),
    readTime: 7,
    publishedDate: "2024-09-20",
    author,
    categories: ["Industry News"],
    tags: ["Entrepreneurship", "Digital Strategy", "Growth"],
    isFeatured: false
  }
];

export const getFeaturedBlogs = (count: number = 3): BlogPost[] => {
  return blogPosts.filter(post => post.isFeatured).slice(0, count);
};

export const getBlogBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};
