import { ChangeDetectorRef, Component, HostBinding, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { InputSearchComponent } from 'src/app/components/input/input-search/input-search.component';
import { InputSwitchComponent } from 'src/app/components/input/input-switch/input-switch.component';
import { FormHelperService } from 'src/app/services/form-helper.service';
import { AtividadeListBase } from '../atividade-list-base';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ActivatedRouteSnapshot } from '@angular/router';


@Component({
  selector: 'atividade-dashboard',
  templateUrl: './atividade-dashboard.component.html',
  styleUrls: ['./atividade-dashboard.component.scss']
})
export class AtividadeDashboardComponent extends AtividadeListBase implements OnInit {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;
  @ViewChild('programa', { static: false }) public programa?: InputSearchComponent;
  @ViewChild('unidadesSubordinadas', { static: false }) public unidadesSubordinadas?: InputSwitchComponent;
  @Input() snapshot?: ActivatedRouteSnapshot;
  @Input() fixedFilter?: any[];


  constructor(public injector: Injector) {
    super(injector);
    /* Inicializações */
    //this.programaDao = injector.get<ProgramaDaoService>(ProgramaDaoService);
    this.title = this.lex.translate("Atividades");
    this.code = "MOD_DMD";
    this.fh = this.injector.get<FormHelperService>(FormHelperService);
    this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef);
    this.filter = this.fh.FormBuilder({
      programa_id: {default: ""},
      unidadesSubordinadas: {default: false}
    }, this.cdRef, this.validate);
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    /*if(controlName == 'programa_id' && !control.value?.length) {
      result = "Obrigatório";
    }*/
    return result;
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

}