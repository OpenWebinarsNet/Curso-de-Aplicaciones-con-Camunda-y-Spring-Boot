import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthPayload } from '@app/services/auth/payload';
import { EMPTY, Observable, tap } from 'rxjs';
import { AuthResponse } from '@app/services/auth/response';
import { Logger } from '@shared';
import { catchError } from 'rxjs/operators';

const log = new Logger('CamundaAuthenticationService');

@Injectable({
  providedIn: 'root',
})
export class CamundaAuthenticationService {
  /**
   * Ruta del API de Camunda
   */
  readonly BASE_URL = '/login';

  /**
   * Constructor del servicio
   *
   * @param http Cliente HTTP para realizar las solicitudes
   */
  constructor(private http: HttpClient) {}

  /**
   * Verifica la identidad de un usuario de Camunda.
   *
   * @param payload Parámetros del usuario a consultar.
   * @param headers Encabezados HTTP para la consulta
   *
   * @return Información sobre la verificación
   */
  auth(payload: AuthPayload, headers: HttpHeaders): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.BASE_URL, payload, { headers: headers }).pipe(
      tap((verifyResponse) => {
        log.debug(`respuesta de identificación: ${verifyResponse.token}`);
      }),
      catchError((err, caught) => {
        return EMPTY;
      })
    );
  }
}
