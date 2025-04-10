/**
 * ! Patrón Bridge
 * Este patrón nos permite desacoplar una abstracción de su implementación,
 * de tal forma que ambas puedan variar independientemente.
 *
 * * Es útil cuando se tienen múltiples implementaciones de una abstracción
 * * Se puede utilizar para separar la lógica de negocio de la lógica de presentación
 * * Se puede utilizar para separar la lógica de la interfaz de usuario también.
 *
 * https://refactoring.guru/es/design-patterns/bridge
 */

import { COLORS } from "../helpers/colors.ts";

interface Ability {
  use(): void;
}

class SwordAttack implements Ability {
  use(): void {
    console.log("Ataca con una %cesapada ferozmente", COLORS.blue);
  }
}

class AxeAttack implements Ability {
  use(): void {
    console.log("Ataca con una %cHacha ferozmente", COLORS.red);
  }
}

class MagicalSpell implements Ability {
  use(): void {
    console.log("Lanza un hechizo %cmágico poderoso", COLORS.purple);
  }
}

class FireballSpell implements Ability {
  use(): void {
    console.log("Lanza una %cbola de fuego!!!", COLORS.orange);
  }
}

abstract class Character {
  constructor(protected ability: Ability) {}

  setAbility(ability: Ability): void {
    this.ability = ability;
  }

  abstract performAbility(): void;
}

class Warrior extends Character {
  override performAbility(): void {
    console.log("El guerrero esta listo para luchar");
    this.ability.use();
  }
}

class Wizard extends Character {
  override performAbility(): void {
    console.log("El hechizero con sus poderes, sus grandes poderes");
    this.ability.use();
  }
}

function main() {
  const warrior = new Warrior(new SwordAttack());
  warrior.performAbility();

  warrior.setAbility(new AxeAttack());
  warrior.performAbility();

  const wizard = new Wizard(new MagicalSpell());
  wizard.performAbility();

  wizard.setAbility(new FireballSpell());
  wizard.performAbility();
}

main();
