import { useEffect, useState } from "react";
import type { Usuario } from "./tipos";

const USERS_API_URL = "https://jsonplaceholder.typicode.com/users";

// Desafio: componente LinhaUsuario para cada <tr> recebendo o usuário via props
interface LinhaUsuarioProps {
  usuario: Usuario;
}

export function LinhaUsuario({ usuario }: LinhaUsuarioProps) {
  return (
    <tr className="user-row">
      <td className="user-name">
        <span className="user-avatar-badge">{usuario.name.charAt(0)}</span>
        <span>{usuario.name}</span>
      </td>
      <td>
        <a
          href={`mailto:${usuario.email}`}
          className="user-email-link"
          title={`Enviar e-mail para ${usuario.name}`}
        >
          ✉️ {usuario.email}
        </a>
      </td>
      <td className="user-city">🏙️ {usuario.address?.city}</td>
      <td className="user-company">🏢 {usuario.company?.name}</td>
    </tr>
  );
}

export default function TabelaUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregarUsuarios() {
      setCarregando(true);
      setErro(null);
      try {
        const resposta = await fetch(USERS_API_URL);
        if (!resposta.ok) {
          throw new Error(`Erro HTTP: ${resposta.status} - Falha ao obter dados dos usuários.`);
        }
        const dados: Usuario[] = await resposta.json();
        setUsuarios(dados);
      } catch (err) {
        setErro(err instanceof Error ? err.message : "Erro inesperado ao consultar usuários");
      } finally {
        setCarregando(false);
      }
    }

    carregarUsuarios();
  }, []);

  return (
    <div className="exercise-content">
      {carregando && (
        <div className="state-badge loading-state">
          <span className="spinner"></span>
          <span>Carregando tabela de usuários...</span>
        </div>
      )}

      {erro && (
        <div className="state-badge error-state">
          <span>⚠️ {erro}</span>
        </div>
      )}

      {!carregando && !erro && usuarios.length === 0 && (
        <div className="state-badge empty-state">
          <span>Nenhum usuário cadastrado.</span>
        </div>
      )}

      {!carregando && !erro && usuarios.length > 0 && (
        <div className="table-responsive-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Cidade</th>
                <th>Empresa</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <LinhaUsuario key={u.id} usuario={u} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
