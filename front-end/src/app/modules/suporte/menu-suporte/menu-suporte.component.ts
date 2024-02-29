import { Component } from '@angular/core';
import { GlobalsService } from 'src/app/services/globals.service';

@Component({
  selector: 'app-menu-suporte',
  templateUrl: './menu-suporte.component.html',
  styleUrls: ['./menu-suporte.component.scss']
})
export class MenuSuporteComponent {
  constructor(public gb: GlobalsService) {}
}
