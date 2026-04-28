import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { RelatorioCargaIndividualSiapeDaoService } from 'src/app/dao/relatorio-carga-individual-siape-dao.service';
import {
  RelatorioCargaIndividualSiape,
  RelatorioCargaIndividualSiapeCampo,
  RelatorioCargaIndividualSiapeSecao,
  RelatorioCargaIndividualSiapeStatusCampo,
  RelatorioCargaIndividualSiapeTipo
} from 'src/app/models/relatorio-carga-individual-siape.model';
import { PageBase } from '../../base/page-base';

@Component({
  selector: 'relatorio-carga-individual-siape',
  template: `
    <div class="relatorio-carga-siape-pagina">
      <toolbar></toolbar>

      <header class="relatorio-carga-siape-cabecalho">
        <h1>Relatorio de Carga Individual SIAPE</h1>
        <p>Consulta e visualizacao dos relatorios retornados pelo backend.</p>
      </header>

      <form class="relatorio-carga-siape-filtros" [formGroup]="filtro" (ngSubmit)="buscarPorId()">
        <label>
          <span>Identificador</span>
          <input class="form-control" formControlName="id" placeholder="ID do relatorio">
        </label>

        <label>
          <span>Tipo</span>
          <select class="form-select" formControlName="tipo">
            <option value="">Todos</option>
            <option value="servidor">Servidor</option>
            <option value="unidade">Unidade</option>
          </select>
        </label>

        <label>
          <span>CPF ou unidade</span>
          <input class="form-control" formControlName="chave" placeholder="Buscar recentes">
        </label>

        <div class="relatorio-carga-siape-acoes">
          <button class="btn btn-primary" type="submit">Buscar</button>
          <button class="btn btn-outline-secondary" type="button" (click)="listarRecentes()">Recentes</button>
          <button class="btn btn-outline-secondary" type="button" (click)="limpar()">Limpar</button>
        </div>
      </form>

      <section
        class="relatorio-carga-siape-conteudo"
        (click)="onConteudoClick($event)"
        [innerHTML]="conteudoHtml">
      </section>
    </div>
  `,
  styleUrls: ['./relatorio-carga-individual-siape.component.scss'],
  encapsulation: ViewEncapsulation.None,
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
  public exibindoDetalhe: boolean = false;
  public conteudoHtml: SafeHtml = '';

  private relatorioDao: RelatorioCargaIndividualSiapeDaoService;
  private sequenciaRequisicao: number = 0;

  constructor(public injector: Injector) {
    super(injector);
    this.relatorioDao = injector.get<RelatorioCargaIndividualSiapeDaoService>(RelatorioCargaIndividualSiapeDaoService);
  }

  public override async ngOnInit(): Promise<void> {
    super.ngOnInit();
    this.title = 'Carga Individual SIAPE';
    this.code = 'MOD_SIAPE_RELATORIO_CARGA';
    this.renderizarConteudo();

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

    const sequencia = ++this.sequenciaRequisicao;
    this.loading = true;

    try {
      const resposta = await this.relatorioDao.obterPorId(id);
      const relatorio = this.normalizarRelatorio(resposta);

      if (sequencia !== this.sequenciaRequisicao) {
        return;
      }

      this.relatorio = relatorio;
      this.exibindoDetalhe = !!relatorio;

      if (!this.relatorio) {
        this.exibindoDetalhe = false;
        this.renderizarConteudo();
        await this.dialog.alert('Relatório não encontrado', 'Não encontramos relatório para o identificador informado.');
        return;
      }

      this.renderizarConteudo();
      this.cdRef.detectChanges();
    } catch (error: unknown) {
      if (sequencia !== this.sequenciaRequisicao) {
        return;
      }

      this.exibindoDetalhe = false;
      this.relatorio = null;
      this.renderizarConteudo();
      await this.dialog.alert('Erro', this.mensagemErro(error, 'Não foi possível carregar o relatório.'));
    } finally {
      if (sequencia === this.sequenciaRequisicao) {
        this.loading = false;
      }
    }
  }

  public async listarRecentes(): Promise<void> {
    const sequencia = ++this.sequenciaRequisicao;
    this.loading = true;

    try {
      this.exibindoDetalhe = false;
      this.relatorio = null;

      const resposta = await this.relatorioDao.listarRecentes(
        this.filtro.controls.tipo.value ?? '',
        this.filtro.controls.chave.value?.trim() ?? '',
      );
      const recentes = this.normalizarRelatorios(resposta);

      if (sequencia !== this.sequenciaRequisicao) {
        return;
      }

      this.recentes = recentes;
      this.renderizarConteudo();
      this.cdRef.detectChanges();
    } catch (error: unknown) {
      if (sequencia !== this.sequenciaRequisicao) {
        return;
      }

      this.recentes = [];
      this.renderizarConteudo();
      await this.dialog.alert('Erro', this.mensagemErro(error, 'Não foi possível carregar os relatórios.'));
    } finally {
      if (sequencia === this.sequenciaRequisicao) {
        this.loading = false;
      }
    }
  }

  public abrir(relatorio: RelatorioCargaIndividualSiape): void {
    this.relatorio = this.normalizarRelatorio(relatorio);
    this.exibindoDetalhe = !!this.relatorio;
    this.filtro.controls.id.setValue(relatorio.id);
    this.renderizarConteudo();
    this.cdRef.detectChanges();
  }

  public limpar(): void {
    this.exibindoDetalhe = false;
    this.relatorio = null;
    this.recentes = [];
    this.filtro.reset({ id: '', tipo: '', chave: '' });
    this.renderizarConteudo();
    void this.listarRecentes();
  }

  public onConteudoClick(event: Event): void {
    const target = event.target as HTMLElement | null;
    const elemento = target?.closest('[data-relatorio-id], [data-acao]') as HTMLElement | null;

    if (!elemento) {
      return;
    }

    const relatorioId = elemento.getAttribute('data-relatorio-id');
    if (relatorioId) {
      const relatorio = this.recentes.find((item) => item.id === relatorioId);
      if (relatorio) {
        this.abrir(relatorio);
      } else {
        this.filtro.controls.id.setValue(relatorioId);
        void this.buscarPorId();
      }
      return;
    }

    const acao = elemento.getAttribute('data-acao');
    if (acao === 'recentes') {
      void this.listarRecentes();
    }
  }

  public valor(valor: unknown): string {
    if (valor === null || typeof valor === 'undefined') {
      return 'Nao informado';
    }

    if (valor instanceof Date) {
      return this.util.getDateTimeFormatted(valor);
    }

    if (typeof valor === 'string') {
      return valor.trim() ? valor : 'Nao informado';
    }

    if (typeof valor === 'number' || typeof valor === 'boolean') {
      return String(valor);
    }

    if (Array.isArray(valor)) {
      return valor.length ? valor.map((item) => this.valor(item)).join(', ') : 'Nao informado';
    }

    try {
      const serializado = JSON.stringify(valor);
      return serializado && serializado !== '{}' && serializado !== '[]' ? serializado : 'Nao informado';
    } catch {
      return String(valor);
    }
  }

  public valorCampo(campo: RelatorioCargaIndividualSiapeCampo, origem: 'recebido_siape' | 'registrado_petrvs'): string {
    const valor = campo[origem];

    if (campo.campo === 'dataUltimaTransacao') {
      return this.formatarDataSiape(valor);
    }

    return this.valor(valor);
  }

  public statusLabel(status: RelatorioCargaIndividualSiapeStatusCampo): string {
    const labels: Record<RelatorioCargaIndividualSiapeStatusCampo, string> = {
      confirmado: 'Confirmado',
      ajustado: 'Ajustado',
      divergente: 'Divergente',
      nao_aplicavel: 'Nao se aplica',
      nao_encontrado: 'Nao encontrado',
    };

    return labels[status] ?? status;
  }

  public formatarProcessadoEm(valor: unknown): string {
    if (valor === null || typeof valor === 'undefined') {
      return '';
    }

    if (valor instanceof Date) {
      return this.util.getDateTimeFormatted(valor);
    }

    if (typeof valor !== 'string') {
      return String(valor);
    }

    if (!valor.trim()) {
      return '';
    }

    const data = new Date(valor);
    if (Number.isNaN(data.getTime())) {
      return valor;
    }

    return this.util.getDateTimeFormatted(data);
  }

  private renderizarConteudo(): void {
    const html = this.exibindoDetalhe && this.relatorio
      ? this.renderizarDetalhe(this.relatorio)
      : this.renderizarLista(this.recentes);

    this.conteudoHtml = this.gb.sanitizer.bypassSecurityTrustHtml(html);
  }

  private renderizarLista(relatorios: RelatorioCargaIndividualSiape[]): string {
    if (!relatorios.length) {
      return `
        <div class="relatorio-carga-siape-bloco">
          <h2>Relatorios recentes</h2>
          <p class="relatorio-carga-siape-vazio">Nenhum relatorio encontrado.</p>
        </div>
      `;
    }

    const cards = relatorios.map((item) => `
      <article class="relatorio-carga-siape-card">
        <div class="relatorio-carga-siape-card__topo">
          <div>
            <strong>${this.escaparHtml(this.tipoLabel(item.tipo))}</strong>
            <span class="relatorio-carga-siape-muted">${this.escaparHtml(item.chave)}</span>
          </div>
          <span class="relatorio-carga-siape-chip ${this.statusResumoClass(item.status)}">
            ${this.escaparHtml(this.statusResumoLabel(item.status))}
          </span>
        </div>

        <div class="relatorio-carga-siape-card__meta">
          <span><strong>ID:</strong> ${this.escaparHtml(item.id)}</span>
          <span><strong>Processado em:</strong> ${this.escaparHtml(this.formatarProcessadoEm(item.processado_em) || '-')}</span>
        </div>

        <p class="relatorio-carga-siape-card__mensagem">${this.escaparHtml(item.mensagem_usuario)}</p>

        <div class="relatorio-carga-siape-card__acoes">
          <button class="btn btn-sm btn-outline-primary" type="button" data-relatorio-id="${this.escaparAtributo(item.id)}">
            Abrir detalhe
          </button>
        </div>
      </article>
    `).join('');

    return `
      <div class="relatorio-carga-siape-bloco">
        <h2>Relatorios recentes</h2>
        <div class="relatorio-carga-siape-lista">
          ${cards}
        </div>
      </div>
    `;
  }

  private renderizarDetalhe(relatorio: RelatorioCargaIndividualSiape): string {
    const orientacoes = relatorio.orientacoes.length
      ? `
        <section class="relatorio-carga-siape-box">
          <h3>Orientacoes</h3>
          <ul class="relatorio-carga-siape-orientacoes">
            ${relatorio.orientacoes.map((item) => `<li>${this.escaparHtml(item)}</li>`).join('')}
          </ul>
        </section>
      `
      : '';

    const secoes = relatorio.secoes.map((secao) => `
      <section class="relatorio-carga-siape-box">
        <h3>${this.escaparHtml(secao.titulo)}</h3>
        ${this.renderizarTabelaSecao(secao)}
      </section>
    `).join('');

    return `
      <div class="relatorio-carga-siape-bloco relatorio-carga-siape-detalhe">
        <div class="relatorio-carga-siape-detalhe__topo">
          <div>
            <h2>${this.escaparHtml(this.tipoLabel(relatorio.tipo))}</h2>
            <p>${this.escaparHtml(relatorio.mensagem_usuario)}</p>
          </div>
          <button class="btn btn-outline-secondary" type="button" data-acao="recentes">Voltar</button>
        </div>

        <div class="relatorio-carga-siape-meta">
          <span><strong>ID:</strong> ${this.escaparHtml(relatorio.id)}</span>
          <span><strong>Chave:</strong> ${this.escaparHtml(relatorio.chave)}</span>
          <span><strong>Status:</strong> ${this.escaparHtml(this.statusResumoLabel(relatorio.status))}</span>
          <span><strong>Processado em:</strong> ${this.escaparHtml(this.formatarProcessadoEm(relatorio.processado_em) || '-')}</span>
        </div>

        ${orientacoes}
        ${secoes || '<p class="relatorio-carga-siape-vazio">Nenhuma secao disponivel neste relatorio.</p>'}
      </div>
    `;
  }

  private renderizarTabelaSecao(secao: RelatorioCargaIndividualSiapeSecao): string {
    if (!secao.campos.length) {
      return '<p class="relatorio-carga-siape-vazio">Nenhum campo disponivel nesta secao.</p>';
    }

    const linhas = secao.campos.map((campo) => `
      <tr>
        <td>${this.escaparHtml(campo.rotulo)}</td>
        <td>${this.escaparHtml(this.valorCampo(campo, 'recebido_siape'))}</td>
        <td>${this.escaparHtml(this.valorCampo(campo, 'registrado_petrvs'))}</td>
        <td><span class="${this.statusCampoClass(campo.status)}">${this.escaparHtml(this.statusLabel(campo.status))}</span></td>
      </tr>
    `).join('');

    return `
      <div class="relatorio-carga-siape-tabela-wrapper">
        <table class="relatorio-carga-siape-tabela">
          <thead>
            <tr>
              <th>Campo</th>
              <th>Recebido do SIAPE</th>
              <th>Registrado no Petrvs</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${linhas}
          </tbody>
        </table>
      </div>
    `;
  }

  private tipoLabel(tipo: RelatorioCargaIndividualSiapeTipo): string {
    return tipo === 'servidor' ? 'Servidor' : 'Unidade';
  }

  private statusResumoLabel(status: RelatorioCargaIndividualSiape['status']): string {
    const labels: Record<RelatorioCargaIndividualSiape['status'], string> = {
      sucesso: 'Concluido',
      parcial: 'Atencao',
      erro: 'Nao concluido',
    };

    return labels[status] ?? status;
  }

  private statusResumoClass(status: RelatorioCargaIndividualSiape['status']): string {
    const classes: Record<RelatorioCargaIndividualSiape['status'], string> = {
      sucesso: 'relatorio-carga-siape-chip--sucesso',
      parcial: 'relatorio-carga-siape-chip--parcial',
      erro: 'relatorio-carga-siape-chip--erro',
    };

    return classes[status] ?? 'relatorio-carga-siape-chip--parcial';
  }

  private statusCampoClass(status: RelatorioCargaIndividualSiapeStatusCampo): string {
    const classes: Record<RelatorioCargaIndividualSiapeStatusCampo, string> = {
      confirmado: 'relatorio-carga-siape-status relatorio-carga-siape-status--confirmado',
      ajustado: 'relatorio-carga-siape-status relatorio-carga-siape-status--ajustado',
      divergente: 'relatorio-carga-siape-status relatorio-carga-siape-status--divergente',
      nao_aplicavel: 'relatorio-carga-siape-status relatorio-carga-siape-status--neutro',
      nao_encontrado: 'relatorio-carga-siape-status relatorio-carga-siape-status--alerta',
    };

    return classes[status] ?? 'relatorio-carga-siape-status relatorio-carga-siape-status--neutro';
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

  private normalizarRelatorios(relatorios: RelatorioCargaIndividualSiape[] | null | undefined): RelatorioCargaIndividualSiape[] {
    return (relatorios ?? [])
      .map((relatorio) => this.normalizarRelatorio(relatorio))
      .filter((relatorio): relatorio is RelatorioCargaIndividualSiape => relatorio !== null);
  }

  private normalizarRelatorio(relatorio: Partial<RelatorioCargaIndividualSiape> | null | undefined): RelatorioCargaIndividualSiape | null {
    if (!relatorio?.id || !relatorio.tipo || !relatorio.chave || !relatorio.status || typeof relatorio.mensagem_usuario !== 'string') {
      return null;
    }

    return {
      id: relatorio.id,
      processamento_id: relatorio.processamento_id ?? '',
      tipo: relatorio.tipo,
      chave: relatorio.chave,
      status: relatorio.status,
      entrada_valida: !!relatorio.entrada_valida,
      mensagem_usuario: relatorio.mensagem_usuario,
      orientacoes: Array.isArray(relatorio.orientacoes) ? relatorio.orientacoes.map((item) => String(item)) : [],
      secoes: this.normalizarSecoes(relatorio.secoes),
      processado_em: this.normalizarProcessadoEm(relatorio.processado_em),
    };
  }

  private normalizarSecoes(secoes: unknown): RelatorioCargaIndividualSiapeSecao[] {
    if (!Array.isArray(secoes)) {
      return [];
    }

    return secoes.map((secao, secaoIndex) => {
      const secaoParcial = (typeof secao === 'object' && secao !== null ? secao : {}) as Partial<RelatorioCargaIndividualSiapeSecao>;
      const campos = Array.isArray(secaoParcial.campos) ? secaoParcial.campos : [];

      return {
        titulo: typeof secaoParcial.titulo === 'string' && secaoParcial.titulo.trim().length
          ? secaoParcial.titulo
          : `Secao ${secaoIndex + 1}`,
        tipo: secaoParcial.tipo === 'unidade' ? 'unidade' : 'servidor',
        campos: campos.map((campo, campoIndex) => {
          const campoParcial = (typeof campo === 'object' && campo !== null ? campo : {}) as Partial<RelatorioCargaIndividualSiapeCampo>;

          return {
            campo: typeof campoParcial.campo === 'string' && campoParcial.campo.trim().length
              ? campoParcial.campo
              : `campo_${campoIndex + 1}`,
            rotulo: typeof campoParcial.rotulo === 'string' && campoParcial.rotulo.trim().length
              ? campoParcial.rotulo
              : typeof campoParcial.campo === 'string' && campoParcial.campo.trim().length
                ? campoParcial.campo
                : `Campo ${campoIndex + 1}`,
            recebido_siape: this.normalizarValorCampo(campoParcial.recebido_siape),
            registrado_petrvs: this.normalizarValorCampo(campoParcial.registrado_petrvs),
            status: this.normalizarStatusCampo(campoParcial.status),
          };
        }),
      };
    });
  }

  private normalizarValorCampo(valor: unknown): string | null {
    if (valor === null || typeof valor === 'undefined') {
      return null;
    }

    if (typeof valor === 'string') {
      return valor;
    }

    if (valor instanceof Date) {
      return this.util.getDateTimeFormatted(valor);
    }

    if (typeof valor === 'number' || typeof valor === 'boolean') {
      return String(valor);
    }

    try {
      return JSON.stringify(valor);
    } catch {
      return String(valor);
    }
  }

  private normalizarStatusCampo(status: unknown): RelatorioCargaIndividualSiapeStatusCampo {
    const statusPermitidos: RelatorioCargaIndividualSiapeStatusCampo[] = [
      'confirmado',
      'ajustado',
      'divergente',
      'nao_aplicavel',
      'nao_encontrado',
    ];

    return statusPermitidos.includes(status as RelatorioCargaIndividualSiapeStatusCampo)
      ? status as RelatorioCargaIndividualSiapeStatusCampo
      : 'nao_aplicavel';
  }

  private normalizarProcessadoEm(valor: unknown): string | null {
    if (valor === null || typeof valor === 'undefined') {
      return null;
    }

    if (typeof valor === 'string') {
      return valor.trim().length ? valor : null;
    }

    if (valor instanceof Date) {
      return valor.toISOString();
    }

    return String(valor);
  }

  private formatarDataSiape(valor: unknown): string {
    if (valor === null || typeof valor === 'undefined') {
      return 'Nao informado';
    }

    if (valor instanceof Date) {
      return this.formatarPartesData(valor.getDate(), valor.getMonth() + 1, valor.getFullYear());
    }

    if (typeof valor !== 'string') {
      return this.valor(valor);
    }

    const texto = valor.trim();
    if (!texto) {
      return 'Nao informado';
    }

    const dataBanco = /^(\d{4})-(\d{2})-(\d{2})(?:[ T]\d{2}:\d{2}:\d{2})?$/.exec(texto);
    if (dataBanco) {
      return this.formatarPartesData(Number(dataBanco[3]), Number(dataBanco[2]), Number(dataBanco[1]));
    }

    const dataSiape = /^(\d{2})(\d{2})(\d{4})$/.exec(texto);
    if (dataSiape) {
      return this.formatarPartesData(Number(dataSiape[1]), Number(dataSiape[2]), Number(dataSiape[3]));
    }

    return texto;
  }

  private formatarPartesData(dia: number, mes: number, ano: number): string {
    const data = new Date(ano, mes - 1, dia);

    if (data.getFullYear() !== ano || data.getMonth() !== mes - 1 || data.getDate() !== dia) {
      return 'Nao informado';
    }

    return [
      String(dia).padStart(2, '0'),
      String(mes).padStart(2, '0'),
      String(ano).padStart(4, '0'),
    ].join('-');
  }

  private escaparHtml(valor: string): string {
    return valor
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  private escaparAtributo(valor: string): string {
    return this.escaparHtml(valor);
  }
}
