class AutenticacaoDeUsuario {
  private usuarios: Map<string, string> = new Map();

  registrarUsuario(usuario: string, senha: string): void {
    this.usuarios.set(usuario, senha);
  }

  autenticarUsuario(usuario: string, senha: string): boolean {
    const senhaArmazenada = this.usuarios.get(usuario);
    return senhaArmazenada === senha;
  }
}

const autenticacao = new AutenticacaoDeUsuario();
autenticacao.registrarUsuario("alice", "senha123");
autenticacao.registrarUsuario("bob", "outrasenha");

const usuarioAutenticado = autenticacao.autenticarUsuario("alice", "senha123");

console.log();

if (usuarioAutenticado) {
  console.log("Usuário autenticado com sucesso!");
} else {
  console.log("Falha na autenticação do Usuário!");
}

console.log();
