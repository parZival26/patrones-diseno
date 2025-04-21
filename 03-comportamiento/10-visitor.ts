/**
 * !Patrón Visitor
 *
 * El patrón Visitor es un patrón de diseño de comportamiento
 * que te permite separar algoritmos de los objetos sobre
 * los que operan.
 *
 * * Es útil cuando necesitas añadir nuevas operaciones a
 * * clases estables sin cambiar su código.
 *
 * https://refactoring.guru/es/design-patterns/visitor
 */

import { COLORS } from "../helpers/colors.ts";

/**
 * Contexto: Imagina que estás diseñando un sistema para un parque
 * temático con diferentes tipos de atracciones:
 * montañas rusas, casas del terror y ruedas de la fortuna.
 *
 * Cada atracción tiene su propio precio de entrada y ofrece un descuento
 * dependiendo del tipo de visitante (niño, adulto o adulto mayor).
 *
 * Aquí es donde entra el patrón Visitor, que permite aplicar operaciones
 * específicas (como calcular el precio con descuento) dependiendo tanto
 * de la atracción como del tipo de visitante,
 * sin modificar las clases originales.
 */

interface Guest {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void;
  visitHauntedHouse(hauntedHouse: HauntedHouse): void;
  visitFerrisWheel(ferrisWheel: FerrisWheel): void;
}

interface Attraction {
  accept(guest: Guest): void;
  getPrice(): number;
}

class RollerCoaster implements Attraction {
  accept(guest: Guest): void {
    guest.visitRollerCoaster(this);
  }
  private price = 50;

  public getPrice(): number {
    return this.price;
  }
}

class HauntedHouse implements Attraction {
  accept(guest: Guest): void {
    guest.visitHauntedHouse(this);
  }
  private price = 40;

  public getPrice(): number {
    return this.price;
  }
}

class FerrisWheel implements Attraction {
  accept(guest: Guest): void {
    guest.visitFerrisWheel(this);
  }
  private price = 30;

  public getPrice(): number {
    return this.price;
  }
}

class ChildGuest implements Guest {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void {
    console.log(
      `Niño visitando la montaña rusa. Precio: $${
        rollerCoaster.getPrice() * 0.5
      }`
    );
  }
  visitHauntedHouse(hauntedHouse: HauntedHouse): void {
    console.log(
      `Niño visitando la casa del terror. Precio: $${
        hauntedHouse.getPrice() * 0.7
      }`
    );
  }
  visitFerrisWheel(ferrisWheel: FerrisWheel): void {
    console.log(
      `Niño visitando la rueda de la fortuna. Precio: $${
        ferrisWheel.getPrice() * 0.6
      }`
    );
  }
}

class AdultGuest implements Guest {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void {
    console.log(
      `Adulto visitando la montaña rusa. Precio: $${rollerCoaster.getPrice()}`
    );
  }
  visitHauntedHouse(hauntedHouse: HauntedHouse): void {
    console.log(
      `Adulto visitando la casa del terror. Precio: $${hauntedHouse.getPrice()}`
    );
  }
  visitFerrisWheel(ferrisWheel: FerrisWheel): void {
    console.log(
      `Adulto visitando la rueda de la fortuna. Precio: $${ferrisWheel.getPrice()}`
    );
  }
}

class SeniorGuest implements Guest {
  visitRollerCoaster(rollerCoaster: RollerCoaster): void {
    console.log(
      `Adulto mayor visitando la montaña rusa. Precio: $${
        rollerCoaster.getPrice() * 0.8
      }`
    );
  }
  visitHauntedHouse(hauntedHouse: HauntedHouse): void {
    console.log(
      `Adulto mayor visitando la casa del terror. Precio: $${
        hauntedHouse.getPrice() * 0.9
      }`
    );
  }
  visitFerrisWheel(ferrisWheel: FerrisWheel): void {
    console.log(
      `Adulto mayor visitando la rueda de la fortuna. Precio: $${
        ferrisWheel.getPrice() * 0.85
      }`
    );
  }
}

function main() {
  const attractions: Attraction[] = [
    new RollerCoaster(),
    new HauntedHouse(),
    new FerrisWheel(),
  ];

  attractions.forEach((attraction) => {
    console.log(
      `Atracción: ${
        attraction.constructor.name
      }, Precio: $${attraction.getPrice()}`
    );
  });

  console.log("\n%cVisitante niño:", COLORS.green);
  const child = new ChildGuest();
  attractions.forEach((attraction) => {
    attraction.accept(child);
  });

  console.log("\n%cVisitante adulto:", COLORS.purple);
  const adult = new AdultGuest();
  attractions.forEach((attraction) => {
    attraction.accept(adult);
  });

  console.log("\n%cVisitante adulto mayor:", COLORS.orange);
  const senior = new SeniorGuest();
  attractions.forEach((attraction) => {
    attraction.accept(senior);
  });
}

main();
