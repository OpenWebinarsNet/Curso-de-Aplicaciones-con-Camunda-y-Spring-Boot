import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HistoryProcessInstanceResponse } from './response';
import { Logger } from '@shared';

const log = new Logger('CamundaTaskService');

@Injectable({
  providedIn: 'root',
})
export class HistoryProcessInstanceService {
  readonly BASE_URL = '/engine-rest/history/process-instance';

  constructor(private http: HttpClient) {}

  query(payload: any): Observable<Array<HistoryProcessInstanceResponse>> {
    return this.http.get<Array<HistoryProcessInstanceResponse>>(this.BASE_URL, { params: payload }).pipe(
      tap((historyPI: Array<HistoryProcessInstanceResponse>) => {
        log.debug(`respuesta de historial de instancias: ${JSON.stringify(historyPI)}`);
      })
    );
  }
}
