 import DataUtil from "./DataUtil";

class Pessoa {
    nome: string;
    email: string;
    nasc: string;

    constructor(nome: string, email: string, nasc: string) {
        this.nome = nome;
        this.email = email;
        this.nasc = nasc;
    }

    imprimir(): void {
        console.log(this.nome);
        console.log(this.email);
        console.log("Data Nasc.: " + this.nasc);
        console.log("Idade: " + this.idade(this.nasc) + " anos");
        console.log("Anos Bissextos: " + this.numBissextos());
    }

    public idade(nasc: any): number {
        const hoje = new Date();
        let datan:any;
        if(typeof nasc === "string"){
            const ano: number = parseInt(nasc.substring(6, 10));
            const mes: number = parseInt(nasc.substring(3, 5)) - 1;
            const dia: number = parseInt(nasc.substring(0, 2));
            datan = new Date(ano, mes, dia);
        } else {
            datan = nasc;
        }

        let idade: number = hoje.getFullYear() - datan.getFullYear();
        const m: number = hoje.getMonth() - datan.getMonth();

        if (m < 0 || (m === 0 && hoje.getDate() < datan.getDate())) {
            idade--;
        }

        return idade;
    }

    public numBissextos() {
        const ano: number = parseInt(this.nasc.substring(6, 10));
        const hoje = new Date();
        const anoatual = hoje.getFullYear();
        let quant: number = 0;

        for (let x = ano; x <= anoatual; x++) {
            if (DataUtil.isBissexto(x)) {
                
                quant++;
            }
        }
        return quant;
    }

}

const cliente = new Pessoa("Bruno Henrique", "bruno.oliveira258@fatec.sp.gov.br", "30/09/2004");

cliente.imprimir();

console.log(cliente.idade(new Date(1965,10,1)));