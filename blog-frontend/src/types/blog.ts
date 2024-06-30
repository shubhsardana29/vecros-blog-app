export interface Blog {
    id: number;
    title: string;
    content: string;
    category: string;
    authorId: number;
    author: {
      email: string;
      name: string;
    };
    createdAt: string;
  updatedAt: string;
  sharedAt?: string;
  permission?: 'view' | 'edit';
  }