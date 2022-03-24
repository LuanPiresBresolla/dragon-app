import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationGuard } from './authorization.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dragons' },
  {
    path: 'dragons',
    loadChildren: () => import('./modules/dragons/dragons.module').then(m => m.DragonsModule),
    canLoad: [AuthorizationGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  { path: '**', redirectTo: 'dragons', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
