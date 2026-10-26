import { useEffect, useState } from "react";
import type { Comentario } from "./tipos";

export default function ComentariosPost() {
  const [postId, setPostId] = useState<number>(1);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    // Desafio: usar AbortController no cleanup para suportar digitação rápida
    const controller = new AbortController();

    // Validação para evitar disparar IDs vazios ou inválidos fora do range 1 a 100
    if (isNaN(postId) || postId < 1 || postId > 100) {
      setComentarios([]);
      setCarregando(false);
      setErro("Informe um ID de post válido entre 1 e 100.");
      return () => controller.abort();
    }

    async function buscarComentarios() {
      setCarregando(true);
      setErro(null);
      try {
        const resposta = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
          { signal: controller.signal }
        );

        if (!resposta.ok) {
          throw new Error(`Erro HTTP: ${resposta.status} - Falha ao buscar comentários do Post #${postId}`);
        }

        const dados: Comentario[] = await resposta.json();
        setComentarios(dados);
      } catch (err) {
        if ((err as Error).name === "AbortError") {
          // Requisição cancelada pelo usuário trocando de ID rapidamente
          return;
        }
        setErro(err instanceof Error ? err.message : "Erro ao carregar comentários");
      } finally {
        setCarregando(false);
      }
    }

    buscarComentarios();

    // Cleanup: cancela a requisição anterior se o postId mudar antes de responder
    return () => {
      controller.abort();
    };
  }, [postId]);

  return (
    <div className="exercise-content">
      {/* Controles do Post ID */}
      <div className="search-controls-wrapper">
        <label className="input-group-label">
          <span>Selecione ou digite o ID do Post (1 a 100):</span>
          <div className="number-stepper-box">
            <button
              type="button"
              className="stepper-btn"
              onClick={() => setPostId((prev) => Math.max(1, prev - 1))}
              disabled={postId <= 1}
            >
              -
            </button>
            <input
              type="number"
              min={1}
              max={100}
              value={postId}
              onChange={(e) => setPostId(Number(e.target.value))}
              className="custom-input number-input"
            />
            <button
              type="button"
              className="stepper-btn"
              onClick={() => setPostId((prev) => Math.min(100, prev + 1))}
              disabled={postId >= 100}
            >
              +
            </button>
          </div>
        </label>

        {/* Quantidade total de comentários */}
        {!carregando && !erro && (
          <div className="counter-badge">
            Total de comentários no Post #{postId}: <strong>{comentarios.length}</strong>
          </div>
        )}
      </div>

      {carregando && (
        <div className="state-badge loading-state">
          <span className="spinner"></span>
          <span>Buscando comentários do Post #{postId}...</span>
        </div>
      )}

      {erro && (
        <div className="state-badge error-state">
          <span>⚠️ {erro}</span>
        </div>
      )}

      {!carregando && !erro && comentarios.length === 0 && (
        <div className="state-badge empty-state">
          <span>Nenhum comentário encontrado para o post selecionado.</span>
        </div>
      )}

      {!carregando && !erro && comentarios.length > 0 && (
        <div className="comments-list">
          {comentarios.map((c) => (
            <div key={c.id} className="comment-card">
              <div className="comment-header">
                <div className="comment-author-info">
                  <span className="comment-author-name">👤 {c.name}</span>
                  <a href={`mailto:${c.email}`} className="comment-email-link">
                    ✉️ {c.email}
                  </a>
                </div>
                <span className="comment-id-tag">#{c.id}</span>
              </div>
              <p className="comment-body">{c.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
