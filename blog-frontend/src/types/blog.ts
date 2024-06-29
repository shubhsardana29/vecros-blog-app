export interface Blog {
    id: number;
    title: string;
    content: string;
    category: string;
    authorId: number;
    author: {
      name: string;
    };
    createdAt: string;
    updatedAt: string;
  }