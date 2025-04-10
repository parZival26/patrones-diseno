/**
 * ! Patrón decorador
 * Es un patrón de diseño estructural que permite añadir
 * funcionalidades a objetos, colocando estos objetos dentro de
 * objetos encapsuladores especiales que contienen estas funcionalidades.
 *
 * No confundirlo con los decoradores de TypeScript que son anotaciones.
 *
 * * Es útil cuando necesitas añadir funcionalidades a objetos
 *  * de manera dinámica y flexible.
 *
 * https://refactoring.guru/es/design-patterns/decorator
 */

// 1. Interfaz Character
interface Character {
  getDescription(): string;
  getStats(): { attack: number; defense: number };
}

// 2. Clase BasicCharacter
// Representa un personaje básico sin accesorios
// TODO: Implementar la interfaz Character
class BasicCharacter implements Character {
  getDescription(): string {
    return "Personaje básico";
  }
  getStats(): { attack: number; defense: number } {
    return { attack: 10, defense: 10 };
  }
  // TODO: Implementar los métodos de la interfaz
  // getDescription: return 'Personaje básico';
  // TODO: Implementar los métodos de la interfaz
  // getStats: return { attack: 10, defense: 10 };
}

// 3. Clase Decoradora CharacterDecorator
// Actúa como base para los decoradores específicos
abstract class CharacterDecorator implements Character {
  // Protected para que las clases hijas puedan acceder a la propiedad
  // Private no permitiría que las clases hijas accedan a la propiedad
  // TODO: Definir la propiedad protected character de tipo Character

  // TODO: Definir el constructor que recibe un personaje de tipo Character

  // TODO: Implementar los métodos de la interfaz Character, pero retornando
  // la descripción y estadísticas del personaje decorado
  constructor(protected character: Character) {}

  getDescription(): string {
    return this.character.getDescription();
  }

  // TODO: Implementar los métodos de la interfaz Character
  getStats(): { attack: number; defense: number } {
    return this.character.getStats();
  }
}

// 4. Decorador Concreto HelmetDecorator
// Añade un casco que aumenta la defensa en +5
class HelmetDecorator extends CharacterDecorator {
  override getDescription(): string {
    return this.character.getDescription() + "\n * con Casco";
  }

  override getStats(): { attack: number; defense: number } {
    const stats = this.character.getStats();
    return { attack: stats.attack, defense: stats.defense + 5 };
  }
}

// 5. Decorador Concreto ShieldDecorator
// Añade un escudo que aumenta la defensa en +10
class ShieldDecorator extends CharacterDecorator {
  override getDescription(): string {
    return this.character.getDescription() + "\n * con Escudo";
  }

  override getStats(): { attack: number; defense: number } {
    const stats = this.character.getStats();
    return { attack: stats.attack, defense: stats.defense + 10 };
  }
}

// 6. Decorador Concreto SwordDecorator
// Añade una espada que aumenta el ataque en +7
class SwordDecorator extends CharacterDecorator {
  override getDescription(): string {
    return this.character.getDescription() + "\n * con Espada";
  }

  override getStats(): { attack: number; defense: number } {
    const stats = this.character.getStats();
    return { attack: stats.attack + 7, defense: stats.defense };
  }
}

class RingDecorator extends CharacterDecorator {
  override getDescription(): string {
    return this.character.getDescription() + "\n * con anillo";
  }

  override getStats(): { attack: number; defense: number } {
    const stats = this.character.getStats();
    return { attack: stats.attack + 3, defense: stats.defense };
  }
}

// TODO: Crear un nuevo decorador que añada un anillo que aumenta el ataque en +3
// class RingDecorator ...

// 7. Código Cliente para Probar el Decorador

function main() {
  // Crear un personaje básico
  let character: Character = new BasicCharacter();
  console.log("\nPersonaje inicial:", character.getDescription());
  console.log("Estadísticas:", character.getStats());

  // Añadir un casco al personaje
  character = new HelmetDecorator(character);
  console.log("\nCon Casco:", character.getDescription());
  console.log("Estadísticas:", character.getStats());

  // Añadir un escudo al personaje
  character = new ShieldDecorator(character);
  console.log("\nCon Escudo:", character.getDescription());
  console.log("Estadísticas:", character.getStats());

  // Añadir una espada al personaje
  character = new SwordDecorator(character);
  console.log("\nCon Espada:", character.getDescription());
  console.log("Estadísticas:", character.getStats());

  character = new RingDecorator(character);
  console.log("\nCon Anillo:", character.getDescription());
  console.log("Estadísticas:", character.getStats());

  console.log("\n\n");
}

main();
