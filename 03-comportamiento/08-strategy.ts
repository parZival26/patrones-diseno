/**
 * ! Patrón Strategy
 *
 * El patrón Strategy es un patrón de diseño de software que define una
 * familia de algoritmos, los encapsula y los hace intercambiables.
 *
 *
 * * Es útil cuando se tiene una clase que tiene un comportamiento que puede
 * * cambiar en tiempo de ejecución y se quiere delegar la responsabilidad de
 * * la implementación a otra clase.
 *
 * https://refactoring.guru/es/design-patterns/strategy
 */

import { COLORS } from "../helpers/colors.ts";

/**
 * !Objetivo: Explicar el patrón Strategy usando un ejemplo donde varios
 * ! patitos compiten en una carrera y cada uno tiene su propia
 * ! estrategia de movimiento (por ejemplo, nadar, volar o caminar).
 */

interface MovementStrategy {
  move(): void;
}

class SwimFast implements MovementStrategy {
  move(): void {
    console.log("%cEl pato nada rápido sobre el agua!", COLORS.blue);
  }
}

class FlyOverWatter implements MovementStrategy {
  move(): void {
    console.log(
      "%cEl pato vuela alto en el cielo sobre el agua!",
      COLORS.yellow
    );
  }
}

class WalkClumbily implements MovementStrategy {
  move(): void {
    console.log("%cEl pato camina torpemente sobre la tierra!", COLORS.green);
  }
}

class Duck {
  constructor(
    private name: string,
    private movementStrategy: MovementStrategy
  ) {
    console.log(`%c${this.name} listo para competir!`, COLORS.blue);
  }

  performMove(): void {
    console.log(`${this.name} se prepara para mover!`);
    this.movementStrategy.move();
  }

  setMovementStrategy(movementStrategy: MovementStrategy): void {
    this.movementStrategy = movementStrategy;
    console.log(`${this.name} ha cambiado su estrategia de movimiento!`);
  }
}

function main() {
  const duck1 = new Duck("Pato 1", new SwimFast());
  const duck2 = new Duck("Pato 2", new FlyOverWatter());
  const duck3 = new Duck("Pato 3", new WalkClumbily());

  console.log("%c¡Que comience la carrera!", COLORS.red);
  duck1.performMove();
  duck2.performMove();
  duck3.performMove();

  duck3.setMovementStrategy(new SwimFast());
  duck3.performMove();
}

main();
