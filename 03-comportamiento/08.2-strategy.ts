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

/**
 * !Objetivo: 
 * Implementar el patrón Strategy para calcular los impuestos de diferentes países.
 * 
 * !Descripción del Ejercicio

  Imagina que trabajas en una plataforma de comercio electrónico que opera en varios países. 
  Cada país tiene su propio método para calcular impuestos, 
  y necesitas implementar un sistema que sea:

    1. Flexible: Permita agregar nuevos cálculos de impuestos 
       sin modificar la lógica existente.
    2. Dinámico: Cambie la estrategia de cálculo de impuestos en tiempo 
       de ejecución según el país seleccionado.
 */

/**	
    1.	Implementar una interfaz TaxStrategy que defina un método 
        calculateTax(amount: number): number.
        
    2.	Crear clases específicas de estrategia para los países disponibles:
      •	USA: Impuesto del 10%.
      •	Canada: Impuesto del 13%.
      •	Germany: Impuesto del 19%.
      
    3.	Implementar una clase TaxCalculator que utilice las estrategias 
        para calcular los impuestos.
 */

import { COLORS } from "../helpers/colors.ts";

// Interfaz Strategy
interface TaxStrategy {
  calculateTax(amount: number): number;
}

// Estrategia 1: Impuestos en USA
class USATaxStrategy implements TaxStrategy {
  calculateTax(amount: number): number {
    return amount * 0.1;
  }
  // TODO: Implementar el método calculateTax = amount * 0.1
}

// Estrategia 2: Impuestos en Canada
class CanadaTaxStrategy implements TaxStrategy {
  calculateTax(amount: number): number {
    return amount * 0.13;
  }
  // TODO: Implementar el método calculateTax = amount * 0.13
}

// Estrategia 3: Impuestos en Germany
class GermanyTaxStrategy implements TaxStrategy {
  calculateTax(amount: number): number {
    return amount * 0.19;
  }
  // TODO: Implementar el método calculateTax = amount * 0.19
}

// Clase Contexto - TaxCalculator
class TaxCalculator {
  // TODO: Implementar el constructor recibiendo la estrategia a usar
  constructor(private strategy: TaxStrategy) {}

  // Cambiar la estrategia de cálculo de impuestos
  setStrategy(strategy: TaxStrategy): void {
    this.strategy = strategy;
  }

  // Calcular impuestos
  calculate(amount: number): number {
    return this.strategy.calculateTax(amount);
  }
}

// Código Cliente para probar
function main(): void {
  const taxCalculator = new TaxCalculator(new USATaxStrategy());

  console.log("%cCálculo de impuestos:\n", COLORS.red);
  console.log("USA: $", taxCalculator.calculate(100).toFixed(2));

  console.log("\nCambiando a estrategia para Canada...");
  taxCalculator.setStrategy(new CanadaTaxStrategy());
  console.log("Canada: $", taxCalculator.calculate(100).toFixed(2));

  console.log("\nCambiando a estrategia para Germany...");
  taxCalculator.setStrategy(new GermanyTaxStrategy());
  console.log("Germany: $", taxCalculator.calculate(100).toFixed(2));
}

main();
