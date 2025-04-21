/**
 * ! Patrón Iterator
 * Este patrón permite recorrer los elementos de una colección sin exponer
 * la estructura interna de la colección.
 *
 * * Es útil cuando se necesita recorrer una colección de elementos sin importar
 * * cómo se almacenan los elementos.
 *
 * https://refactoring.guru/es/design-patterns/iterator
 */

interface Iterator<T> {
  next(): T | null;
  hasNext(): boolean;
  current(): T | null;
}

class Pokemon {
  constructor(public name: string, public type: string) {}
}

class PokemonCollection {
  private pokemons: Pokemon[] = [];

  addPokemon(pokemon: Pokemon) {
    this.pokemons.push(pokemon);
  }

  getPokemonAt(index: number): Pokemon | null {
    if (index >= 0 && index <= this.pokemons.length) {
      return this.pokemons[index];
    }
    return null;
  }

  getLength(): number {
    return this.pokemons.length;
  }

  createIterator(): PokemonIterator {
    return new PokemonIterator(this);
  }
}

class PokemonIterator implements Iterator<Pokemon> {
  private position: number = 0;
  constructor(private collection: PokemonCollection) {}

  next(): Pokemon | null {
    if (this.hasNext()) {
      return this.collection.getPokemonAt(this.position++);
    }
    return null;
  }
  hasNext(): boolean {
    return this.position < this.collection.getLength();
  }
  current(): Pokemon | null {
    return this.collection.getPokemonAt(this.position);
  }
}

function main() {
  const pokedex = new PokemonCollection();

  pokedex.addPokemon(new Pokemon("Pikachu", "Electric"));
  pokedex.addPokemon(new Pokemon("Charmander", "Fire"));
  pokedex.addPokemon(new Pokemon("Bulbasaur", "Grass"));
  pokedex.addPokemon(new Pokemon("Squirtle", "Water"));
  pokedex.addPokemon(new Pokemon("Gengar", "Ghost"));
  pokedex.addPokemon(new Pokemon("Eevee", "Normal"));
  pokedex.addPokemon(new Pokemon("Snorlax", "Normal"));

  const iterator = pokedex.createIterator();

  while (iterator.hasNext()) {
    const pokemon = iterator.next();

    if (pokemon) {
      console.log(`Pokemon: ${pokemon.name}, Type: ${pokemon.type}`);
    }
  }
}

main();
