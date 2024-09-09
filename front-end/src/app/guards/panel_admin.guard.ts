import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthPanelService } from "../services/auth-panel.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class PanelAdminGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthPanelService) {}

  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.detailUser().then((user: any) => {
      if (user && user.nivel == 1) {
        return true;
      } else {
        this.router.navigate(['/panel']); 
        return false;
      }
    });
  }
}