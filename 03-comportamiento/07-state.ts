/**
 * ! Patrón State
 * Este patrón permite a un objeto cambiar su comportamiento
 * cuando su estado interno cambia.
 *
 * * Es útil cuando un objeto tiene un comportamiento que depende de su estado
 * * y debe cambiar su comportamiento en tiempo de ejecución dependiendo de ese estado.
 *
 * https://refactoring.guru/es/design-patterns/state
 */

import { COLORS } from "../helpers/colors.ts";
import { sleep } from "../helpers/sleep.ts";

/**
 * * Objetivo: Implementar el patrón State para simular el funcionamiento
 * * de una máquina expendedora.
 * * La máquina tiene diferentes estados,
 *  * Como Esperando Dinero,
 *  * Seleccionando Producto,
 *  * Entregando Producto,
 * * y su comportamiento varía dependiendo del estado actual.
 */

interface State {
  name: string;

  insertMoney(): void;
  selectProduct(): void;
  dispenseProduct(): void;
}

class VendingMachine {
  private state: State = new WaitingForMoney(this);
  constructor() {}

  insertMoney() {
    this.state.insertMoney();
  }
  selectProduct() {
    this.state.selectProduct();
  }
  dispenseProduct() {
    this.state.dispenseProduct();
  }

  setState(state: State) {
    this.state = state;
    console.log(`Estado cambio a: %c${state.name}`, COLORS.blue);
  }

  getStateName(): string {
    return this.state.name;
  }
}

class WaitingForMoney implements State {
  public name: string = "Esperando Dinero";

  constructor(private vendingMachine: VendingMachine) {}
  insertMoney(): void {
    console.log(
      "Dinero Insertado. %cAhora puedes seleccionar un producto",
      COLORS.green
    );

    this.vendingMachine.setState(new ProductSelected(this.vendingMachine));
  }
  selectProduct(): void {
    console.log("%cPrimero debes de insertar dinero.", COLORS.red);
  }
  dispenseProduct(): void {
    console.log("%cPrimero debes de insertar dinero.", COLORS.red);
  }
}

class ProductSelected implements State {
  public name: string = "Seleccionando Producto";
  constructor(private vendingMachine: VendingMachine) {}

  insertMoney(): void {
    console.log(
      "%cPor favor selecciona un producto dinero ya insertado.",
      COLORS.red
    );
  }
  selectProduct(): void {
    console.log(
      "Producto Seleccionado. %cAhora espera tu producto",
      COLORS.green
    );

    this.vendingMachine.setState(new DispensingProduct(this.vendingMachine));
  }
  dispenseProduct(): void {
    console.log(
      "%cPor favor selecciona un producto dinero ya insertado.",
      COLORS.red
    );
  }
}

class DispensingProduct implements State {
  public name: string = "Seleccionando Producto";
  constructor(private vendingMachine: VendingMachine) {}

  insertMoney(): void {
    console.log(
      "%cPor favor espera a que se entregue el producto.",
      COLORS.red
    );
  }
  selectProduct(): void {
    console.log(
      "%cPor favor espera a que se entregue el producto.",
      COLORS.red
    );
  }
  dispenseProduct(): void {
    console.log(
      "Producto despachado. %cAhora puedes insertar dinero para un nuevo producto",
      COLORS.green
    );
    this.vendingMachine.setState(new WaitingForMoney(this.vendingMachine));
  }
}

async function main() {
  const vendingMachine = new VendingMachine();

  let selectOption: string | null = "4";

  do {
    console.clear();
    console.log(
      `Selecciona una opción: %c${vendingMachine.getStateName()}`,
      COLORS.blue
    );

    console.log("1. Insertar dinero");
    console.log("2. Seleccionar producto");
    console.log("3. Despachar producto");
    console.log("4. Salir");

    selectOption = prompt("Selecciona una opción: ");

    switch (selectOption) {
      case "1":
        vendingMachine.insertMoney();
        break;
      case "2":
        vendingMachine.selectProduct();
        break;
      case "3":
        vendingMachine.dispenseProduct();
        break;
      case "4":
        console.log("Saliendo...");
        break;
      default:
        console.log("%cOpción no válida", COLORS.red);
    }

    await sleep(2000);
  } while (selectOption !== "4");
}

main();
