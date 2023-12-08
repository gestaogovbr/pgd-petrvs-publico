import { Component } from '@angular/core';
import { GlobalsService } from 'src/app/services/globals.service';

@Component({
  selector: 'app-home-execucao',
  templateUrl: './home-execucao.component.html',
  styleUrls: ['./home-execucao.component.scss']
})
export class HomeExecucaoComponent {
  constructor(public gb: GlobalsService) {}
}
