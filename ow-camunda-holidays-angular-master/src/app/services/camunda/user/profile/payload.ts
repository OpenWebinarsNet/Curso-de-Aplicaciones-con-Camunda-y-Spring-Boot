/* tslint:disable:max-line-length jsdoc-format */
/**
 * Clase para crear los parámetros de la solicitud de perfil de Camunda.
 *
 * ### Ver
 *
 * * {@link https://docs.camunda.org/manual/7.17/reference/rest/user/get/#parameters|Parámetros para la solicitud de perfil de Camunda}
 *
 * ### Información
 * * **Autor:** José Antonio Yáñez Jiménez
 * * **Desde:** 1.0.0
 * * **Versión:** 1.0.0
 */

/* tslint:enable:max-line-length jsdoc-format */
export class ProfilePayload {
  /**
   * Identificador del usuario
   */
  id!: string;
}
