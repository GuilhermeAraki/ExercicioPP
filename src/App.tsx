import { useState } from "react";
import ListaPosts from "./ListaPosts";
import TabelaUsuarios from "./TabelaUsuarios";
import TarefasFiltro from "./TarefasFiltro";
import BuscaPosts from "./BuscaPosts";
import ComentariosPost from "./ComentariosPost";
import BotaoRecarregar from "./BotaoRecarregar";

export default function App() {
  const [filtroExibicao, setFiltroExibicao] = useState<number | "todos">("todos");

  return (
    <div className="app-wrapper">
      {/* ========================================================
          CABEÇALHO COM IDENTIDADE VISUAL UNI-FACEF
          ======================================================== */}
      <header className="header-banner">
        <div className="header-content">
          <div className="institution-pill">
            <span>🏛️ Uni-FACEF • Centro Universitário Municipal de Franca</span>
          </div>

          <h1 className="main-title">
            Exercícios Paradigmas de Programação - Front-End
          </h1>

          <h2 className="main-subtitle">
            Feito por: Guilherme Araki
          </h2>

          <p className="header-description">
            Solução completa dos exercícios de 1 a 6 (páginas 44 a 49) abordando consumo de API REST
            pública (JSONPlaceholder), ciclo de vida do <code>useEffect</code>, manipulação de listas com{" "}
            <code>map</code>, <code>filter</code>, tratamento de estados (carregando, erro e vazio) e
            cancelamento com <code>AbortController</code>.
          </p>

          {/* Navegação Rápida entre os Exercícios */}
          <nav className="nav-bar-container" aria-label="Navegação dos exercícios">
            <button
              type="button"
              className={`nav-pill ${filtroExibicao === "todos" ? "active" : ""}`}
              onClick={() => setFiltroExibicao("todos")}
            >
              Exibir Todos (1 a 6)
            </button>
            <button
              type="button"
              className={`nav-pill ${filtroExibicao === 1 ? "active" : ""}`}
              onClick={() => setFiltroExibicao(1)}
            >
              Ex. 1: Lista de Posts
            </button>
            <button
              type="button"
              className={`nav-pill ${filtroExibicao === 2 ? "active" : ""}`}
              onClick={() => setFiltroExibicao(2)}
            >
              Ex. 2: Tabela de Usuários
            </button>
            <button
              type="button"
              className={`nav-pill ${filtroExibicao === 3 ? "active" : ""}`}
              onClick={() => setFiltroExibicao(3)}
            >
              Ex. 3: Filtro de Status
            </button>
            <button
              type="button"
              className={`nav-pill ${filtroExibicao === 4 ? "active" : ""}`}
              onClick={() => setFiltroExibicao(4)}
            >
              Ex. 4: Busca por Título
            </button>
            <button
              type="button"
              className={`nav-pill ${filtroExibicao === 5 ? "active" : ""}`}
              onClick={() => setFiltroExibicao(5)}
            >
              Ex. 5: Comentários de Post
            </button>
            <button
              type="button"
              className={`nav-pill ${filtroExibicao === 6 ? "active" : ""}`}
              onClick={() => setFiltroExibicao(6)}
            >
              Ex. 6: Botão Recarregar
            </button>
          </nav>
        </div>
      </header>

      {/* ========================================================
          EXIBIÇÃO INDIVIDUAL DE CADA EXERCÍCIO EM DIVS SEPARADAS
          CENTRALIZADOS E JUSTIFICADOS AO CENTRO DA PÁGINA
          ======================================================== */}
      <main className="main-container">

        {/* ----------------------------------------------------
            EXERCÍCIO 1 - PÁGINA 44
            ---------------------------------------------------- */}
        {(filtroExibicao === "todos" || filtroExibicao === 1) && (
          <div id="exercicio-1" className="exercise-card">
            <header className="exercise-header">
              <span className="exercise-badge">Exercício 1 • Slide 44</span>
              <h3 className="exercise-title">Lista de Posts</h3>
              <h4 className="exercise-subtitle">Aplicando fetch + useEffect + map</h4>
              <p className="exercise-description">
                Busca <code>/posts?userId=1</code>, exibe títulos em lista numerada (<code>&lt;ol&gt;</code>),
                trata estados de carregando, erro e vazio, e inclui o <strong>desafio</strong> com o corpo (body) de cada post em letra menor e cinza.
              </p>
            </header>
            <ListaPosts />
          </div>
        )}

        {/* ----------------------------------------------------
            EXERCÍCIO 2 - PÁGINA 45
            ---------------------------------------------------- */}
        {(filtroExibicao === "todos" || filtroExibicao === 2) && (
          <div id="exercicio-2" className="exercise-card">
            <header className="exercise-header">
              <span className="exercise-badge">Exercício 2 • Slide 45</span>
              <h3 className="exercise-title">Tabela de Usuários</h3>
              <h4 className="exercise-subtitle">Objetos aninhados e links mailto:</h4>
              <p className="exercise-description">
                Busca <code>/users</code> e renderiza os dados em uma <code>&lt;table&gt;</code> com colunas de Nome, E-mail (com link mailto:), Cidade e Empresa. Inclui o <strong>desafio</strong> com o subcomponente <code>LinhaUsuario</code> para cada <code>&lt;tr&gt;</code>.
              </p>
            </header>
            <TabelaUsuarios />
          </div>
        )}

        {/* ----------------------------------------------------
            EXERCÍCIO 3 - PÁGINA 46
            ---------------------------------------------------- */}
        {(filtroExibicao === "todos" || filtroExibicao === 3) && (
          <div id="exercicio-3" className="exercise-card">
            <header className="exercise-header">
              <span className="exercise-badge">Exercício 3 • Slide 46</span>
              <h3 className="exercise-title">Tarefas com Filtro de Status</h3>
              <h4 className="exercise-subtitle">Estado derivado com botões</h4>
              <p className="exercise-description">
                Busca <code>/todos?userId=1</code> e exibe tarefas riscando as concluídas. Possui botões para Todas, Pendentes e Concluídas com cálculo derivado via <code>filter</code> (sem estado duplicado). Inclui o <strong>desafio</strong> destacando o botão ativo e contador dinâmico.
              </p>
            </header>
            <TarefasFiltro />
          </div>
        )}

        {/* ----------------------------------------------------
            EXERCÍCIO 4 - PÁGINA 47
            ---------------------------------------------------- */}
        {(filtroExibicao === "todos" || filtroExibicao === 4) && (
          <div id="exercicio-4" className="exercise-card">
            <header className="exercise-header">
              <span className="exercise-badge">Exercício 4 • Slide 47</span>
              <h3 className="exercise-title">Busca por Título</h3>
              <h4 className="exercise-subtitle">Input controlado + filtro sobre dados da API</h4>
              <p className="exercise-description">
                Busca os 100 posts (<code>/posts</code>) uma única vez e realiza a filtragem em tempo real no cliente com <code>input</code> controlado, sem disparar novos fetches e ignorando maiúsculas/minúsculas. Inclui o <strong>desafio</strong> com contador formatado &ldquo;X de 100&rdquo;.
              </p>
            </header>
            <BuscaPosts />
          </div>
        )}

        {/* ----------------------------------------------------
            EXERCÍCIO 5 - PÁGINA 48
            ---------------------------------------------------- */}
        {(filtroExibicao === "todos" || filtroExibicao === 5) && (
          <div id="exercicio-5" className="exercise-card">
            <header className="exercise-header">
              <span className="exercise-badge">Exercício 5 • Slide 48</span>
              <h3 className="exercise-title">Comentários de um Post</h3>
              <h4 className="exercise-subtitle">Dependência no useEffect + rota aninhada</h4>
              <p className="exercise-description">
                Controle numérico (1 a 100) que dispara a busca de comentários aninhados (<code>/posts/$&#123;postId&#125;/comments</code>). Mostra nome, e-mail, texto e total de comentários. Inclui o <strong>desafio</strong> com <code>AbortController</code> no cleanup do <code>useEffect</code>.
              </p>
            </header>
            <ComentariosPost />
          </div>
        )}

        {/* ----------------------------------------------------
            EXERCÍCIO 6 - PÁGINA 49
            ---------------------------------------------------- */}
        {(filtroExibicao === "todos" || filtroExibicao === 6) && (
          <div id="exercicio-6" className="exercise-card">
            <header className="exercise-header">
              <span className="exercise-badge">Exercício 6 • Slide 49</span>
              <h3 className="exercise-title">Botão Recarregar</h3>
              <h4 className="exercise-subtitle">Forçando novo fetch com contador de estado</h4>
              <p className="exercise-description">
                Utiliza <code>tentativa</code> como dependência no <code>useEffect</code> para recarregar a lista a cada clique e exibe o horário da última atualização. Inclui o <strong>desafio</strong> com alternador de rota para testar o tratamento de erro e o botão &ldquo;Tentar de novo&rdquo;.
              </p>
            </header>
            <BotaoRecarregar />
          </div>
        )}

      </main>

      {/* ========================================================
          RODAPÉ INSTITUCIONAL
          ======================================================== */}
      <footer className="footer-section">
        <div className="footer-content">
          <p className="footer-logo-text">Uni-FACEF • Centro Universitário Municipal de Franca</p>
          <p>
            Disciplina de <strong>Paradigmas de Programação II</strong> • Front-End
          </p>
          <p className="footer-author">Desenvolvido com dedicação por Guilherme Araki</p>
        </div>
      </footer>
    </div>
  );
}
