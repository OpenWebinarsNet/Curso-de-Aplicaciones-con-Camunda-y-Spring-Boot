import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule, FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '@shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    FontAwesomeModule,
    HomeRoutingModule,
  ],
  declarations: [HomeComponent],
  providers: [],
})
export class HomeModule {}
