import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { Shell } from '@app/shell/shell.service';
import { Role } from '@app/models/role';
import { AuthenticationGuard } from '@app/auth';

/**
 * Ruta dashboard
 */
const routes: Routes = [
  Shell.childRoutes([
    {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full',
    },
    {
      path: 'home',
      component: HomeComponent,
      data: {
        title: 'Dashboard',
        roles: [Role.CamundaAdmin, Role.User],
      },
      canActivate: [AuthenticationGuard],
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class HomeRoutingModule {}
