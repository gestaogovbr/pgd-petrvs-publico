import { ChangeDetectorRef, Component, Injector, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { DaoBaseService } from 'src/app/dao/dao-base.service';
import { QueryContext } from 'src/app/dao/query-context';
import { Base } from 'src/app/models/base.model';
import { ComentarioOrigem, HasComentarios } from 'src/app/models/comentario';
import { ComentarioService } from 'src/app/services/comentario.service';
import { FormHelperService } from 'src/app/services/form-helper.service';
import { LookupService } from 'src/app/services/lookup.service';
import { NavigateService } from 'src/app/services/navigate.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'comentarios-widget',
  templateUrl: './comentarios-widget.component.html',
  styleUrls: ['./comentarios-widget.component.scss']
})
export class ComentariosWidgetComponent implements OnInit {
  @Input() selectable: boolean = false;
  //@Input() dao?: DaoBaseService<Base>;
  @Input() origem: ComentarioOrigem = undefined;
  @Input() save?: (modalResult: any) => void;
  @Input() grid?: GridComponent;
  @Input() set entity(value: HasComentarios | undefined) {
    if(this._entity != value) {
      this._entity = value;
      if(value && this.comentario) value.comentarios = this.comentario.orderComentarios(value.comentarios || []);
    }
  }
  get entity(): HasComentarios | undefined {
    return this._entity;
  }

  public form: FormGroup;
  public fh: FormHelperService; 
  public cdRef: ChangeDetectorRef; 
  public go: NavigateService;
  public util: UtilService;
  public lookup: LookupService;
  public comentario: ComentarioService;
  public addComentarioButton: ToolbarButton = {
    icon: "bi bi-plus-circle",
    hint: "Incluir comentário"
  }

  private _entity: HasComentarios | undefined = undefined;

  constructor(public injector: Injector) {
    this.fh = injector.get<FormHelperService>(FormHelperService); 
    this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef); 
    this.go = injector.get<NavigateService>(NavigateService);
    this.util = injector.get<UtilService>(UtilService);
    this.lookup = injector.get<LookupService>(LookupService);
    this.comentario = injector.get<ComentarioService>(ComentarioService);
    this.form = this.fh.FormBuilder({
      comentarios: {default: []}
    }, this.cdRef, this.validate);
  }

  ngOnInit(): void {
  }

  public validate = (control: AbstractControl, controlName: string) => {
    let result = null;
    return result;
  }

  public comentarioClick(element: HTMLSpanElement) {
    const value = element.getAttribute("data-expanded");
    element.setAttribute("data-expanded", value == "true" ? "false" : "true");
  }

  public addComentarioClick(event: Event, row: any, comentario_id?: string) {
    event?.stopPropagation();
    this.go.navigate({ route: ['uteis', 'comentarios', this.origem, row.id, 'new'], params: {comentario_id} }, { modal: true, modalClose: modalResult => { if (modalResult) {
      if(this.save) this.save(modalResult);
      this.grid?.query?.refreshId(row.id);
    }}});
  }

}
