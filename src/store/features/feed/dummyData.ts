import { Post, User, Comment, Community } from './types';

const dummyUsers: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    username: 'alexj',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Full-stack developer passionate about React and TypeScript. Building cool stuff every day.',
    followersCount: 1205,
    followingCount: 342,
    postsCount: 87,
    isVerified: true,
    joinedDate: '2022-03-15',
  },
  {
    id: '2',
    name: 'Sarah Chen',
    username: 'sarahc',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'UI/UX Designer & Frontend Developer. Love creating beautiful and functional interfaces.',
    followersCount: 892,
    followingCount: 156,
    postsCount: 124,
    isVerified: false,
    joinedDate: '2021-11-20',
  },
  {
    id: '3',
    name: 'Mike Rodriguez',
    username: 'mikerod',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Backend engineer working with Node.js and Python. Coffee enthusiast ☕',
    followersCount: 567,
    followingCount: 234,
    postsCount: 45,
    isVerified: true,
    joinedDate: '2023-01-10',
  },
];

const dummyCommunities: Community[] = [
  { id: '1', name: 'Web Development', slug: 'webdev', membersCount: 15420 },
  { id: '2', name: 'Design', slug: 'design', membersCount: 8930 },
  { id: '3', name: 'JavaScript', slug: 'javascript', membersCount: 22150 },
  { id: '4', name: 'React', slug: 'react', membersCount: 18760 },
];

const postTemplates = [
  {
    title: "Building a Modern React Application with TypeScript",
    content: "Just finished implementing a complex state management solution using Redux Toolkit. The type safety and developer experience improvements are incredible! Here's what I learned along the way...",
    image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "CSS Grid vs Flexbox: When to Use Each",
    content: "After working with both for years, I've developed some clear guidelines for when to choose CSS Grid over Flexbox and vice versa. The key is understanding their different strengths.",
  },
  {
    title: "My Journey Learning Next.js",
    content: "Started my Next.js journey last month and I'm already in love with the framework. The file-based routing and built-in optimizations make development so much smoother.",
    image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Database Design Best Practices",
    content: "Working on a large-scale application taught me the importance of proper database design. Here are the key principles I follow for scalable database architecture.",
  },
  {
    title: "The Future of Web Development",
    content: "With the rapid evolution of web technologies, it's exciting to think about what's coming next. Edge computing, WebAssembly, and AI integration are changing everything.",
    image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export const generateDummyUser = (id: string): User => {
  if (id === 'current-user') {
    return {
      id: 'current-user',
      name: 'You',
      username: 'you',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      bio: 'Your profile bio here',
      followersCount: 450,
      followingCount: 123,
      postsCount: 34,
      isVerified: false,
      joinedDate: '2023-06-01',
    };
  }
  
  const userIndex = parseInt(id) % dummyUsers.length;
  return { ...dummyUsers[userIndex], id };
};

export const generateDummyPosts = (count: number, startIndex: number = 0): Post[] => {
  return Array.from({ length: count }, (_, index) => {
    const postIndex = startIndex + index;
    const template = postTemplates[postIndex % postTemplates.length];
    const author = generateDummyUser((postIndex % 3 + 1).toString());
    const community = dummyCommunities[postIndex % dummyCommunities.length];
    
    return {
      id: `post-${postIndex}`,
      title: template.title,
      content: template.content,
      image: template.image,
      author,
      community,
      createdAt: new Date(Date.now() - postIndex * 3600000).toISOString(),
      lovesCount: Math.floor(Math.random() * 500) + 10,
      commentsCount: Math.floor(Math.random() * 50) + 2,
      isLoved: Math.random() > 0.7,
      isBookmarked: Math.random() > 0.8,
      lovedBy: dummyUsers.slice(0, Math.min(3, Math.floor(Math.random() * 3) + 1)),
    };
  });
};

export const generateDummyComments = (postId: string): Comment[] => {
  const commentTexts = [
    "Great post! This really helped me understand the concept better.",
    "Thanks for sharing your experience. I've been struggling with this exact issue.",
    "Excellent explanation! Do you have any resources for learning more about this?",
    "I've had similar experiences. Your approach sounds much better than what I was doing.",
    "This is exactly what I needed to read today. Thank you!",
  ];
  
  return commentTexts.map((content, index) => ({
    id: `comment-${postId}-${index}`,
    content,
    author: generateDummyUser((index % 3 + 1).toString()),
    createdAt: new Date(Date.now() - index * 1800000).toISOString(),
    lovesCount: Math.floor(Math.random() * 10),
    isLoved: Math.random() > 0.8,
  }));
};