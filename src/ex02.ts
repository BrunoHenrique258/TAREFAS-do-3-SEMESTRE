class CarrinhoDeCompras {
  itens: string[] = new Array();

  adicionarItem(item: string): void {
    this.itens.push(item);
  }

  removerItem(item: string): void {
    const index = this.itens.indexOf(item, 0);
    if (index !== -1) {
      this.itens.splice(index, 1);
    }
  }

  imprimir() {
    this.itens.forEach(function (value, index, array) {
      console.log(value, index, array);
    });

    /*        for (let i = 0; i < this.itens.length; i++) {
                    console.log(i, this.itens[i]);
                }
        */
  }
}

const carrinho = new CarrinhoDeCompras();
carrinho.adicionarItem("Camiseta");
carrinho.adicionarItem("Calça");
carrinho.adicionarItem("Meia");

console.log("\n", carrinho);
console.log(carrinho.itens);
carrinho.imprimir();
console.log();
carrinho.removerItem("Camiseta");
carrinho.imprimir();

console.log();
