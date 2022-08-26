import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProfilePayload } from './payload';
import { ProfileResponse } from './response';
import { Logger } from '@shared';

const log = new Logger('CamundaUserProfileService');

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  readonly BASE_URL = '/engine-rest/user';

  constructor(private http: HttpClient) {}

  get(payload: ProfilePayload): Observable<ProfileResponse> {
    return this.http.get<ProfileResponse>(`${this.BASE_URL}/${payload.id}/profile`).pipe(
      tap((profileResponse) => {
        log.debug(`respuesta de perfil: ${profileResponse}`);
      })
    );
  }
}
