import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule, FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { TaskHistoryRoutingModule } from './task-history-routing.module';
import { TaskHistoryComponent } from './task-history.component';
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
    TaskHistoryRoutingModule,
    MatTableModule,
  ],
  declarations: [TaskHistoryComponent],
  providers: [],
})
export class TaskHistoryModule {}
