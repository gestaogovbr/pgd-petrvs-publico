import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EditableFormComponent } from 'src/app/components/editable-form/editable-form.component';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { PageBase } from 'src/app/modules/base/page-base';
import { DispensaPlanoTrabalhoResumo } from './dispensa-plano-trabalho.types';

@Component({
  selector: 'app-dispensa-plano-trabalho-form',
  templateUrl: './dispensa-plano-trabalho-form.component.html',
  styleUrls: ['./dispensa-plano-trabalho-form.component.scss'],
  standalone: false
})
export class DispensaPlanoTrabalhoFormComponent extends PageBase implements OnInit {
  @ViewChild(EditableFormComponent, { static: false }) public editableForm?: EditableFormComponent;

  public form: FormGroup;
  public dao: UsuarioDaoService;
  public usuarioId = '';
  public saving = false;
  public loadError: string | null = null;
  public resumo: DispensaPlanoTrabalhoResumo | null = null;

  public readonly cienciaTexto =
    'Declaro que estou ciente dos critérios para dispensa de Plano de Trabalho, nos termos do § 3º do art. 19 da IN Conjunta SEGES-SGPRT/MGI nº 24/2023.';

  constructor(public injector: Injector) {
    super(injector);
    this.dao = injector.get(UsuarioDaoService);
    this.form = this.fh.FormBuilder(
      {
        data_inicio: { default: null },
        data_fim: { default: null },
        ciencia: { default: false }
      },
      this.cdRef,
      this.validate
    );
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.usuarioId = this.urlParams?.get('id') || '';
    this.title = 'Dispensa de Plano de Trabalho';
    this.loading = true;
    void this.carregar();
  }

  public validate = (control: AbstractControl, controlName: string) => {
    if (controlName === 'data_inicio' && !control.value) {
      return 'Obrigatório';
    }
    if (controlName === 'ciencia' && !control.value) {
      return 'Obrigatório';
    }
    return null;
  };

  public formValidation = (form?: FormGroup) => {
    const inicio = form?.controls.data_inicio.value;
    const fim = form?.controls.data_fim.value;
    if (inicio && fim && new Date(fim) < new Date(inicio)) {
      return 'A data de fim da dispensa não pode ser anterior à data de início.';
    }
    if (!form?.controls.ciencia.value) {
      return 'É necessário fornecer a ciência para formalizar ou alterar a dispensa.';
    }
    return null;
  };

  public async carregar(): Promise<void> {
    if (!this.usuarioId) {
      this.loadError = 'Usuário não informado.';
      this.loading = false;
      return;
    }
    this.loading = true;
    this.loadError = null;
    try {
      this.resumo = await this.dao.getDispensaPlanoTrabalho(this.usuarioId);
      this.form.controls.data_inicio.setValue(
        this.resumo.data_inicio ? this.parseDate(this.resumo.data_inicio) : null
      );
      this.form.controls.data_fim.setValue(
        this.resumo.data_fim ? this.parseDate(this.resumo.data_fim) : null
      );
      this.form.controls.ciencia.setValue(false);
      this.title = this.resumo.dispensa_id
        ? 'Alterar Dispensa de Plano de Trabalho'
        : 'Dispensar de Plano de Trabalho';
    } catch (err: unknown) {
      this.loadError = err instanceof Error ? err.message : 'Não foi possível carregar a dispensa.';
    } finally {
      this.loading = false;
      this.cdRef.detectChanges();
    }
  }

  public async onSubmit(): Promise<void> {
    const validationError = this.formValidation(this.form);
    if (validationError) {
      this.dialog.alert('Atenção', validationError);
      return;
    }
    this.saving = true;
    try {
      this.resumo = await this.dao.salvarDispensaPlanoTrabalho(this.usuarioId, {
        data_inicio: this.formatDate(this.form.controls.data_inicio.value),
        data_fim: this.form.controls.data_fim.value
          ? this.formatDate(this.form.controls.data_fim.value)
          : null,
        ciencia: true
      });
      this.form.controls.ciencia.setValue(false);
      this.dialog.alert('Sucesso', 'Dispensa de Plano de Trabalho registrada com sucesso.');
      this.go.setModalResult(this.modalRoute?.queryParams?.idroute, { id: this.usuarioId });
      this.close();
    } catch (err: unknown) {
      this.dialog.alert('Erro', err instanceof Error ? err.message : (typeof err === 'string' ? err : 'Falha ao salvar a dispensa.'));
    } finally {
      this.saving = false;
      this.cdRef.detectChanges();
    }
  }

  public async onEncerrar(): Promise<void> {
    if (!this.form.controls.ciencia.value) {
      this.dialog.alert('Atenção', 'É necessário fornecer a ciência para encerrar a dispensa.');
      return;
    }
    const confirm = await this.dialog.confirm(
      'Encerrar dispensa',
      'Confirma o encerramento da dispensa de Plano de Trabalho a partir de hoje?'
    );
    if (!confirm) {
      return;
    }
    this.saving = true;
    try {
      this.resumo = await this.dao.encerrarDispensaPlanoTrabalho(this.usuarioId, true);
      this.dialog.alert('Sucesso', 'Dispensa encerrada com sucesso.');
      this.go.setModalResult(this.modalRoute?.queryParams?.idroute, { id: this.usuarioId });
      this.close();
    } catch (err: unknown) {
      this.dialog.alert('Erro', err instanceof Error ? err.message : (typeof err === 'string' ? err : 'Falha ao encerrar a dispensa.'));
    } finally {
      this.saving = false;
      this.cdRef.detectChanges();
    }
  }

  public onCancel(): void {
    this.close();
  }

  public formatDateTime(value: string | null | undefined): string {
    if (!value) {
      return '—';
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }
    return date.toLocaleString('pt-BR');
  }

  public formatDateOnly(value: string | null | undefined): string {
    if (!value) {
      return '—';
    }
    const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (match) {
      return `${match[3]}/${match[2]}/${match[1]}`;
    }
    return value;
  }

  public operacaoLabel(operacao: string): string {
    switch (operacao) {
      case 'FORMALIZAR':
        return 'Formalização';
      case 'ALTERAR':
        return 'Alteração';
      case 'ENCERRAR':
        return 'Encerramento';
      default:
        return operacao;
    }
  }

  private parseDate(value: string): Date {
    const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (match) {
      return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
    }
    return new Date(value);
  }

  private formatDate(value: Date | string): string {
    const date = value instanceof Date ? value : new Date(value);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
}
