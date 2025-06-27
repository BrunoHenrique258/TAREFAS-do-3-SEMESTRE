class ContaBancaria {
  saldo: number = 0;

  depositar(valor: number): void {
    this.saldo += valor;
  }

  sacar(valor: number): boolean {
    if (this.saldo >= valor) {
      this.saldo -= valor;
      return true;
    }
    return false;
  }
}

class Cliente {
  nome: string;
  cpf: string;
  nasc: Date;
  nomemae: string;
  conta: ContaBancaria;

  constructor(
    nome: string,
    cpf: string,
    nasc: Date,
    nomemae: string,
    conta: ContaBancaria
  ) {
    this.nome = nome;
    this.cpf = cpf;
    this.nasc = nasc;
    this.nomemae = nomemae;
    this.conta = conta;
  }
}

const conta = new ContaBancaria();
const data = new Date("01/11/1965");
const cliente = new Cliente("Henrique", "12345678901", data, "Glória", conta);
cliente.conta.depositar(100);
console.log("\nSaldo: R$", cliente.conta.saldo);
cliente.conta.sacar(50);
console.log("Saldo: R$", cliente.conta.saldo);
if (cliente.conta.sacar(40)) {
  console.log("Saque efetuado com sucesso!");
} else {
  console.log("Não foi possível efetuar o saque. Fundos insuficientes!");
}
console.log();
console.log("Saldo: R$", cliente.conta.saldo);
