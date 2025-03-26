/**
 * ! Abstract Factory:
 * Es un patrón de diseño que permite crear familias de objetos relacionados
 * sin especificar sus clases concretas.
 *
 * En lugar de crear objetos individuales directamente,
 * creamos fábricas que producen un conjunto de objetos relacionados.
 *
 * * Es útil cuando necesitas crear objetos que son parte de una familia
 * * y quieres asegurarte de que estos objetos se complementen entre sí.
 *
 * https://refactoring.guru/es/design-patterns/abstract-factory
 */

/**
 *  El propósito del Abstract Factory es crear familias de objetos relacionados
 *  (en este caso, hamburguesas y bebidas) sin especificar las clases concretas
 *  de cada uno de esos objetos en el código principal.
 */

import { COLORS } from "../helpers/colors.ts";

interface Burger {
  prepare(): void;
}

interface Drink {
  pour(): void;
}

class ChickenBurger implements Burger {
  prepare(): void {
    console.log("Preparing a delicious %cChicken Burger...", COLORS.yellow);
  }
}

class BeefBurger implements Burger {
  prepare(): void {
    console.log("Preparing a delicious %cBeef Burger...", COLORS.red);
  }
}

class Water implements Drink {
  pour(): void {
    console.log("Pouring a refreshing glass of %cwater...", COLORS.blue);
  }
}

class Soda implements Drink {
  pour(): void {
    console.log("Pouring a refreshing glass of %csoda...", COLORS.pink);
  }
}

interface RestaurantFactory {
  createBurguer(): Burger;
  createDrink(): Drink;
}

class FastFoodRestaurantFactory implements RestaurantFactory {
  createBurguer(): Burger {
    return new BeefBurger();
  }
  createDrink(): Drink {
    return new Soda();
  }
}

class HealthyFoodRestaurantFactory implements RestaurantFactory {
  createBurguer(): Burger {
    return new ChickenBurger();
  }
  createDrink(): Drink {
    return new Water();
  }
}

function main(factory: RestaurantFactory) {
  const burger = factory.createBurguer();
  const drink = factory.createDrink();

  burger.prepare();
  drink.pour();
}

console.log("\n%cPedido del menú regular:", COLORS.green);
main(new FastFoodRestaurantFactory());

console.log("\n%cPedido del menú saludable:", COLORS.green);
main(new HealthyFoodRestaurantFactory());
