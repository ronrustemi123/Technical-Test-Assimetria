export interface Article {
  id: number;
  title: string;
  headline: string;
  content: string;
  category: string;
  createdAt: string;
}

export interface ArticlesType {
  articles: Article[];
  totalCount: number;
  page: number;
  pageSize: number;
}
