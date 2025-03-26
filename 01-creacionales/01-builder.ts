/**
 * ! Patrón Builder:
 * Es un patrón de diseño creacional que nos permite construir objetos complejos
 * paso a paso.
 *
 * El patrón nos permite producir distintos tipos y representaciones
 * de un objeto empleando el mismo código de construcción.
 *
 * * Es útil cuando necesitamos construir un objeto complejo con muchas partes
 * * y queremos que el proceso de construcción sea independiente de las partes
 * * que lo componen.
 *
 * https://refactoring.guru/es/design-patterns/builder
 */

import { COLORS } from "../helpers/colors.ts";

class Computer {
  public cpu: string;
  public ram: string = "ram - not defined";
  public storage: string = "storage - not defined";
  public gpu?: string;

  displayConfiguration() {
    console.log(`Configuración de la computadora
      CPU: ${this.cpu}
      RAM: ${this.ram}
      Almacenamiento: ${this.storage}
      GPU: ${this.gpu || "No tiene GPU"}`);
  }
}

class ComputerBuilder {
  private compuer: Computer;

  constructor() {
    this.compuer = new Computer();
  }

  setCPU(cpu: string): ComputerBuilder {
    this.compuer.cpu = cpu;
    return this;
  }

  setRAM(ram: string): ComputerBuilder {
    if (this.compuer.ram === undefined) {
      throw new Error("RAM already defined");
    }
    this.compuer.ram = ram;
    return this;
  }

  setStorage(storage: string): ComputerBuilder {
    this.compuer.storage = storage;
    return this;
  }

  setGPU(gpu: string): ComputerBuilder {
    this.compuer.gpu = gpu;
    return this;
  }

  build(): Computer {
    return this.compuer;
  }
}

const main = () => {
  const basicComputer: Computer = new ComputerBuilder()
    .setCPU("Intel i5")
    .setRAM("8GB")
    .setStorage("1TB")
    .build();

  console.log("%cComputadora básica", COLORS.blue);
  basicComputer.displayConfiguration();

  const gamingComputer: Computer = new ComputerBuilder()
    .setCPU("Intel i9")
    .setRAM("64GB")
    .setStorage("8TB M.2")
    .setGPU("Nvidia RTX 5090")
    .build();

  console.log("%cComputadora para gaming", COLORS.blue);
  gamingComputer.displayConfiguration();
};

main();
