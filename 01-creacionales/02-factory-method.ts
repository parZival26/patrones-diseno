/**
 * ! Factory Method:
 * El patrón Factory Method permite crear objetos sin especificar
 * la clase exacta del objeto que se creará.
 *
 * En lugar de eso, delegamos la creación de objetos a subclases o métodos
 * que encapsulan esta lógica.
 *
 * * Es útil cuando una clase no puede anticipar la clase
 * * de objetos que debe crear.
 *
 * https://refactoring.guru/es/design-patterns/factory-method
 *
 */

import { COLORS } from "../helpers/colors.ts";

interface Hamburger {
  prepare(): void;
}

class ChickenHamburger implements Hamburger {
  prepare(): void {
    console.log("Preparando una hamburguesa de %cpollo", COLORS.yellow);
  }
}

class BeefHamburger implements Hamburger {
  prepare(): void {
    console.log("Preparando una hamburguesa de %ccarne", COLORS.red);
  }
}

class PlantsHamburger implements Hamburger {
  prepare(): void {
    console.log("Preparando una hamburguesa de %cplantas", COLORS.green);
  }
}

abstract class Restaurant {
  protected abstract createHamburger(): Hamburger;

  orderHamburger(): void {
    const hamburger = this.createHamburger();
    hamburger.prepare();
  }
}

class ChickenRestaurant extends Restaurant {
  createHamburger(): Hamburger {
    return new ChickenHamburger();
  }
}

class BeefRestaurant extends Restaurant {
  createHamburger(): Hamburger {
    return new BeefHamburger();
  }
}

class PlantsRestaurant extends Restaurant {
  createHamburger(): Hamburger {
    return new PlantsHamburger();
  }
}

function main() {
  let restaurant: Restaurant;

  const burgerType = prompt(
    "¿Qué tipo de hamburguesa te gustaría? (pollo/carne/plantas):"
  );
  switch (burgerType) {
    case "pollo":
      restaurant = new ChickenRestaurant();
      break;

    case "carne":
      restaurant = new BeefRestaurant();
      break;

    case "plantas":
      restaurant = new PlantsRestaurant();
      break;

    default:
      throw new Error(
        "Tipo de hamburguesa no válido. Por favor elige 'pollo' o 'carne'."
      );
  }
  restaurant.orderHamburger();
}

main();
