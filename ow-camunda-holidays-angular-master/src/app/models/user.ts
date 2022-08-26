import { Group } from '@services/camunda/identity/groups/response';
import { ProfileResponse } from '@services/camunda/user/profile/response';

/* tslint:disable:max-line-length jsdoc-format */
/**
 * Clase que proporciona las definiciones para los usuarios del sitio. Se construye
 * en torno a la información proporcionada por {@link ProfileResponse} y {@link Group}
 *
 * ### Ver
 *
 * * {@link https://docs.camunda.org/manual/7.17/reference/rest/user/get/#result|Respuesta Perfil de Camunda}
 * * {@link https://docs.camunda.org/manual/7.17/reference/rest/identity/get-group-info/#result|Respuesta Grupos de Camunda}
 *
 * ### Información
 * * **Autor:** José Antonio Yáñez Jiménez
 * * **Desde:** 1.0.0
 * * **Versión:** 1.0.0
 */

/* tslint:enable:max-line-length jsdoc-format */
export class User implements ProfileResponse {
  // Implementaciones
  /**
   * Identificador del usuario. El valor no puede repetirse
   */
  id!: string;

  /**
   * Nombre del usuario.
   */
  firstName!: string;

  /**
   * Apellidos del usuario.
   */
  lastName!: string;

  /**
   * Correo electrónico del usuario.
   */
  email!: string;

  // Extensión
  /**
   * Array con los roles del usuario para la gestión de acceso.
   */
  roles: Array<Group> = new Array<Group>();
}
