import { Title } from '@angular/platform-browser';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

import { AuthenticationService, CredentialsService } from '@app/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() sidenav!: MatSidenav;

  constructor(
    private router: Router,
    private titleService: Title,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService
  ) {}

  get username(): string | null {
    const userInfo = this.credentialsService.userInfo;
    return userInfo ? userInfo.id : null;
  }

  get title(): string {
    return this.titleService.getTitle();
  }

  ngOnInit() {}

  logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }
}
