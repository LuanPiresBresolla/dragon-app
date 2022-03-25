import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DragonsRoutingModule } from './dragons-routing.module';
import { DragonsListComponent } from './dragons-list/dragons-list.component';
import { DragonCardComponent } from 'src/app/components/dragon-card/dragon-card.component';
import { DragonDetailComponent } from './dragon-detail/dragon-detail.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { InputComponent } from 'src/app/components/input/input.component';



@NgModule({
  declarations: [
    DragonsListComponent,
    DragonCardComponent,
    DragonDetailComponent,
    HeaderComponent,
    InputComponent,
  ],
  imports: [
    CommonModule,
    DragonsRoutingModule,
    FormsModule,
  ]
})
export class DragonsModule { }
