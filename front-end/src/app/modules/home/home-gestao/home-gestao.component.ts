import { Component } from '@angular/core';
import { GlobalsService } from 'src/app/services/globals.service';

@Component({
  selector: 'app-home-gestao',
  templateUrl: './home-gestao.component.html',
  styleUrls: ['./home-gestao.component.scss']
})
export class HomeGestaoComponent {
  constructor(public gb: GlobalsService) {}
}
