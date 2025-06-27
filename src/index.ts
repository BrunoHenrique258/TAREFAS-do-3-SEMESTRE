// Exemplo de coesão (Calculadora coesa)
class Calculadora {
  somar(a: number, b: number): number {
    return a + b;
  }

  subtrair(a: number, b: number): number {
    return a - b;
  }

  multiplicar(a: number, b: number): number {
    return a * b;
  }

  dividir(a: number, b: number): number {
    if (b === 0) throw new Error("Divisão por zero não é permitida.");
    return a / b;
  }
}

const calc = new Calculadora();
console.log("Soma:", calc.somar(10, 5));
console.log("Divisão:", calc.dividir(10, 2));

// Exemplo de acoplamento fraco
class Motor {
  ligar(): void {
    console.log("Motor ligado.");
  }
}

class Carro {
  private motor: Motor;

  constructor(motor: Motor) {
    this.motor = motor;
  }

  ligarMotor(): void {
    this.motor.ligar();
  }
}

const motor = new Motor();
const carro = new Carro(motor);
carro.ligarMotor();
