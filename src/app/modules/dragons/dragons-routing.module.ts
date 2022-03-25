import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DragonDetailComponent } from './dragon-detail/dragon-detail.component';
import { DragonsListComponent } from './dragons-list/dragons-list.component';

const routes: Routes = [
  {
    path: '',
    component: DragonsListComponent,
  },
  {
    path: ':id',
    component: DragonDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DragonsRoutingModule { }
