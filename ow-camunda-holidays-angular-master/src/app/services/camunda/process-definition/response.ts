/* tslint:disable:max-line-length jsdoc-format */
/**
 * Interfaz que proporciona la información de las definiciones de proceso de Camunda.
 *
 * ### Ver
 *
 * * {@link https://docs.camunda.org/manual/7.17/reference/rest/process-definition/get/#result|Respuesta de definiciones de proceso de Camunda.}
 *
 * ### Información
 * * **Autor:** José Antonio Yáñez Jiménez
 * * **Desde:** 1.0.0
 * * **Versión:** 1.0.0
 */

/* tslint:enable:max-line-length jsdoc-format */
export interface ProcessDefinitionResponse {
  /**
   * Identificador de la definición de proceso
   */
  id: string;

  /**
   * Clave del proceso, por ejemplo, el identificador del BPMN asociado
   */
  key: string;

  /**
   * Nombre de la definición de proceso
   */
  name: string;

  /**
   * Versión que el motor de Camunda ha asignado a la definición de proceso
   */
  version: number;
}

/* tslint:disable:max-line-length jsdoc-format */
/**
 * Interfaz que proporciona la información de la respuesta de un proceso de Camunda.
 *
 * ### Ver
 *
 * * {@link https://docs.camunda.org/manual/7.17/reference/rest/process-definition/get/#result|Respuesta de definiciones de proceso de Camunda.}
 *
 * ### Información
 * * **Autor:** José Antonio Yáñez Jiménez
 * * **Desde:** 1.0.0
 * * **Versión:** 1.0.0
 */

/* tslint:enable:max-line-length jsdoc-format */
export interface ProcessStartResponse {
  links: Array<any>;
  id: string;
  definitionId: string;
  businessKey: string | null;
  caseInstanceId: string | null;
  ended: boolean;
  suspended: boolean;
  tenantId: string | null;
}
