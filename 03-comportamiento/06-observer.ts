/**
 * ! Patrón Observer
 * El patrón Observer es un patrón de diseño de comportamiento que establece
 * una relación de uno a muchos entre un objeto, llamado sujeto,
 * y otros objetos, llamados observadores, que son notificados
 * y actualizados automáticamente por el sujeto
 * cuando se producen cambios en su estado.
 *
 * * Es útil cuando necesitamos que varios objetos estén
 * * pendientes de los cambios
 *
 * !No confundirlo con RXJS Observables
 *
 * https://refactoring.guru/es/design-patterns/observer
 */

import { COLORS } from "../helpers/colors.ts";

interface Observer {
  notify(videoTitle: string): void;
}

class YoutubeChannel {
  private subscribers: Observer[] = [];

  constructor(private name: string) {}

  subscribe(observer: Observer) {
    this.subscribers.push(observer);
    console.log(`Nuevo suscriptor al canal %c${this.name}`, COLORS.green);
  }

  unsubscribe(observer: Observer) {
    this.subscribers = this.subscribers.filter((sub) => sub !== observer);
    console.log(`Un suscriptor se ha dado de baja ${this.name}`);
  }

  uploadVideo(videoTitle: string) {
    console.log(
      `Canal ${this.name} ha subido un nuevo video %c${videoTitle}`,
      COLORS.green
    );
    this.subscribers.forEach((sub) => sub.notify(videoTitle));
  }
}

class Subscriber implements Observer {
  constructor(private name: string) {}
  notify(videoTitle: string): void {
    console.log(
      `${this.name} ha sido notificado: %cNuevo video ${videoTitle}`,
      COLORS.yellow
    );
  }
}

function main() {
  const channel = new YoutubeChannel("Cocinando con Juan");

  const melisa = new Subscriber("Melisa");
  const cesar = new Subscriber("César");
  const diego = new Subscriber("Diego");

  channel.subscribe(melisa);
  channel.subscribe(cesar);

  channel.uploadVideo("Receda de lasaña de react");

  channel.subscribe(diego);

  channel.uploadVideo("Milanga de FastAPI");

  channel.unsubscribe(cesar);

  channel.uploadVideo("Arepita de choclo");

  channel.unsubscribe(melisa);

  channel.uploadVideo("Parrillada de spring boot");

  channel.uploadVideo("pastas a la .net");
}

main();
