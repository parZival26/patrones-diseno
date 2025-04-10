/**
 * ! Patrón Composite
 * Es un patrón de diseño estructural que permite componer objetos
 * en estructuras de árbol para representar jerarquías.
 *
 * El patrón permite a los clientes tratar de manera uniforme a los objetos
 * individuales y a sus composiciones.
 *
 * * Es útil cuando necesitas tratar a los objetos individuales
 * * y a sus composiciones de manera uniforme, y la estructura
 * * de los objetos forma una jerarquía en árbol.
 *
 * https://refactoring.guru/es/design-patterns/composite
 *
 */
interface FileSystemComponent {
  showDetails(ident?: string): void;
}

class File implements FileSystemComponent {
  constructor(private name: string) {}

  showDetails(ident?: string): void {
    console.log(`${ident} - Archivo: ${this.name}`);
  }
}

class Folder implements FileSystemComponent {
  private contents: FileSystemComponent[] = [];
  constructor(private name: string) {}

  add(componet: FileSystemComponent) {
    this.contents.push(componet);
  }

  showDetails(ident?: string): void {
    console.log(`${ident} + Carpeta: ${this.name}`);
    this.contents.forEach((componet) => componet.showDetails(ident + " "));
  }
}

function main() {
  const file1 = new File("archivo1.txt");
  const file2 = new File("archivo2.txt");
  const file3 = new File("archivo3.txt");
  const file4 = new File("archivo4.txt");
  const file5 = new File("archivo5.txt");

  const folder1 = new Folder("Carpeta 1");
  const folder2 = new Folder("Carpeta 2");
  const folder3 = new Folder("Carpeta 3");

  folder1.add(file1);
  folder1.add(file2);

  folder2.add(file3);

  folder3.add(file4);
  folder3.add(file5);
  folder2.add(folder3);

  const rootFoler = new Folder("carpeta Root");
  rootFoler.add(folder1);
  rootFoler.add(folder2);

  rootFoler.showDetails();
}

main();
