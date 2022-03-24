import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

type canActivateReturn = Observable<boolean> | Promise<boolean> | boolean;

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
  constructor(
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): canActivateReturn {
      return this.checkLogin(state.url);
  }

  canLoad(route: Route): canActivateReturn {
    const url = `/${route.path}`;
    return this.checkLogin(url);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): canActivateReturn {
    return this.canActivate(route, state);
  }

  checkLogin(url: string): canActivateReturn {
    const isLogged = localStorage.getItem('@dragonApp:logged');

    if (isLogged) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
