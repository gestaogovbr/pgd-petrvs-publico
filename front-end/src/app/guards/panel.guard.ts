import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthPanelService } from "../services/auth-panel.service";

@Injectable({
  providedIn: 'root',
})
export class PanelGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthPanelService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.isAuthenticated().then((isAuthenticated: boolean) => {
      if (isAuthenticated) {
        return true;
      } else {
        this.router.navigate(['/panel-login']); // Redireciona para a página de login se o usuário não estiver autenticado
        return false;
      }
    });
  }
}
