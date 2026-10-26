// Interfaces compartilhadas baseadas nos slides e na API JSONPlaceholder

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface Post {
  userId?: number;
  id: number;
  title: string;
  body: string;
}

export interface Usuario {
  id: number;
  name: string;
  username?: string;
  email: string;
  address: {
    city: string;
    street?: string;
    suite?: string;
    zipcode?: string;
  };
  phone?: string;
  website?: string;
  company: {
    name: string;
    catchPhrase?: string;
  };
}

export interface Comentario {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
