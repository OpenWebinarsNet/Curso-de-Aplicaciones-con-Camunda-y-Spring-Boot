import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HistoryVariableInstanceResponse } from './response';
import { Logger } from '@shared';

const log = new Logger('CamundaTaskService');

@Injectable({
  providedIn: 'root',
})
export class HistoryVariableInstanceService {
  readonly BASE_URL = '/engine-rest/history/variable-instance';

  constructor(private http: HttpClient) {}

  query(payload: any): Observable<Array<HistoryVariableInstanceResponse>> {
    return this.http.get<Array<HistoryVariableInstanceResponse>>(this.BASE_URL, { params: payload }).pipe(
      tap((historyVI: Array<HistoryVariableInstanceResponse>) => {
        log.debug(`respuesta de historial de variables: ${JSON.stringify(historyVI)}`);
      })
    );
  }
}
