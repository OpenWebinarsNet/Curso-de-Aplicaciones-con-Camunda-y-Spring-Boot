import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule, FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material.module';
import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import { SharedModule } from '@shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HolidayFormComponent } from '@app/task/holidayForm/holiday-form.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ValidateFormComponent } from '@app/task/validateForm/validate-form.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    FontAwesomeModule,
    TaskRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [TaskComponent, HolidayFormComponent, ValidateFormComponent],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' }],
})
export class TaskModule {}
