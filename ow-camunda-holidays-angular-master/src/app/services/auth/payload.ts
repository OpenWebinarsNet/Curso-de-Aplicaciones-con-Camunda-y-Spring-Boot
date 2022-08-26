/* tslint:disable:max-line-length jsdoc-format */
/**
 * Clase para crear los parámetros de las solicitudes de verificación de usuario de Camunda.
 *
 * ### Ver
 *
 *
 * ### Información
 * * **Autor:** José Antonio Yáñez Jiménez
 * * **Desde:** 1.0.0
 * * **Versión:** 1.0.0
 */

/* tslint:enable:max-line-length jsdoc-format */
export class AuthPayload {
  /**
   * Nombre de usuario
   */
  username!: string;

  /**
   * Clave del usuario
   */
  password!: string;

  /**
   * Indica si deben recordarse los credenciales en el frontal
   */
  remember?: boolean;
}
