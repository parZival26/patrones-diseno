/**
 * ! Patrón Facade
 * Este patrón proporciona una interfaz unificada para un conjunto de interfaces
 * en un subsistema.
 *
 * Facade define una interfaz de nivel más alto que hace que el subsistema
 * sea más fácil de usar.
 *
 * * Es útil cuando un subsistema es complejo o difícil de entender para
 * * proporcionar una interfaz simplificada para el cliente.
 *
 * https://refactoring.guru/es/design-patterns/facade
 */

class Proyector {
  turnOn() {
    console.log("Proyector encendido");
  }

  turnOff() {
    console.log("Apagando el proyector");
  }
}

class SoundSystem {
  on() {
    console.log("Sistema de sonido encendido");
  }

  off() {
    console.log("Sistema de sonido apagado");
  }
}

class VideoPlayer {
  on() {
    console.log("Video player encendido");
  }

  play(movie: string) {
    console.log(`Reproduciendo ${movie}`);
  }

  stop() {
    console.log("Pelicula detenida");
  }

  off() {
    console.log("Video player apagado");
  }
}

class PopcornMaker {
  poppingPopcorn() {
    console.log("Haciendo palomitas");
  }

  off() {
    console.log("PopcornMaker apagado");
  }
}

interface HomeTheaterFacadeOptions {
  proyector: Proyector;
  soundSystem: SoundSystem;
  videoPlayer: VideoPlayer;
  popcornMaker: PopcornMaker;
}

class HomeTheaterFacade {
  private proyector: Proyector;
  private soundSystem: SoundSystem;
  private videoPlayer: VideoPlayer;
  private popcornMaker: PopcornMaker;

  constructor({
    proyector,
    soundSystem,
    videoPlayer,
    popcornMaker,
  }: HomeTheaterFacadeOptions) {
    this.proyector = proyector;
    this.soundSystem = soundSystem;
    this.videoPlayer = videoPlayer;
    this.popcornMaker = popcornMaker;
  }

  watchMovie(movie: string): void {
    console.log("Preparando para ver la pelicula");
    this.proyector.turnOn();
    this.soundSystem.on();
    this.popcornMaker.poppingPopcorn();
    this.videoPlayer.on();
    this.videoPlayer.play(movie);

    console.log("Disfruta la Pelicula");
  }

  endWatchingMovie(): void {
    console.log("Preparando para detener la pelicula");
    this.proyector.turnOff();
    this.soundSystem.off();
    this.popcornMaker.off();
    this.videoPlayer.stop();
    this.videoPlayer.off();
  }
}

function main() {
  const homeTheaterFacade = new HomeTheaterFacade({
    proyector: new Proyector(),
    videoPlayer: new VideoPlayer(),
    soundSystem: new SoundSystem(),
    popcornMaker: new PopcornMaker(),
  });

  homeTheaterFacade.watchMovie("Minecraft");

  console.log("\n\n");

  homeTheaterFacade.endWatchingMovie();
}

main();
