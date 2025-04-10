/**
 * ! Patrón Proxy
 * Este patrón se utiliza para controlar el acceso a un objeto, es decir,
 * se crea un objeto que actúa como intermediario entre el cliente y el objeto real.
 *
 * * Es útil cuando necesitamos controlar el acceso a un objeto,
 * * por ejemplo, para verificar si el cliente tiene permiso
 * * para acceder a ciertos métodos o propiedades.
 *
 * https://refactoring.guru/es/design-patterns/proxy
 *
 */

class Player {
  constructor(public name: string, public level: number) {}
}

interface Room {
  enter(player: Player): void;
}

class SecretRoom implements Room {
  enter(player: Player): void {
    console.log(`Bienvenido a la sala secreta ${player.name}`);
  }
}

class MagicPortal implements Room {
  constructor(
    private secretRoom: SecretRoom,
    private readonly minLevel: number
  ) {}
  enter(player: Player): void {
    if (player.level >= this.minLevel) {
      this.secretRoom.enter(player);
      return;
    }

    console.log(
      `Sos un manco no tienes nivel ${player.name}, Tu nivel es de ${player.level} y necesitas ser minimo nivel ${this.minLevel}`
    );
  }
}

function main() {
  const portal = new MagicPortal(new SecretRoom(), 10);

  const player1 = new Player("ParZival", 5);
  const player2 = new Player("Nestale", 15);

  portal.enter(player1);
  portal.enter(player2);
}

main();
