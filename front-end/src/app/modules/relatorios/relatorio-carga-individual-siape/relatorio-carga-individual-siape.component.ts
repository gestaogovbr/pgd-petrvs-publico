import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RelatorioCargaIndividualSiapeDaoService } from 'src/app/dao/relatorio-carga-individual-siape-dao.service';
import {
  RelatorioCargaIndividualSiape,
  RelatorioCargaIndividualSiapeCampo,
  RelatorioCargaIndividualSiapeStatusCampo,
  RelatorioCargaIndividualSiapeTipo
} from 'src/app/models/relatorio-carga-individual-siape.model';
import { PageBase } from '../../base/page-base';

@Component({
  selector: 'relatorio-carga-individual-siape',
  templateUrl: './relatorio-carga-individual-siape.component.html',
  styleUrls: ['./relatorio-carga-individual-siape.component.scss'],
  standalone: false
})
export class RelatorioCargaIndividualSiapeComponent extends PageBase implements OnInit {
  public filtro = new FormGroup({
    id: new FormControl<string>(''),
    tipo: new FormControl<RelatorioCargaIndividualSiapeTipo | ''>(''),
    chave: new FormControl<string>(''),
  });
  public relatorio: RelatorioCargaIndividualSiape | null = null;
  public recentes: RelatorioCargaIndividualSiape[] = [];

  private relatorioDao: RelatorioCargaIndividualSiapeDaoService;

  constructor(public injector: Injector) {
    super(injector);
    this.relatorioDao = injector.get<RelatorioCargaIndividualSiapeDaoService>(RelatorioCargaIndividualSiapeDaoService);
  }

  public override async ngOnInit(): Promise<void> {
    super.ngOnInit();
    this.title = 'Carga Individual SIAPE';
    this.code = 'MOD_SIAPE_RELATORIO_CARGA';

    if (!this.auth.hasPermissionTo('MOD_SIAPE_RELATORIO_CARGA')) {
      await this.dialog.alert('Acesso restrito', 'Você não tem permissão para acessar este relatório.');
      this.go.back();
      return;
    }

    const relatorioId = this.metadata?.relatorioId ?? this.queryParams?.id ?? this.queryParams?.relatorio_carga_id;
    if (relatorioId) {
      this.filtro.controls.id.setValue(relatorioId);
      await this.buscarPorId();
      return;
    }

    await this.listarRecentes();
  }

  public async buscarPorId(): Promise<void> {
    const id = this.filtro.controls.id.value?.trim();
    if (!id) {
      await this.listarRecentes();
      return;
    }

    this.loading = true;
    try {
      this.relatorio = await this.relatorioDao.obterPorId(id);
      if (!this.relatorio) {
        await this.dialog.alert('Relatório não encontrado', 'Não encontramos relatório para o identificador informado.');
      }
    } catch (error: unknown) {
      await this.dialog.alert('Erro', this.mensagemErro(error, 'Não foi possível carregar o relatório.'));
    } finally {
      this.loading = false;
    }
  }

  public async listarRecentes(): Promise<void> {
    this.loading = true;
    try {
      this.relatorio = null;
      this.recentes = await this.relatorioDao.listarRecentes(
        this.filtro.controls.tipo.value ?? '',
        this.filtro.controls.chave.value?.trim() ?? '',
      );
    } catch (error: unknown) {
      await this.dialog.alert('Erro', this.mensagemErro(error, 'Não foi possível carregar os relatórios.'));
    } finally {
      this.loading = false;
    }
  }

  public abrir(relatorio: RelatorioCargaIndividualSiape): void {
    this.relatorio = relatorio;
    this.filtro.controls.id.setValue(relatorio.id);
  }

  public limpar(): void {
    this.relatorio = null;
    this.filtro.reset({ id: '', tipo: '', chave: '' });
    this.listarRecentes();
  }

  public valor(valor: string | null): string {
    return valor?.trim() ? valor : 'Não informado';
  }

  public statusLabel(status: RelatorioCargaIndividualSiapeStatusCampo): string {
    const labels: Record<RelatorioCargaIndividualSiapeStatusCampo, string> = {
      confirmado: 'Confirmado',
      ajustado: 'Ajustado',
      divergente: 'Divergente',
      nao_aplicavel: 'Não se aplica',
      nao_encontrado: 'Não encontrado',
    };

    return labels[status] ?? status;
  }

  public statusClass(status: RelatorioCargaIndividualSiapeStatusCampo): string {
    const classes: Record<RelatorioCargaIndividualSiapeStatusCampo, string> = {
      confirmado: 'status-confirmado',
      ajustado: 'status-ajustado',
      divergente: 'status-divergente',
      nao_aplicavel: 'status-neutro',
      nao_encontrado: 'status-alerta',
    };

    return classes[status] ?? 'status-neutro';
  }

  public campoTrack(_: number, campo: RelatorioCargaIndividualSiapeCampo): string {
    return campo.campo;
  }

  private mensagemErro(error: unknown, fallback: string): string {
    if (typeof error !== 'object' || error === null) {
      return fallback;
    }

    const candidate = error as { error?: { message?: unknown }, message?: unknown };
    if (typeof candidate.error?.message === 'string') {
      return candidate.error.message;
    }

    return typeof candidate.message === 'string' ? candidate.message : fallback;
  }
}
