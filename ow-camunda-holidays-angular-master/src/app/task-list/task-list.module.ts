import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule, FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { TaskListRoutingModule } from './task-list-routing.module';
import { TaskListComponent } from './task-list.component';
import { SharedModule } from '@shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    FontAwesomeModule,
    TaskListRoutingModule,
    MatTableModule,
  ],
  declarations: [TaskListComponent],
  providers: [],
})
export class TaskListModule {}
