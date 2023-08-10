import { ToolbarButton } from './../../components/toolbar/toolbar.component';
import { OnInit, Injector, Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PageBase } from './page-base';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { FullRoute } from 'src/app/services/navigate.service';

@Injectable()
export abstract class PageReportFilterBase extends PageBase implements OnInit {
  public abstract editableForm?: EditableFormComponent;

  public abstract reportRoute: FullRoute;
  public mensagemCarregando = "Carregando dados do formulário...";
  public buttons: ToolbarButton[] = [{
    label: "Gerar relatório",
    icon: "bi bi-clipboard-data",
    onClick: this.onReport.bind(this)
  }];
  public form?: FormGroup;
  public formValidation?: (form?: FormGroup) => string | undefined | null;

  constructor(public injector: Injector) {
    super(injector);
  }

  ngAfterViewInit() {
    this.onInitializeData();
    this.cdRef.detectChanges();
  }

  public abstract initializeData(form: FormGroup): Promise<void> | void;

  private onInitializeData() {
    (async () => {
      try {
        await this.initializeData(this.form!);
      } catch (erro) {
        this.error("Erro ao carregar dados: " + erro);
      } finally {
        this.loading = false;
      }
    })();
  }

  async onReport() {
    const self = this;
    const error = this.formValidation ? this.formValidation(this.form!) : undefined;
    if(this.form!.valid && !error){
      try {
        this.reportRoute.params = Object.assign(this.reportRoute.params || {}, this.form!.value);
        await this.go.navigate(this.reportRoute, {modal: true});
      } catch (error: any) {
        self.error(error.message ? error.message : error);
      }
    } else {
      this.form!.markAllAsTouched();
      if(error) {
        this.error(error);
      }
      Object.entries(this.form!.controls).forEach(([key, value]) => {
        if(value.invalid) console.log("Validate => " + key, value.value, value.errors)
      });
    }
  }

  public getControlByName(controlName: string): FormControl {
    return this.form!.controls[controlName] as FormControl;
  }

  public error = (error: string) => {
    if(this.editableForm) this.editableForm.error = error;
  }
}
