import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProcessDefinitionResponse, ProcessStartResponse } from './response';
import { Logger } from '@shared';

const log = new Logger('CamundaProcessDefinitionService');

/* tslint:disable:max-line-length jsdoc-format */
/**
 * Provee el servicio de consulta de definiciones de proceso de Camunda.
 *
 * ### Ver
 *
 * * {@link https://docs.camunda.org/manual/7.17/reference/rest/process-definition/get-query/|Ver definiciones de proceso de Camunda}
 *
 * @author José Antonio Yáñez Jiménez
 * @since 1.0.0
 * @version 1.0.0
 *
 */

/* tslint:enable:max-line-length jsdoc-format */
@Injectable({
  providedIn: 'root',
})
export class ProcessDefinitionService {
  /**
   * Ruta del API de Camunda
   */
  readonly BASE_URL = '/engine-rest/process-definition';

  /**
   * Constructor del servicio
   *
   * @param http Cliente HTTP para realizar las solicitudes
   */
  constructor(private http: HttpClient) {}

  /**
   * Consulta las definiciones de proceso disponibles.
   *
   * @return Definiciones de proceso disponibles
   */
  query(): Observable<Array<ProcessDefinitionResponse>> {
    const payload = {
      latestVersion: true,
    };

    return this.http.get<Array<ProcessDefinitionResponse>>(this.BASE_URL, { params: payload }).pipe(
      tap((definitions: Array<ProcessDefinitionResponse>) => {
        log.debug(`respuesta de definiciones de proceso: ${JSON.stringify(definitions)}`);
      })
    );
  }

  start(processDefinition: string, payload: object): Observable<ProcessStartResponse> {
    return this.http.post<ProcessStartResponse>(`${this.BASE_URL}/key/${processDefinition}/start`, payload).pipe(
      tap((start: ProcessStartResponse) => {
        log.debug(`respuesta de instancia de proceso: ${JSON.stringify(start)}`);
      })
    );
  }
}
