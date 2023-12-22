import { Component , Injector } from '@angular/core';
import { GlobalsService } from 'src/app/services/globals.service';
import { LexicalService } from 'src/app/services/lexical.service';

@Component({
  selector: 'app-home-execucao',
  templateUrl: './home-execucao.component.html',
  styleUrls: ['./home-execucao.component.scss']
})
export class HomeExecucaoComponent {
  
  public lex: LexicalService;
  public gb: GlobalsService;

  constructor(injector: Injector) {
    this.lex = injector.get<LexicalService>(LexicalService);
    this.gb = injector.get<GlobalsService>(GlobalsService);
  }
}
