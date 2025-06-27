"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataUtil_1 = __importDefault(require("./DataUtil"));
class Pessoa {
    constructor(nome, email, nasc) {
        this.nome = nome;
        this.email = email;
        this.nasc = nasc;
    }
    imprimir() {
        console.log(this.nome);
        console.log(this.email);
        console.log("Data Nasc.: " + this.nasc);
        console.log("Idade: " + this.idade(this.nasc) + " anos");
        console.log("Anos Bissextos: " + this.numBissextos());
    }
    idade(nasc) {
        const hoje = new Date();
        let datan;
        if (typeof nasc === "string") {
            const ano = parseInt(nasc.substring(6, 10));
            const mes = parseInt(nasc.substring(3, 5)) - 1;
            const dia = parseInt(nasc.substring(0, 2));
            datan = new Date(ano, mes, dia);
        }
        else {
            datan = nasc;
        }
        let idade = hoje.getFullYear() - datan.getFullYear();
        const m = hoje.getMonth() - datan.getMonth();
        if (m < 0 || (m === 0 && hoje.getDate() < datan.getDate())) {
            idade--;
        }
        return idade;
    }
    numBissextos() {
        const ano = parseInt(this.nasc.substring(6, 10));
        const hoje = new Date();
        const anoatual = hoje.getFullYear();
        let quant = 0;
        for (let x = ano; x <= anoatual; x++) {
            if (DataUtil_1.default.isBissexto(x)) {
                quant++;
            }
        }
        return quant;
    }
}
const cliente = new Pessoa("Bruno Henrique", "bruno.oliveira258@fatec.sp.gov.br", "30/09/2004");
cliente.imprimir();
console.log(cliente.idade(new Date(1965, 10, 1)));
