import { useEffect, useState } from "react";
import type { Todo } from "./tipos";

type Filtro = "todas" | "pendentes" | "concluidas";

const TODOS_API_URL = "https://jsonplaceholder.typicode.com/todos?userId=1";

export default function TarefasFiltro() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);
  const [filtro, setFiltro] = useState<Filtro>("todas");

  useEffect(() => {
    async function carregarTarefas() {
      setCarregando(true);
      setErro(null);
      try {
        const resposta = await fetch(TODOS_API_URL);
        if (!resposta.ok) {
          throw new Error(`Erro HTTP: ${resposta.status} - Falha ao buscar tarefas.`);
        }
        const dados: Todo[] = await resposta.json();
        setTodos(dados);
      } catch (err) {
        setErro(err instanceof Error ? err.message : "Erro ao carregar lista de tarefas");
      } finally {
        setCarregando(false);
      }
    }

    carregarTarefas();
  }, []);

  // Estado derivado: calculando visíveis sem duplicar state
  const visiveis = todos.filter((t) => {
    if (filtro === "pendentes") return !t.completed;
    if (filtro === "concluidas") return t.completed;
    return true;
  });

  return (
    <div className="exercise-content">
      {/* Botões de filtro com destaque do filtro ativo (Desafio) */}
      <div className="filter-controls-container">
        <div className="button-group">
          <button
            type="button"
            className={`filter-btn ${filtro === "todas" ? "active" : ""}`}
            onClick={() => setFiltro("todas")}
          >
            📋 Todas ({todos.length})
          </button>
          <button
            type="button"
            className={`filter-btn ${filtro === "pendentes" ? "active" : ""}`}
            onClick={() => setFiltro("pendentes")}
          >
            ⏳ Pendentes ({todos.filter((t) => !t.completed).length})
          </button>
          <button
            type="button"
            className={`filter-btn ${filtro === "concluidas" ? "active" : ""}`}
            onClick={() => setFiltro("concluidas")}
          >
            ✅ Concluídas ({todos.filter((t) => t.completed).length})
          </button>
        </div>

        {/* Contador N tarefas */}
        <div className="counter-badge">
          Mostrando <strong>{visiveis.length}</strong> de <strong>{todos.length}</strong> tarefas
        </div>
      </div>

      {carregando && (
        <div className="state-badge loading-state">
          <span className="spinner"></span>
          <span>Carregando tarefas do usuário 1...</span>
        </div>
      )}

      {erro && (
        <div className="state-badge error-state">
          <span>⚠️ {erro}</span>
        </div>
      )}

      {!carregando && !erro && visiveis.length === 0 && (
        <div className="state-badge empty-state">
          <span>Nenhuma tarefa encontrada para este filtro.</span>
        </div>
      )}

      {!carregando && !erro && visiveis.length > 0 && (
        <ul className="task-list">
          {visiveis.map((t) => (
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
