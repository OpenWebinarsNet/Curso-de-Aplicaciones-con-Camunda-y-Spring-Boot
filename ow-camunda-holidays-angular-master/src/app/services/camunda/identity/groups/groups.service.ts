import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GroupsResponse } from './response';
import { Logger } from '@shared';

const log = new Logger('CamundaIdentityGroupsService');

/* tslint:disable:max-line-length jsdoc-format */
/**
 * Provee el servicio de grupos de Camunda dentro de la sección Identity.
 *
 * ### Ver
 *
 * * {@link https://docs.camunda.org/manual/7.17/reference/rest/identity/get-group-info/|Ver grupos del usuario de Camunda}
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
export class GroupsService {
  /**
   * Ruta del API de Camunda
   */
  readonly BASE_URL = '/engine-rest/identity/groups';

  /**
   * Constructor del servicio.
   *
   * @param http Cliente HTTP para realizar las solicitudes
   */
  constructor(private http: HttpClient) {}

  /**
   * Consulta los grupos a los que pertenece un usuario.
   *
   * @param payload Parámetros de consulta, definidos como tipo any para pasarlos
   * directamente a la consulta dado que son de tipo string y no requieren tratamiento.
   *
   * @return Grupos a los que pertenece el usuario
   */
  get(payload: any): Observable<GroupsResponse> {
    return this.http.get<GroupsResponse>(this.BASE_URL, { params: payload }).pipe(
      tap((groupsResponse) => {
        log.debug(`respuesta de grupos: ${JSON.stringify(groupsResponse)}`);
      })
    );
  }
}
