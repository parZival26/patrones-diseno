/**
 * ! Patrón Bridge
 * Este patrón nos permite desacoplar una abstracción de su implementación,
 * de tal forma que ambas puedan variar independientemente.
 *
 * * Es útil cuando se tienen múltiples implementaciones de una abstracción
 * * Se puede utilizar para separar la lógica de negocio de la lógica de presentación
 * * Se puede utilizar para separar la lógica de la interfaz de usuario también.
 *
 */

import { COLORS } from "../helpers/colors.ts";

// 1. Interfaz NotificationChannel
// Define el método `send`, que cada canal de comunicación implementará.
interface NotificationChannel {
  send(message: string): void;
}

// 2. Implementaciones de Canales de Comunicación

class EmailChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando correo electrónico: ${message}`);
  }
}

class SMSChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando SMS: ${message}`);
  }
}

class PushNotificationChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando Push: ${message}`);
  }
}

// 3. Clase Abstracta Notification
// Define la propiedad `channel` y el método `notify`

abstract class Notification {
  // TODO: Definir la propiedad `channel` de tipo NotificationChannel
  // TODO: Definir el constructor de la clase
  // TODO: Definir el método `notify` y `setChannel` (abstractos)
  constructor(protected channel: NotificationChannel) {}

  abstract setChannel(v: NotificationChannel): void;
  abstract notify(message: string): void;
}

// 4. Clases Concretas de Notificaciones

class AlertNotification extends Notification {
  notify(message: string): void {
    console.log("\n%cNotificación de Alerta:", COLORS.red);
    // TODO: Enviar el mensaje a través del canal
    this.channel.send(message);
  }

  setChannel(channel: NotificationChannel): void {
    // TODO: Asignar el canal a la propiedad `channel`
    this.channel = channel;
  }
}

class ReminderNotification extends Notification {
  notify(message: string): void {
    console.log("\n%cNotificación de Recordatorio:", COLORS.blue);
    // TODO: Enviar el mensaje a través del canal
    this.channel.send(message);
  }

  setChannel(channel: NotificationChannel): void {
    // TODO: Asignar el canal a la propiedad `channel`
    this.channel = channel;
  }
}

class PushNotification extends Notification {
  override notify(message: string): void {
    console.log("\n%cNotificación de Push:", COLORS.green);
    // TODO: Enviar el mensaje a través del canal
    this.channel.send(message);
  }

  override setChannel(channel: NotificationChannel): void {
    // TODO: Asignar el canal a la propiedad `channel`
    this.channel = channel;
  }
}

// 5. Código Cliente para Probar el Bridge

// TODO: Toda la función main debe de ejecutarse sin errores, sin modificaciones
// Deben de implementar todo lo que haga falta en las clases anteriores
function main() {
  // Crear una notificación de alerta usando el canal de correo electrónico
  const alert = new AlertNotification(new EmailChannel());

  alert.notify("Alerta de seguridad: Se ha detectado un acceso no autorizado.");

  // Cambiar el canal a SMS y volver a enviar la alerta
  alert.setChannel(new SMSChannel());
  alert.notify("Alerta de seguridad: Se ha detectado un acceso no autorizado.");

  // Crear una notificación de recordatorio usando el canal de SMS
  const reminder = new ReminderNotification(new SMSChannel());
  reminder.notify(
    "Recordatorio: Tu cita con el médico es mañana a las 10:00 a.m."
  );

  // Cambiar el canal de recordatorio a correo electrónico y enviar nuevamente
  reminder.setChannel(new PushNotificationChannel());
  reminder.notify(
    "Recordatorio: Tu cita con el médico es mañana a las 10:00 a.m."
  );

  // Crear una notificación de push usando el canal de notificación push
  const push = new PushNotification(new PushNotificationChannel());
  push.notify("Nueva actualización disponible. Haz clic para instalar.");
}

main();
