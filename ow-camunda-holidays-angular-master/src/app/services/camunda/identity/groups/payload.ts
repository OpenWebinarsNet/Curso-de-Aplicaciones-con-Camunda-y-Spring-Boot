/* tslint:disable:max-line-length jsdoc-format */
/**
 * Clase para crear los parámetros de filtro en las solicitudes de grupos de Camunda a los que pertenece el usuario.
 *
 * ### Ver
 *
 * * {@link https://docs.camunda.org/manual/7.17/reference/rest/identity/get-group-info/#parameters|Parámetros para filtrar los grupos de Camunda a los que pertenece el usuario}
 *
 * ### Información
 * * **Autor:** José Antonio Yáñez Jiménez
 * * **Desde:** 1.0.0
 * * **Versión:** 1.0.0
 */

/* tslint:enable:max-line-length jsdoc-format */
export class GroupsPayload {
  /**
   * Identificador del usuario
   */
  userId!: string;
}
