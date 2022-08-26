/* tslint:disable:max-line-length jsdoc-format */
/**
 * Interfaz que proporciona la información de un grupo de Camunda al solicitar los grupos del usuario.
 *
 * ### Ver
 *
 * * {@link https://docs.camunda.org/manual/7.17/reference/rest/identity/get-group-info/#result|Respuesta de grupos del usuario de Camunda}
 *
 * ### Información
 * * **Autor:** José Antonio Yáñez Jiménez
 * * **Desde:** 1.0.0
 * * **Versión:** 1.0.0
 */

/* tslint:enable:max-line-length jsdoc-format */
export interface Group {
  /**
   * Identificador del grupo
   */
  id: string;

  /**
   * Nombre del grupo
   */
  name: string;
}

/* tslint:disable:max-line-length jsdoc-format */
/**
 * Interfaz que proporciona la información de los grupos de Camunda a los que pertenece el usuario.
 *
 * ### Ver
 *
 * * {@link https://docs.camunda.org/manual/7.17/reference/rest/identity/get-group-info/#result|Respuesta grupos del usuario de Camunda}
 *
 * ### Información
 * * **Autor:** {@link https://ilulab.es/jayanez|José Antonio Yáñez Jiménez}
 * * **Desde:** 1.0.0
 * * **Versión:** 1.0.0
 */

/* tslint:enable:max-line-length jsdoc-format */
export interface GroupsResponse {
  groups: Array<Group>;
  groupUsers: Array<any>;
}
