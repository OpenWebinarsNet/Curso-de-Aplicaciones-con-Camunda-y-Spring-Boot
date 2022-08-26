import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { Logger } from '@shared';
import { AuthenticationService } from '@app/auth/authentication.service';
import { CredentialsService } from '@app/auth/credentials.service';

const log = new Logger('AuthenticationGuard');

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authenticationService.isAuthenticated()) {
      let authorised = true;

      if (route.data && route.data['roles']) {
        authorised = false;
        for (const role of this.credentialsService.userInfo.roles) {
          if (!authorised) {
            authorised = route.data['roles'].includes(role.id);
          }
        }
      }

      if (state.url === '/login') {
        log.debug('already authenticated, redirecting home...');
        this.router.navigate(['/home']);
      }

      if (!authorised) {
        log.debug('No permission, redirecting...');
        this.router.navigate(['/home']);
        return false;
      }

      return authorised;
    }

    log.debug('Not authenticated, redirecting and adding redirect url...');
    this.router.navigate(['/login'], { queryParams: { redirect: state.url }, replaceUrl: true });
    return false;
  }
}
