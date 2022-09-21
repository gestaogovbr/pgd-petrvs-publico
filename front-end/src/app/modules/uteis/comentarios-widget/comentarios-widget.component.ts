import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ToolbarButton } from 'src/app/components/toolbar/toolbar.component';
import { DaoBaseService } from 'src/app/dao/dao-base.service';
import { QueryContext } from 'src/app/dao/query-context';
import { Base } from 'src/app/models/base.model';
import { ComentarioOrigem, HasComentarios } from 'src/app/models/comentario';
import { FormHelperService } from 'src/app/services/form-helper.service';
import { LookupService } from 'src/app/services/lookup.service';
import { NavigateService } from 'src/app/services/navigate.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-comentarios-widget',
  templateUrl: './comentarios-widget.component.html',
  styleUrls: ['./comentarios-widget.component.scss']
})
export class ComentariosWidgetComponent implements OnInit {
  @Input() entity?: HasComentarios = undefined;
  @Input() selectable: boolean = false;
  @Input() dao?: DaoBaseService<Base>;
  @Input() origem: ComentarioOrigem = undefined;
  @Input() query?: QueryContext<Base>;

  public form: FormGroup;
  public addComentarioButton: ToolbarButton = {
    icon: "bi bi-plus-circle",
    hint: "Incluir comentário"
  }

  constructor(
    public fh: FormHelperService, 
    public cdRef: ChangeDetectorRef, 
    public go: NavigateService,
    public util: UtilService,
    public lookup: LookupService
  ) {
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

  public addComentarioClick(row: any, comentario_id?: string) {
    this.go.navigate({ route: ['uteis', 'comentarios', this.origem, row.id, 'new'], params: {comentario_id} }, { modal: true, modalClose: modalResult => { if (modalResult) this.query?.refreshId(row.id); } });
  }

}
