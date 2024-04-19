import { Injectable, Injector } from '@angular/core';
import { DaoBaseService } from './dao-base.service';
import { UserPanel } from '../models/user-panel.model';


@Injectable({
  providedIn: 'root'
})
export class UsersPanelDaoService extends DaoBaseService<UserPanel> {
  constructor(protected injector: Injector) {
    super("UserPanel", injector);
  }

  public getAllAdmins() {
    return new Promise<UserPanel[]>((resolve, reject) => {
      this.server.get('api/' + this.collection + '/getAllAdmins').subscribe(response => {
        resolve(response?.data || []);
      }, error => reject(error));
    });
  }

}