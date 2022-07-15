import { ActivatedRouteSnapshot } from '@angular/router';
import { Subject } from 'rxjs';

export interface ModalPage {
  modalRoute?: ActivatedRouteSnapshot;
  modalInterface: boolean;
  modalWidth: number;
  metadata?: any;
  titleSubscriber: Subject<string>;
}
