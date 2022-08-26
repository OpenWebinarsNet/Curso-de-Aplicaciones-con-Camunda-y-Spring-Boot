import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { AuthenticationService } from '@app/auth/index';
import { I18nService } from '@app/i18n';
import { Logger } from '@shared';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  version: string | null = environment.version;
  error: string | undefined;
  loginForm!: UntypedFormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private i18nService: I18nService,
    private authenticationService: AuthenticationService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  login() {
    this.isLoading = true;
    const login$ = this.authenticationService.login(this.loginForm.value);

    login$
      .pipe(
        finalize(() => {
          this.loginForm.markAsPristine();
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (userInfo) => {
          log.debug(`${userInfo.firstName} ${userInfo.lastName} successfully logged in`);
          this.route.queryParams.subscribe((params) =>
            this.router.navigate([params['redirect'] || '/'], { replaceUrl: true })
          );
        },
        error: (error) => {
          log.debug(`Login error: ${error.message}`);
          this.error = error.message;
        },
      });
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
      remember: true,
    });
  }
}
