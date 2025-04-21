/**
 * ! Patrón Template Method
 *
 * El patrón Template Method es un patrón de diseño de comportamiento
 * que define el esqueleto de un algoritmo en una operación,
 * delegando algunos pasos a las subclases.
 *
 * Permite que las subclases redefinan ciertos pasos de un algoritmo
 * sin cambiar su estructura.
 *
 * * Es útil cuando se tiene un algoritmo que sigue una secuencia de pasos
 * * y se quiere permitir a las subclases que redefinan algunos de esos pasos.
 *
 * https://refactoring.guru/es/design-patterns/template-method
 */

import { COLORS } from "../helpers/colors.ts";

/**
 * Contexto: Vamos a implementar un sistema que permite preparar
 * diferentes bebidas calientes, como café y té.
 *
 * Aunque el proceso general para preparar ambas bebidas es similar
 * (hervir agua, añadir el ingrediente principal, servir en una taza),
 * hay pasos específicos que varían dependiendo de la bebida.
 *
 * El patrón Template Method es perfecto para este caso,
 * ya que define un esqueleto general del algoritmo en una clase base
 * y delega los detalles específicos a las subclases.
 */

abstract class HotBeverage {
  prepare(): void {
    this.boilWater();
    this.addMainIngridient();
    this.pourInCup();
    this.addCondiments();
  }

  private boilWater() {
    console.log("Hirviendo agua...");
  }

  private pourInCup() {
    console.log("Sirviendo en la taza");
  }

  protected abstract addMainIngridient(): void;
  protected abstract addCondiments(): void;
}

class Tea extends HotBeverage {
  protected override addMainIngridient(): void {
    console.log("Añadiendo una bolsa de te");
  }
  protected override addCondiments(): void {
    console.log("Añadiendo miel y limon");
  }
}

class Coffe extends HotBeverage {
  protected override addMainIngridient(): void {
    console.log("Añadiendo cafe molido");
  }
  protected override addCondiments(): void {
    console.log("Añadiendo azúcar y leche");
  }
}

function main() {
  console.log("%cPreparando el té", COLORS.green);
  const tea = new Tea();

  tea.prepare();

  console.log("\n%cPreparando cafe", COLORS.brown);
  const coffe = new Coffe();

  coffe.prepare();
}

main();
