export interface User {
  id: string;
  _id: string;
  username: string;
  name: string;
  fullName: string;
  avatar: string;
  bio: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  isVerified: boolean;
  joinedDate: string;
}

export interface Community {
  id: string;
  name: string;
  slug: string;
  membersCount: number;
}
export interface engagementMetrics {
  views: number;
  likes: number;
  comments: number;
}
export interface Post {
  id: string;
  title: string;
  content: string;
  image?: string;
  owner: User;
  community: Community;
  createdAt: string;
  lovesCount: number;
  commentsCount: number;
  engagementMetrics: engagementMetrics;
  isLoved: boolean;
  isBookmarked: boolean;
  lovedBy: User[];
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  lovesCount: number;
  isLoved: boolean;
}

export interface FeedResponse {
  docs: Post[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}
