/**
 * !Patrón Memento
 * Permite capturar y externalizar un estado interno de un objeto,
 * de manera que el objeto pueda ser restaurado a ese estado más tarde.
 *
 * * Es útil cuando se necesita guardar el estado de un objeto para poder
 * * volver a él en un futuro.
 *
 * https://refactoring.guru/es/design-patterns/memento
 */

import { COLORS } from "../helpers/colors.ts";

// Una pizarra donde se pueden agregar figuras

// Clase Memento - DrawingMemento
class DrawingMemento {
  private shapes: string[];

  constructor(shapes: string[]) {
    // Guardamos una copia de las figuras para evitar mutaciones
    this.shapes = [...shapes];
  }

  getShapes(): string[] {
    return [...this.shapes];
  }
}

// Clase Originator - DrawingBoard
class DrawingBoard {
  private shapes: string[] = [];

  // Agregar una figura a la pizarra
  addShape(shape: string): void {
    this.shapes.push(shape);
    console.log(`Figura agregada: ${shape}`);
  }

  // Mostrar el estado actual de la pizarra
  showBoard(): void {
    console.log("Pizarra actual:", this.shapes.join(", ") || "Vacía");
  }

  // Crear un Memento del estado actual de la pizarra
  save(): DrawingMemento {
    // TODO: Implementar el método save para guardar el estado actual
    return new DrawingMemento([...this.shapes]);
  }

  // Restaurar el estado de la pizarra desde un Memento
  restore(memento: DrawingMemento): void {
    this.shapes = memento.getShapes();
    console.log("%c\nEstado de la pizarra restaurado.", COLORS.blue);
  }
}

// Clase Caretaker - History
class History {
  private mementos: DrawingMemento[] = [];

  // Guardar un Memento
  // TODO: Implementar push para guardar en la historia
  push(memento: DrawingMemento): void {
    this.mementos.push(memento);
  }

  // Recuperar el último Memento
  // TODO: Implementar pop para recuperar el último memento
  pop(): DrawingMemento | undefined {
    return this.mementos.pop();
  }
}

// Código Cliente para probar el patrón Memento

function main(): void {
  const drawingBoard = new DrawingBoard();
  const history = new History();

  // El usuario agrega figuras y guarda el estado en cada paso
  drawingBoard.addShape("Círculo");
  history.push(drawingBoard.save());

  drawingBoard.addShape("Cuadrado");
  history.push(drawingBoard.save());

  drawingBoard.addShape("Triángulo");
  drawingBoard.showBoard(); // Mostrar estado actual de la pizarra

  // Deshacer el último cambio
  drawingBoard.restore(history.pop()!);
  drawingBoard.showBoard(); // Mostrar estado después de deshacer

  // Deshacer otro cambio
  drawingBoard.restore(history.pop()!);
  drawingBoard.showBoard(); // Mostrar estado después de deshacer nuevamente
}

main();
