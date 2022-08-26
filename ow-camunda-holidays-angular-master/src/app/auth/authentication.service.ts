import { Injectable } from '@angular/core';
import { mergeMap, Observable, of } from 'rxjs';
import { AuthPayload } from '@app/services/auth/payload';
import { HttpHeaders } from '@angular/common/http';
import { AuthResponse } from '@app/services/auth/response';
import { ProfilePayload } from '@services/camunda/user/profile/payload';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { ProfileService } from '@services/camunda/user/profile/profile.service';
import { ProfileResponse } from '@services/camunda/user/profile/response';
import { GroupsPayload } from '@services/camunda/identity/groups/payload';
import { GroupsService } from '@services/camunda/identity/groups/groups.service';
import { GroupsResponse } from '@services/camunda/identity/groups/response';
import { User } from '@app/models/user';
import { map } from 'rxjs/operators';
import { CamundaAuthenticationService } from '@services/auth/camunda-authentication.service';

const credentialsKey = 'credentials';
const userInfoKey = 'user';

interface CamundaJwtPayload extends JwtPayload {
  username: string;
  groupIds: string[];
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private credentialsService: CamundaAuthenticationService,
    private groupsService: GroupsService,
    private profileService: ProfileService
  ) {
    this._credentials = localStorage.getItem(credentialsKey);
    if (this._credentials == undefined) {
      this._credentials = sessionStorage.getItem(credentialsKey);
    }
  }

  private _credentials!: string | null;

  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): string | null {
    return this._credentials;
  }

  private _userInfo!: User;

  /**
   * Gets the user info.
   * @return The user info or null if the user is not authenticated.
   */
  get userInfo(): User {
    return this._userInfo;
  }

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: AuthPayload): Observable<User> {
    // Tenemos que meter las cabeceras a mano porque en este punto no hay sesión
    const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest');

    let profile: ProfileResponse;

    return this.credentialsService
      .auth(context, headers)
      .pipe(
        // Encadenamos una consulta al perfil del usuario
        mergeMap((authResponse: AuthResponse) => {
          this.setCredentials(authResponse.token, context.remember);

          const user: ProfilePayload = new ProfilePayload();
          const token = jwtDecode<CamundaJwtPayload>(authResponse.token);

          user.id = token.username;

          return this.profileService.get(user);
        }),
        // Encadenamos una consulta a los grupos del usuario
        mergeMap((profileResponse: ProfileResponse) => {
          const user: GroupsPayload = new GroupsPayload();
          user.userId = profileResponse.id;
          profile = profileResponse;

          return this.groupsService.get(user);
        })
      )
      .pipe(
        // Mapeamos la respuesta final con la información del usuario
        map((groupsResponse: GroupsResponse) => {
          this.setUserInfo(profile, groupsResponse, context.remember);
          return this._userInfo;
        })
      );
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    this.setCredentials();
    return of(true);
  }

  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   */
  private setCredentials(credentials?: string, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, credentials);
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }

  /**
   * Sets the user info.
   * The info may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the info are only persisted for the current session.
   * @param user The user info.
   * @param groups User groups.
   * @param remember True to remember credentials across sessions.
   */
  private setUserInfo(user?: ProfileResponse, groups?: GroupsResponse, remember?: boolean) {
    const usr = new User();

    if (user && groups) {
      usr.id = user.id;
      usr.firstName = user.firstName;
      usr.lastName = user.lastName;
      usr.email = user.email;
      usr.roles = groups.groups;

      this._userInfo = usr;

      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(userInfoKey, JSON.stringify(usr));
    } else {
      sessionStorage.removeItem(userInfoKey);
      localStorage.removeItem(userInfoKey);
    }
  }
}
