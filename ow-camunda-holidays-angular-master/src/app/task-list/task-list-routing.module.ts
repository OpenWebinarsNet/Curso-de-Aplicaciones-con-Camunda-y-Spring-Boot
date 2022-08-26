import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskListComponent } from './task-list.component';
import { Role } from '@app/models/role';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  {
    path: '',
    component: TaskListComponent,
    data: {
      title: marker('Task List'),
      roles: [Role.CamundaAdmin, Role.User],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class TaskListRoutingModule {}
