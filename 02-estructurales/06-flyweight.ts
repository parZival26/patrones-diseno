/**
 * ! Patrón Flyweight
 * Es un patrón de diseño estructural que nos permite usar objetos compartidos
 * para soportar eficientemente grandes cantidades de objetos.
 *
 * * Es útil cuando necesitamos una gran cantidad de objetos y queremos reducir
 * * la cantidad de memoria que utilizan.
 *
 * https://refactoring.guru/es/design-patterns/flyweight
 */

import { COLORS } from "../helpers/colors.ts";

interface location {
  display(cordiantes: { x: number; y: number }): void;
}

//Flyweights
class LocationIcon implements location {
  constructor(private type: string, private iconImage: string) {}

  display(cordiantes: { x: number; y: number }): void {
    console.log(
      `Coords: ${this.type} en ${cordiantes.x}, ${cordiantes.y} con icono ${this.iconImage}`
    );
  }
}

//Flyweights Factory
class LocationFactory {
  private icons: Record<string, LocationIcon> = {};

  getLocationIcon(type: string): LocationIcon {
    if (!this.icons[type]) {
      console.log("%cCreando nueva instnacia", COLORS.red);

      const iconImage = `image_from_${type.toLocaleLowerCase()}.png`;
      this.icons[type] = new LocationIcon(type, iconImage);
    }

    return this.icons[type];
  }
}

class MapLocation {
  constructor(
    private coordiantes: { x: number; y: number },
    private icon: LocationIcon
  ) {}

  display() {
    this.icon.display(this.coordiantes);
  }
}

function main() {
  const factory = new LocationFactory();
  const locations = [
    new MapLocation({ x: 10, y: 20 }, factory.getLocationIcon("hospital")),
    new MapLocation({ x: 30, y: -20 }, factory.getLocationIcon("hospital")),
    new MapLocation({ x: -40, y: 60 }, factory.getLocationIcon("hospital")),

    new MapLocation({ x: 10, y: 20 }, factory.getLocationIcon("Parque")),
    new MapLocation({ x: 10, y: 20 }, factory.getLocationIcon("hospital")),
    new MapLocation({ x: 10, y: 20 }, factory.getLocationIcon("hospital")),

    new MapLocation({ x: 10, y: 20 }, factory.getLocationIcon("Escuela")),

    new MapLocation({ x: 10, y: 20 }, factory.getLocationIcon("Escuela")),

    new MapLocation({ x: 10, y: 20 }, factory.getLocationIcon("Escuela")),
  ];

  locations.forEach((mapLocation) => mapLocation.display());
}

main();
