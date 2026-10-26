# Exercícios Paradigmas de Programação - Front-End 🚀
### Uni-FACEF • Centro Universitário Municipal de Franca

> **Autor:** Guilherme Araki  
> **Disciplina:** Paradigmas de Programação II • Front-End  
> **Tecnologias:** React 19, TypeScript, Vite, CSS Moderno com Identidade Visual Uni-FACEF  

---

## 📖 Sobre o Projeto

Este projeto reúne a solução completa e modular dos **Exercícios de 1 a 6** (páginas 44 a 49 do material didático), explorando conceitos essenciais do desenvolvimento moderno em React:

- Consumo de API REST pública com `fetch` ([JSONPlaceholder](https://jsonplaceholder.typicode.com/))
- Controle do ciclo de vida assíncrono com `useEffect` e arrays de dependências (`[]`, `[postId]`, `[tentativa]`)
- Renderização de listas utilizando `map` com chaves (`key`) únicas e estáveis
- Filtragem no cliente e gerenciamento de estado derivado com `filter`
- Tratamento de todos os estados de interface: **Carregando**, **Erro** e **Vazio**
- Cancelamento de requisições concorrentes via `AbortController` (cleanup)

---

## 📋 Lista dos Exercícios Implementados

| Exercício | Arquivo | Descrição & Desafios |
| :--- | :--- | :--- |
| **Ex. 1 • Slide 44** | [`src/ListaPosts.tsx`](./src/ListaPosts.tsx) | Lista numerada (`<ol>`) de posts do usuário 1 com exibição do `body` em letra menor e cinza. |
| **Ex. 2 • Slide 45** | [`src/TabelaUsuarios.tsx`](./src/TabelaUsuarios.tsx) | Tabela estruturada de usuários com link `mailto:`, exibindo dados aninhados e componente `LinhaUsuario`. |
| **Ex. 3 • Slide 46** | [`src/TarefasFiltro.tsx`](./src/TarefasFiltro.tsx) | Filtro de tarefas (*Todas*, *Pendentes*, *Concluídas*) com botões destacados e tarefas concluídas riscadas. |
| **Ex. 4 • Slide 47** | [`src/BuscaPosts.tsx`](./src/BuscaPosts.tsx) | Campo de busca em tempo real com input controlado, case-insensitive e contador "X de 100". |
| **Ex. 5 • Slide 48** | [`src/ComentariosPost.tsx`](./src/ComentariosPost.tsx) | Busca de comentários aninhados de post por ID com proteção contra digitação rápida via `AbortController`. |
| **Ex. 6 • Slide 49** | [`src/BotaoRecarregar.tsx`](./src/BotaoRecarregar.tsx) | Botão para forçar recarregamento via contador de tentativas, timestamp da última atualização e simulação de erro. |

---

## 🎨 Identidade Visual Uni-FACEF

A interface foi projetada utilizando a paleta oficial da autarquia municipal **Uni-FACEF**:
- **Azul Corporativo / Marinho:** `#002D62`, `#07172F`, `#0A2348`
- **Laranja & Dourado:** `#F57C00`, `#FFB300`
- **Layout:** Apresentação individual e centralizada de cada exercício em cartões modulares e responsivos.

---

## 🛠️ Como Executar Localmente

1. Clone o repositório:
```bash
git clone https://github.com/guilhermearaki/exercicios-paradigmas-programacao.git
cd exercicios-paradigmas-programacao
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Abra no navegador:
```
http://localhost:5173
```

---

## 🔒 Segurança e Boas Práticas

- Nenhuma chave de API ou credencial privada exposta.
- Arquivo `.gitignore` configurado para isolar variáveis de ambiente (`.env`), certificados e dependências (`node_modules`).
- Código tipado estaticamente com **TypeScript**, garantindo segurança e integridade de tipos.
