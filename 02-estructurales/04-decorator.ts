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

interface Notifiaction {
  send(message: string): void;
}

class BasicNotification implements Notifiaction {
  send(message: string): void {
    console.log(`enviando notificacion basica: ${message}`);
  }
}

abstract class NotificationDecorator implements Notifiaction {
  constructor(protected notification: Notifiaction) {}

  send(message: string): void {
    this.notification.send(message);
  }
}

class EmailDecorator extends NotificationDecorator {
  private sendEmail(message: string) {
    console.log(`Enviando notificacion por correo electronico: ${message}`);
  }

  override send(message: string): void {
    super.send(message);
    this.sendEmail(message);
  }
}

class SMSDecorator extends NotificationDecorator {
  private sendSMS(message: string) {
    console.log(`Enviando notificacion mensaje de texto: ${message}`);
  }

  override send(message: string): void {
    super.send(message);
    this.sendSMS(message);
  }
}

function main() {
  let notification: Notifiaction = new BasicNotification();

  notification = new EmailDecorator(notification);
  notification = new SMSDecorator(notification);

  notification.send("hola");
}

main();
