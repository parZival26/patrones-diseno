/**
 * ! Patrón mediator
 * Es un patrón de diseño de comportamiento que ayuda a reducir
 * las dependencias desordenadas entre objetos.
 * Este patrón limita la comunicación directa entre ellos,
 * haciendo que solo interactúen a través de un objeto mediador.
 *
 * * Es útil reducir la complejidad de las relaciones entre objetos
 *
 * https://refactoring.guru/es/design-patterns/mediator
 */

import { COLORS } from "../helpers/colors.ts";

class User {
  constructor(private username: string, private chatrom: ChatRoom) {
    chatrom.addUser(this);
  }

  sendMessage(message: string) {
    console.log(
      `\n%c${this.username} envia: %c${message}`,
      COLORS.blue,
      COLORS.white
    );
    this.chatrom.sendMessage(this, message);
  }

  recieveMessage(sender: User, message: string) {
    console.log(
      `\n%c${this.username} recibe de ${sender.username} %c${message}`,
      COLORS.blue,
      COLORS.white
    );
  }
}

class ChatRoom {
  private users: User[] = [];
  constructor(public title: string) {}

  addUser(user: User) {
    this.users.push(user);
  }

  sendMessage(sender: User, message: string): void {
    const usersToSend = this.users.filter((user) => user !== sender);
    for (const user of usersToSend) {
      if (user !== sender) {
        user.recieveMessage(user, message);
      }
    }
  }
}

function main() {
  const chatrom = new ChatRoom("Grupo trabajo");

  const user1 = new User("Fernando", chatrom);
  const user2 = new User("Tony", chatrom);
  const user3 = new User("Montana", chatrom);

  user1.sendMessage("Hola a todos!");
  user2.sendMessage("Hola fernando como vas prro");
  user3.sendMessage("Oe callate que es el grupo de la chamba, coge la pala");
}

main();
