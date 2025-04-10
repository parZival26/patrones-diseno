/**
 * ! Patrón Adapter
 *  Permite que objetos con interfaces incompatibles trabajen juntos, también es muy
 *  util para utilizar librerías de terceros en nuestra aplicación sin depender
 *  directamente de ellas.
 *
 * * Es útil cuando se quiere reutilizar una clase que no tiene la interfaz que
 * * necesitamos o cuando queremos crear una capa de abstracción para una librería
 * * de terceros.
 *
 * https://refactoring.guru/es/design-patterns/adapter
 */

// import { LocalLogger } from "./adapter-files/local-logger.ts";
import { DenoLoggerAdapter } from "./adapter-files/logger-adapter.ts";

// const logger = new LocalLogger("01-adapter.ts");
const logger = new DenoLoggerAdapter("01-adapter.ts");

logger.writeLog("Mesnaje de un log nomral");
logger.writeWarning("Mensaje de una alerta normal");
logger.writeError("Algo malo paso");
