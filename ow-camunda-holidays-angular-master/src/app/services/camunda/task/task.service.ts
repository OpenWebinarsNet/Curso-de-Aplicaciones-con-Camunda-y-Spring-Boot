import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TaskResponse, VariableResponse } from './response';
import { Logger } from '@shared';

const log = new Logger('CamundaTaskService');

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  readonly BASE_URL = '/engine-rest/task';

  constructor(private http: HttpClient) {}

  query(payload: any): Observable<Array<TaskResponse>> {
    return this.http.get<Array<TaskResponse>>(this.BASE_URL, { params: payload }).pipe(
      tap((definitions: Array<TaskResponse>) => {
        log.debug(`respuesta de tareas: ${JSON.stringify(definitions)}`);
      })
    );
  }

  queryVars(taskId: string): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/${taskId}/variables`).pipe(
      tap((variables: any) => {
        log.debug(`respuesta de variables: ${JSON.stringify(variables)}`);
      })
    );
  }

  queryVar(taskId: string, variable: string): Observable<VariableResponse> {
    return this.http.get<VariableResponse>(`${this.BASE_URL}/${taskId}/variables/${variable}`).pipe(
      tap((variable: VariableResponse) => {
        log.debug(`respuesta de variable: ${JSON.stringify(variable)}`);
      })
    );
  }

  submitForm(taskId: string, payload: any): Observable<Object[]> {
    return this.http.post<Object[]>(`${this.BASE_URL}/${taskId}/submit-form`, payload).pipe(
      tap(() => {
        log.debug('formulario completado');
      })
    );
  }
}
