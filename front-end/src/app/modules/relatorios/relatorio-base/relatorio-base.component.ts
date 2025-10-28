import { Component, Injector, ViewChild, Type } from "@angular/core";
import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";
import { GridComponent } from "src/app/components/grid/grid.component";
import { UnidadeDaoService } from "src/app/dao/unidade-dao.service";
import { UsuarioDaoService } from "src/app/dao/usuario-dao.service";
import { PageListBase } from "src/app/modules/base/page-list-base";
import { Base } from 'src/app/models/base.model';
import { DaoBaseService } from 'src/app/dao/dao-base.service';

@Component({
  selector: 'relatorio-base',
  templateUrl: './relatorio-base.component.html',
  styleUrls: ['./relatorio-base.component.scss']
})
export abstract class RelatorioBaseComponent<M extends Base, D extends DaoBaseService<M>> extends PageListBase<M, D> {
  @ViewChild(GridComponent, { static: false }) public grid?: GridComponent;

  public usuarioDao: UsuarioDaoService;
  public unidadeDao: UnidadeDaoService;
  public unidadeId: string = '';
  public loaded: boolean = false;
  public unidades?: any[];
  public permissao: string = '';

  constructor(public injector: Injector, mType: Type<M>, dType: Type<D>) {
    super(injector, mType, dType);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.unidadeDao = injector.get<UnidadeDaoService>(UnidadeDaoService);
  }

  public lotacaoValidator(control: AbstractControl): ValidationErrors | null
  {
    return !this.auth.unidade ? { errorMessage: "Usuário sem unidade de lotação" } : null;
  }

  public requiredValidator(control: AbstractControl): ValidationErrors | null { 
      return this.util.empty(control.value) ? { errorMessage: "Obrigatório" } : null;
  }

  public async ngOnInit() {
      super.ngOnInit();

      this.unidades = [];
      if (!this.auth.hasPermissionTo(this.permissao + '_TODAS_UNIDADES') && this.auth.unidade) {
        // carrega todas as vinculacoes do usuario e subordinadas
        this.unidades = [];
        let unidades = [this.auth.unidade];
        if (this.auth.hasPermissionTo(this.permissao + '_UNIDADES_VINCULADAS')) {
          if (this.auth.unidades) {
            unidades = this.auth.unidades;
          }
        }

        for(let unidade of unidades) {
          this.unidades.push(unidade.id);
          const subordinadas = (await this.unidadeDao.subordinadas(unidade?.id)).map((item: any) => item.id);
          this.unidades = this.unidades.concat(subordinadas);
        }
      }
  }

  public ngAfterViewInit(): void {
      super.ngAfterViewInit();
      this.loaded = true;
  }

  public onFilterClear() {
    this.filter?.reset()
    this.grid!.reloadFilter();
    this.cdRef.markForCheck();
  }

  public onValueChange(event: Event) {
    if (this.loaded) {
      this.onButtonFilterClick(this.filter!);
    }
  }

  public onButtonFilterClick = (filter: FormGroup) => {}
}