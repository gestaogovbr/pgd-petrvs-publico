import { Component, Injector, Input } from "@angular/core";
import { PageFrameBase } from "../../base/page-frame-base";

export type ColunaTipo = {
  titulo?: string,
  texto: string
}

@Component({
  selector: 'app-colunas',
  templateUrl: './colunas.component.html',
  styleUrls: ['./colunas.component.scss']
})
export class ColunasComponent extends PageFrameBase {
  @Input() colunas: ColunaTipo[] = [];

  constructor(public injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}