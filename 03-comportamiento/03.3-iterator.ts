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

// Clase que representa una Carta de la baraja
class Card {
  name: string;
  value: number;

  constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
  }
}

// Clase que representa la colección de Cartas
class CardCollection {
  private cards: Card[] = [];

  addCard(card: Card): void {
    this.cards.push(card);
  }

  //TODO: Implementación del iterador usando Symbol.iterator
  *[Symbol.iterator](): IterableIterator<Card> {
    yield* this.cards;
  }

  // TODO: Implementación del iterador usando Generadores
  *getCard(): IterableIterator<Card> {
    for (const card of this.cards) {
      yield card;
    }
  }
}

// Código Cliente para probar el iterador

function main(): void {
  const deck = new CardCollection();

  // Agregar algunas cartas a la colección
  deck.addCard(new Card("As de Corazones", 1));
  deck.addCard(new Card("Rey de Corazones", 13));
  deck.addCard(new Card("Reina de Corazones", 12));
  deck.addCard(new Card("Jota de Corazones", 11));

  // Recorrer la colección en orden usando for...of
  console.log("Recorriendo la colección de cartas:");
  for (const card of deck) {
    console.log(`Carta: ${card.name}, Valor: ${card.value}`);
  }
}

main();
