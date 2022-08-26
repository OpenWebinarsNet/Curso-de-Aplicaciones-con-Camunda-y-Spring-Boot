/* tslint:disable:max-line-length jsdoc-format */
/**
 * Interfaz que proporciona la información de perfil de un usuario de Camunda.
 *
 * ### Ver
 *
 * * {@link https://docs.camunda.org/manual/7.17/reference/rest/user/get/#result|Respuesta Perfil de Camunda}
 *
 * ### Información
 * * **Autor:** José Antonio Yáñez Jiménez
 * * **Desde:** 1.0.0
 * * **Versión:** 1.0.0
 */

/* tslint:enable:max-line-length jsdoc-format */
export interface ProfileResponse {
  /**
   * Identificador del usuario. El valor no puede repetirse
   */
  id: string;

  /**
   * Nombre del usuario.
   */
  firstName: string;

  /**
   * Apellidos del usuario.
   */
  lastName: string;

  /**
   * Correo electrónico del usuario.
   */
  email: string;
}
