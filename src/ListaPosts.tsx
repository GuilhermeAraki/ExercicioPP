import { useEffect, useState } from "react";
import type { Post } from "./tipos";

const POSTS_API_URL = "https://jsonplaceholder.typicode.com/posts?userId=1";

export default function ListaPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregarPosts() {
      setCarregando(true);
      setErro(null);
      try {
        const resposta = await fetch(POSTS_API_URL);
        if (!resposta.ok) {
          throw new Error(`Erro HTTP: ${resposta.status} - Falha ao carregar posts.`);
        }
        const dados: Post[] = await resposta.json();
        setPosts(dados);
      } catch (err) {
        setErro(err instanceof Error ? err.message : "Erro desconhecido ao carregar posts");
      } finally {
        setCarregando(false);
      }
    }

    carregarPosts();
  }, []);

  return (
    <div className="exercise-content">
      {carregando && (
        <div className="state-badge loading-state">
          <span className="spinner"></span>
          <span>Carregando posts do Usuário 1...</span>
        </div>
      )}

      {erro && (
        <div className="state-badge error-state">
          <span>⚠️ {erro}</span>
        </div>
      )}

      {!carregando && !erro && posts.length === 0 && (
        <div className="state-badge empty-state">
          <span>Nenhum post encontrado.</span>
        </div>
      )}

      {!carregando && !erro && posts.length > 0 && (
        <ol className="post-list">
          {posts.map((post) => (
            <li key={post.id} className="post-item">
              <strong className="post-title">{post.title}</strong>
              {/* Desafio: mostrar também o body de cada post em letra menor e cinza */}
              <p className="post-body">{post.body}</p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
