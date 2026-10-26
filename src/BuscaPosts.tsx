import { useEffect, useState } from "react";
import type { Post } from "./tipos";

const ALL_POSTS_API_URL = "https://jsonplaceholder.typicode.com/posts";

export default function BuscaPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [busca, setBusca] = useState<string>("");
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  // Busca todos os posts uma única vez com []
  useEffect(() => {
    async function carregarTodosPosts() {
      setCarregando(true);
      setErro(null);
      try {
        const resposta = await fetch(ALL_POSTS_API_URL);
        if (!resposta.ok) {
          throw new Error(`Erro HTTP: ${resposta.status} - Falha ao carregar lista de 100 posts.`);
        }
        const dados: Post[] = await resposta.json();
        setPosts(dados);
      } catch (err) {
        setErro(err instanceof Error ? err.message : "Erro desconhecido ao obter posts");
      } finally {
        setCarregando(false);
      }
    }

    carregarTodosPosts();
  }, []);

  // Filtro no cliente que ignora maiúsculas e minúsculas
  const encontrados = posts.filter((p) =>
    p.title.toLowerCase().includes(busca.toLowerCase().trim())
  );

  return (
    <div className="exercise-content">
      {/* Campo de pesquisa controlado e contador */}
      <div className="search-controls-wrapper">
        <div className="search-input-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="custom-input search-input"
            placeholder="Digite para filtrar os posts por título..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            disabled={carregando || erro !== null}
          />
          {busca && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setBusca("")}
              title="Limpar busca"
            >
              ✕
            </button>
          )}
        </div>

        {/* Desafio: mostrar quantos posts foram encontrados ("7 de 100") */}
        {!carregando && !erro && (
          <div className="counter-badge">
            Encontrados: <strong>{encontrados.length}</strong> de <strong>{posts.length}</strong> posts
          </div>
        )}
      </div>

      {carregando && (
        <div className="state-badge loading-state">
          <span className="spinner"></span>
          <span>Carregando os 100 posts da API...</span>
        </div>
      )}

      {erro && (
        <div className="state-badge error-state">
          <span>⚠️ {erro}</span>
        </div>
      )}

      {/* Exibir "Nenhum resultado" quando a lista ficar vazia */}
      {!carregando && !erro && encontrados.length === 0 && (
        <div className="state-badge empty-state">
          <span>Nenhum resultado encontrado para &quot;{busca}&quot;.</span>
        </div>
      )}

      {!carregando && !erro && encontrados.length > 0 && (
        <div className="posts-cards-grid">
          {encontrados.map((post) => (
            <article key={post.id} className="post-card">
              <div className="post-card-header">
                <span className="post-id-tag">Post #{post.id}</span>
                {post.userId && (
                  <span className="post-author-tag">Autor {post.userId}</span>
                )}
              </div>
              <h4 className="post-card-title">{post.title}</h4>
              <p className="post-card-body">{post.body}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
