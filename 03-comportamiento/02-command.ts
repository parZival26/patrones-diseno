/**
 * ! Patrón Command
 * Este patrón encapsula una solicitud como un objeto,
 * lo que le permite parametrizar otros objetos con diferentes solicitudes,
 * encolar solicitudes, o registrar solicitudes, y soporta operaciones que pueden deshacerse.
 *
 * Me gustó mucho la explicación de Refactoring Guru
 * https://refactoring.guru/es/design-patterns/command
 *
 * * Es útil cuando se necesita desacoplar el objeto que invoca
 * * la operación del objeto que sabe cómo realizarla.
 *
 *
 */

import { COLORS } from "../helpers/colors.ts";

interface Command {
  execute(): void;
}

class Light {
  turnOn(): void {
    console.log("La Luz esta encendida");
  }

  turnOff(): void {
    console.log("La luz esta apagada");
  }
}

class Fan {
  on(): void {
    console.log("El ventilador esta encendido");
  }

  off(): void {
    console.log("El ventilador esta apagado");
  }
}

class LightOnCommand implements Command {
  constructor(private light: Light) {}
  execute(): void {
    this.light.turnOn();
  }
}

class LightOffCommand implements Command {
  constructor(private light: Light) {}
  execute(): void {
    this.light.turnOff();
  }
}

class FanOnCommand implements Command {
  constructor(private fan: Fan) {}
  execute(): void {
    this.fan.on();
  }
}

class FanOffCommand implements Command {
  constructor(private fan: Fan) {}
  execute(): void {
    this.fan.off();
  }
}

class RemoteControl {
  private commands: Record<string, Command> = {};

  setCommand(button: string, command: Command) {
    this.commands[button] = command;
  }

  pressButton(button: string) {
    if (this.commands[button]) {
      this.commands[button].execute();
      return;
    }

    console.log("%cNo se a asignado un comando a este boton", COLORS.red);
  }
}
function main() {
  const remoteControl = new RemoteControl();
  const ligth = new Light();
  const fan = new Fan();

  const lightOnCommand = new LightOnCommand(ligth);
  const lightOffCommand = new LightOffCommand(ligth);

  const fanOnCommand = new FanOnCommand(fan);
  const fanOffCommand = new FanOffCommand(fan);

  remoteControl.setCommand("1", lightOnCommand);
  remoteControl.setCommand("2", lightOffCommand);
  remoteControl.setCommand("3", fanOnCommand);
  remoteControl.setCommand("4", fanOffCommand);

  let continueProgram = true;

  do {
    console.clear();
    const button = prompt(`Presiona un boton del control:`) ?? "";
    remoteControl.pressButton(button);

    continueProgram = prompt("¿Quieres continuar? (s/n)") === "s";
  } while (continueProgram);
}
main();
