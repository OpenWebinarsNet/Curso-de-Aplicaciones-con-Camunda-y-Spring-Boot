/* tslint:disable:max-line-length jsdoc-format */
/**
 * Interfaz que proporciona la información sobre la verificación de identidad de un usuario de Camunda.
 *
 *
 * ### Información
 * * **Autor:** José Antonio Yáñez Jiménez
 * * **Desde:** 1.0.0
 * * **Versión:** 1.0.0
 */

/* tslint:enable:max-line-length jsdoc-format */
export interface AuthResponse {
  /**
   * Token JWT del usuario autenticado
   */
  token: string;
}
