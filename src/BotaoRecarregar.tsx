import { useEffect, useState } from "react";
import type { Todo } from "./tipos";

export default function BotaoRecarregar() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);
  const [tentativa, setTentativa] = useState<number>(0);
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState<string | null>(null);

  // Desafio: permitir alternar para uma URL inválida para ver o erro e usar o botão como 'Tentar de novo'
  const [simularUrlInvalida, setSimularUrlInvalida] = useState<boolean>(false);

  const API_URL = simularUrlInvalida
    ? "https://jsonplaceholder.typicode.com/todoss-rota-inexistente"
    : "https://jsonplaceholder.typicode.com/todos?userId=1";

  useEffect(() => {
    async function carregar() {
      setCarregando(true);
      setErro(null);
      try {
        const resposta = await fetch(API_URL);
        if (!resposta.ok) {
          throw new Error(`Erro HTTP ${resposta.status}: A rota solicitada (${API_URL}) não foi encontrada.`);
        }
        const dados: Todo[] = await resposta.json();
        setTodos(dados);
        setUltimaAtualizacao(new Date().toLocaleTimeString("pt-BR", { hour12: false }));
      } catch (err) {
        setErro(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, [tentativa, API_URL]);

  return (
    <div className="exercise-content">
      {/* Barra de ação com botão recarregar, hora e toggle do desafio */}
      <div className="reload-controls-wrapper">
        <div className="action-row">
          <button
            type="button"
            className={`action-btn ${erro ? "btn-danger" : "btn-primary"}`}
            onClick={() => setTentativa((prev) => prev + 1)}
            disabled={carregando}
          >
            {carregando ? (
              <>
                <span className="spinner spinner-white"></span>
                <span>Buscando...</span>
              </>
            ) : erro ? (
              <>🔄 Tentar de novo</>
            ) : (
              <>🔄 Recarregar Dados</>
            )}
          </button>

          <div className="stats-pill">
            <span>Tentativas efetuadas: <strong>{tentativa}</strong></span>
          </div>

          {ultimaAtualizacao && !erro && (
            <div className="time-pill">
              🕒 Última atualização: <strong>{ultimaAtualizacao}</strong>
            </div>
          )}
        </div>

        {/* Toggle do Desafio para demonstrar erro e recuperação */}
        <label className="challenge-toggle-label">
          <input
            type="checkbox"
            checked={simularUrlInvalida}
            onChange={(e) => {
              setSimularUrlInvalida(e.target.checked);
              setTentativa((prev) => prev + 1);
            }}
          />
          <span>
            <strong>Desafio do Slide:</strong> Simular URL incorreta (<code>/todoss</code>) para testar erro e botão &ldquo;Tentar de novo&rdquo;
          </span>
        </label>
      </div>

      {carregando && (
        <div className="state-badge loading-state">
          <span className="spinner"></span>
          <span>Atualizando tarefas via fetch...</span>
        </div>
      )}

      {erro && (
        <div className="state-badge error-state">
          <div>
            <strong>⚠️ Falha na requisição:</strong>
            <p className="error-description">{erro}</p>
            <p className="error-hint">
              Dica do desafio: Desmarque a opção &quot;Simular URL incorreta&quot; acima e clique em &quot;Tentar de novo&quot;!
            </p>
          </div>
        </div>
      )}

      {!carregando && !erro && todos.length === 0 && (
        <div className="state-badge empty-state">
          <span>Nenhuma tarefa encontrada.</span>
        </div>
      )}

      {!carregando && !erro && todos.length > 0 && (
        <ul className="task-list">
          {todos.map((t) => (
            <li
              key={t.id}
              className={`task-item ${t.completed ? "task-completed" : "task-pending"}`}
            >
              <span className="task-status-icon">
                {t.completed ? "☑️" : "⬜"}
              </span>
              <span className={`task-title ${t.completed ? "line-through" : ""}`}>
                {t.title}
              </span>
              <span className={`task-badge ${t.completed ? "badge-success" : "badge-warning"}`}>
                {t.completed ? "Concluída" : "Pendente"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
