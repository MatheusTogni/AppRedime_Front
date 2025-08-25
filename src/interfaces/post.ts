export interface Post {
  id: number;
  titulo: string;
  descricao: string;
  criado_em: string;
  images: string[];
}

// Interface para a resposta da API
export interface PostsResponse {
  posts: Post[];
  total: number;
}
