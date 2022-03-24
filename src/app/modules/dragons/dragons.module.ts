import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragonsRoutingModule } from './dragons-routing.module';
import { DragonsListComponent } from './dragons-list/dragons-list.component';
import { DragonCardComponent } from 'src/app/components/dragon-card/dragon-card.component';


@NgModule({
  declarations: [
    DragonsListComponent,
    DragonCardComponent
  ],
  imports: [
    CommonModule,
    DragonsRoutingModule
  ]
})
export class DragonsModule { }
