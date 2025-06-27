class Contato {
  nome: string;
  fone: string;
  email: string;

  constructor(nome: string, fone: string, email: string) {
    this.nome = nome;
    this.fone = fone;
    this.email = email;
  }
}

class Agenda {
  contatos: Contato[] = [];

  adicionarContato(contato: Contato): void {
    this.contatos.push(contato);
  }

  removerContato(contato: Contato): void {
    const index = this.contatos.indexOf(contato, 0);
    if (index !== -1) {
      this.contatos.splice(index, 1);
    }
  }
}

const agenda = new Agenda();
let contato = new Contato("Fulano", "12991991233", "fulano@tal.com.br");
agenda.adicionarContato(contato);
contato = new Contato("Cicrano", "12996993333", "cicrano@tal.com.br");
agenda.adicionarContato(contato);
contato = new Contato("Beltrano", "12994991232", "beltrano@tal.com.br");
agenda.adicionarContato(contato);
contato = new Contato("Fulano", "12991991233", "fulano@tal.com.br");
agenda.removerContato(contato);
console.log(agenda.contatos);
