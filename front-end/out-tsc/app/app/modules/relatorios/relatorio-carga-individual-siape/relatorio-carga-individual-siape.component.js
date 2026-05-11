import { __decorate } from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RelatorioCargaIndividualSiapeDaoService } from 'src/app/dao/relatorio-carga-individual-siape-dao.service';
import { PageBase } from '../../base/page-base';
let RelatorioCargaIndividualSiapeComponent = class RelatorioCargaIndividualSiapeComponent extends PageBase {
    constructor(injector) {
        super(injector);
        this.injector = injector;
        this.filtro = new FormGroup({
            id: new FormControl(''),
            tipo: new FormControl(''),
            chave: new FormControl(''),
        });
        this.relatorio = null;
        this.recentes = [];
        this.exibindoDetalhe = false;
        this.conteudoHtml = '';
        this.sequenciaRequisicao = 0;
        this.relatorioDao = injector.get(RelatorioCargaIndividualSiapeDaoService);
    }
    async ngOnInit() {
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
    async buscarPorId() {
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
        }
        catch (error) {
            if (sequencia !== this.sequenciaRequisicao) {
                return;
            }
            this.exibindoDetalhe = false;
            this.relatorio = null;
            this.renderizarConteudo();
            await this.dialog.alert('Erro', this.mensagemErro(error, 'Não foi possível carregar o relatório.'));
        }
        finally {
            if (sequencia === this.sequenciaRequisicao) {
                this.loading = false;
            }
        }
    }
    async listarRecentes() {
        const sequencia = ++this.sequenciaRequisicao;
        this.loading = true;
        try {
            this.exibindoDetalhe = false;
            this.relatorio = null;
            const resposta = await this.relatorioDao.listarRecentes(this.filtro.controls.tipo.value ?? '', this.filtro.controls.chave.value?.trim() ?? '');
            const recentes = this.normalizarRelatorios(resposta);
            if (sequencia !== this.sequenciaRequisicao) {
                return;
            }
            this.recentes = recentes;
            this.renderizarConteudo();
            this.cdRef.detectChanges();
        }
        catch (error) {
            if (sequencia !== this.sequenciaRequisicao) {
                return;
            }
            this.recentes = [];
            this.renderizarConteudo();
            await this.dialog.alert('Erro', this.mensagemErro(error, 'Não foi possível carregar os relatórios.'));
        }
        finally {
            if (sequencia === this.sequenciaRequisicao) {
                this.loading = false;
            }
        }
    }
    abrir(relatorio) {
        this.relatorio = this.normalizarRelatorio(relatorio);
        this.exibindoDetalhe = !!this.relatorio;
        this.filtro.controls.id.setValue(relatorio.id);
        this.renderizarConteudo();
        this.cdRef.detectChanges();
    }
    limpar() {
        this.exibindoDetalhe = false;
        this.relatorio = null;
        this.recentes = [];
        this.filtro.reset({ id: '', tipo: '', chave: '' });
        this.renderizarConteudo();
        void this.listarRecentes();
    }
    onConteudoClick(event) {
        const target = event.target;
        const elemento = target?.closest('[data-relatorio-id], [data-acao]');
        if (!elemento) {
            return;
        }
        const relatorioId = elemento.getAttribute('data-relatorio-id');
        if (relatorioId) {
            const relatorio = this.recentes.find((item) => item.id === relatorioId);
            if (relatorio) {
                this.abrir(relatorio);
            }
            else {
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
    valor(valor) {
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
        }
        catch {
            return String(valor);
        }
    }
    statusLabel(status) {
        const labels = {
            confirmado: 'Confirmado',
            ajustado: 'Ajustado',
            divergente: 'Divergente',
            nao_aplicavel: 'Nao se aplica',
            nao_encontrado: 'Nao encontrado',
        };
        return labels[status] ?? status;
    }
    formatarProcessadoEm(valor) {
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
    renderizarConteudo() {
        const html = this.exibindoDetalhe && this.relatorio
            ? this.renderizarDetalhe(this.relatorio)
            : this.renderizarLista(this.recentes);
        this.conteudoHtml = this.gb.sanitizer.bypassSecurityTrustHtml(html);
    }
    renderizarLista(relatorios) {
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
    renderizarDetalhe(relatorio) {
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
    renderizarTabelaSecao(secao) {
        if (!secao.campos.length) {
            return '<p class="relatorio-carga-siape-vazio">Nenhum campo disponivel nesta secao.</p>';
        }
        const linhas = secao.campos.map((campo) => `
      <tr>
        <td>${this.escaparHtml(campo.rotulo)}</td>
        <td>${this.escaparHtml(this.valor(campo.recebido_siape))}</td>
        <td>${this.escaparHtml(this.valor(campo.registrado_petrvs))}</td>
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
    tipoLabel(tipo) {
        return tipo === 'servidor' ? 'Servidor' : 'Unidade';
    }
    statusResumoLabel(status) {
        const labels = {
            sucesso: 'Concluido',
            parcial: 'Atencao',
            erro: 'Nao concluido',
        };
        return labels[status] ?? status;
    }
    statusResumoClass(status) {
        const classes = {
            sucesso: 'relatorio-carga-siape-chip--sucesso',
            parcial: 'relatorio-carga-siape-chip--parcial',
            erro: 'relatorio-carga-siape-chip--erro',
        };
        return classes[status] ?? 'relatorio-carga-siape-chip--parcial';
    }
    statusCampoClass(status) {
        const classes = {
            confirmado: 'relatorio-carga-siape-status relatorio-carga-siape-status--confirmado',
            ajustado: 'relatorio-carga-siape-status relatorio-carga-siape-status--ajustado',
            divergente: 'relatorio-carga-siape-status relatorio-carga-siape-status--divergente',
            nao_aplicavel: 'relatorio-carga-siape-status relatorio-carga-siape-status--neutro',
            nao_encontrado: 'relatorio-carga-siape-status relatorio-carga-siape-status--alerta',
        };
        return classes[status] ?? 'relatorio-carga-siape-status relatorio-carga-siape-status--neutro';
    }
    mensagemErro(error, fallback) {
        if (typeof error !== 'object' || error === null) {
            return fallback;
        }
        const candidate = error;
        if (typeof candidate.error?.message === 'string') {
            return candidate.error.message;
        }
        return typeof candidate.message === 'string' ? candidate.message : fallback;
    }
    normalizarRelatorios(relatorios) {
        return (relatorios ?? [])
            .map((relatorio) => this.normalizarRelatorio(relatorio))
            .filter((relatorio) => relatorio !== null);
    }
    normalizarRelatorio(relatorio) {
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
    normalizarSecoes(secoes) {
        if (!Array.isArray(secoes)) {
            return [];
        }
        return secoes.map((secao, secaoIndex) => {
            const secaoParcial = (typeof secao === 'object' && secao !== null ? secao : {});
            const campos = Array.isArray(secaoParcial.campos) ? secaoParcial.campos : [];
            return {
                titulo: typeof secaoParcial.titulo === 'string' && secaoParcial.titulo.trim().length
                    ? secaoParcial.titulo
                    : `Secao ${secaoIndex + 1}`,
                tipo: secaoParcial.tipo === 'unidade' ? 'unidade' : 'servidor',
                campos: campos.map((campo, campoIndex) => {
                    const campoParcial = (typeof campo === 'object' && campo !== null ? campo : {});
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
    normalizarValorCampo(valor) {
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
        }
        catch {
            return String(valor);
        }
    }
    normalizarStatusCampo(status) {
        const statusPermitidos = [
            'confirmado',
            'ajustado',
            'divergente',
            'nao_aplicavel',
            'nao_encontrado',
        ];
        return statusPermitidos.includes(status)
            ? status
            : 'nao_aplicavel';
    }
    normalizarProcessadoEm(valor) {
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
    escaparHtml(valor) {
        return valor
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#39;');
    }
    escaparAtributo(valor) {
        return this.escaparHtml(valor);
    }
};
RelatorioCargaIndividualSiapeComponent = __decorate([
    Component({
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
], RelatorioCargaIndividualSiapeComponent);
export { RelatorioCargaIndividualSiapeComponent };
//# sourceMappingURL=relatorio-carga-individual-siape.component.js.map