import { ChangeDetectorRef, Injector } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RelatorioCargaIndividualSiapeDaoService } from 'src/app/dao/relatorio-carga-individual-siape-dao.service';
import { RelatorioCargaIndividualSiape } from 'src/app/models/relatorio-carga-individual-siape.model';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';
import { EntityService } from 'src/app/services/entity.service';
import { FormHelperService } from 'src/app/services/form-helper.service';
import { GlobalsService } from 'src/app/services/globals.service';
import { LexicalService } from 'src/app/services/lexical.service';
import { LookupService } from 'src/app/services/lookup.service';
import { NavigateService } from 'src/app/services/navigate.service';
import { UtilService } from 'src/app/services/util.service';
import { RelatorioCargaIndividualSiapeComponent } from './relatorio-carga-individual-siape.component';

function relatorio2209(overrides: Partial<RelatorioCargaIndividualSiape> = {}): RelatorioCargaIndividualSiape {
  return {
    id: 'relatorio-2209',
    processamento_id: 'processamento-2209',
    tipo: 'servidor',
    chave: '52998224725',
    status: 'parcial',
    entrada_valida: true,
    mensagem_usuario: 'Carga individual concluída com atenção.',
    orientacoes: ['Verifique as divergências.'],
    processado_em: '2026-06-19T10:00:00-03:00',
    secoes: ['1002209', '2002209', '4002209'].map((matricula, indice) => ({
      titulo: `Vínculo SIAPE ${indice + 1}`,
      tipo: 'servidor',
      campos: [{
        campo: 'matriculaSiape',
        rotulo: 'Matrícula SIAPE',
        recebido_siape: matricula,
        registrado_petrvs: matricula,
        status: 'confirmado'
      }]
    })),
    ...overrides,
  };
}

describe('RelatorioCargaIndividualSiapeComponent - issue 2209', () => {
  let component: RelatorioCargaIndividualSiapeComponent;
  let dao: jasmine.SpyObj<RelatorioCargaIndividualSiapeDaoService>;
  let dialog: jasmine.SpyObj<DialogService>;
  let auth: { hasPermissionTo: jasmine.Spy; usuarioConfig: Record<string, unknown> };
  let back: jasmine.Spy;
  let metadata: Record<string, unknown> | undefined;

  beforeEach(() => {
    dao = jasmine.createSpyObj<RelatorioCargaIndividualSiapeDaoService>('RelatorioCargaIndividualSiapeDaoService', [
      'obterPorId', 'listarRecentes'
    ]);
    dao.listarRecentes.and.resolveTo([]);
    dialog = jasmine.createSpyObj<DialogService>('DialogService', [
      'closeSppinerOverlay', 'showSppinerOverlay', 'alert'
    ]);
    dialog.alert.and.resolveTo();
    auth = { hasPermissionTo: jasmine.createSpy('hasPermissionTo').and.returnValue(true), usuarioConfig: {} };
    back = jasmine.createSpy('back');
    metadata = undefined;
    const sanitizer = jasmine.createSpyObj<DomSanitizer>('DomSanitizer', ['bypassSecurityTrustHtml']);
    sanitizer.bypassSecurityTrustHtml.and.callFake(value => value as any);
    const route = {
      snapshot: {
        paramMap: convertToParamMap({}), queryParams: {}, url: [], data: {}
      }
    };
    const go = {
      decodeParam: (value: unknown) => value,
      getMetadata: () => metadata,
      setDefaultBackRoute: jasmine.createSpy('setDefaultBackRoute'),
      back
    };
    const globals = { sanitizer };
    const util = {
      getDateTimeFormatted: (value: Date) => value.toISOString()
    };
    const registry = new Map<unknown, unknown>([
      [LookupService, {}], [Router, { url: '/' }], [ActivatedRoute, route],
      [FormBuilder, new FormBuilder()], [FormHelperService, {}], [GlobalsService, globals],
      [ChangeDetectorRef, jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges', 'markForCheck'])],
      [DialogService, dialog], [UtilService, util], [NavigateService, go], [LexicalService, {}],
      [AuthService, auth], [EntityService, {}], [RelatorioCargaIndividualSiapeDaoService, dao],
    ]);
    const injector = { get: <T>(token: unknown): T => registry.get(token) as T } as Injector;

    component = new RelatorioCargaIndividualSiapeComponent(injector);
  });

  it('busca por metadata e renderiza as tres matriculas do relatorio', async () => {
    metadata = { relatorioId: 'relatorio-2209' };
    dao.obterPorId.and.resolveTo(relatorio2209());

    await component.ngOnInit();

    expect(dao.obterPorId).toHaveBeenCalledWith('relatorio-2209');
    expect(component.relatorio?.secoes.length).toBe(3);
    const html = component.conteudoHtml as unknown as string;
    expect(html).toContain('1002209');
    expect(html).toContain('2002209');
    expect(html).toContain('4002209');
    expect(html).toContain('Atencao');
  });

  it('lista recentes usando tipo e CPF como filtros', async () => {
    dao.listarRecentes.and.resolveTo([relatorio2209()]);
    component.filtro.setValue({ id: '', tipo: 'servidor', chave: ' 52998224725 ' });

    await component.listarRecentes();

    expect(dao.listarRecentes).toHaveBeenCalledWith('servidor', '52998224725');
    expect(component.recentes.length).toBe(1);
    expect(component.conteudoHtml as unknown as string).toContain('relatorio-2209');
  });

  it('exibe relatorio de erro sem secoes sem quebrar a pagina', async () => {
    component.filtro.controls.id.setValue('relatorio-erro');
    dao.obterPorId.and.resolveTo(relatorio2209({
      id: 'relatorio-erro',
      status: 'erro',
      entrada_valida: false,
      secoes: [],
      mensagem_usuario: 'Processamento não concluído.'
    }));

    await component.buscarPorId();

    const html = component.conteudoHtml as unknown as string;
    expect(component.exibindoDetalhe).toBeTrue();
    expect(html).toContain('Nao concluido');
    expect(html).toContain('Nenhuma secao disponivel neste relatorio.');
  });

  it('bloqueia a pagina sem a capacidade do relatorio', async () => {
    auth.hasPermissionTo.and.returnValue(false);

    await component.ngOnInit();

    expect(dialog.alert).toHaveBeenCalledWith(
      'Acesso restrito',
      'Você não tem permissão para acessar este relatório.'
    );
    expect(back).toHaveBeenCalled();
    expect(dao.listarRecentes).not.toHaveBeenCalled();
    expect(dao.obterPorId).not.toHaveBeenCalled();
  });

  it('escapa HTML recebido do backend antes de montar o innerHTML', async () => {
    component.filtro.controls.id.setValue('relatorio-xss');
    dao.obterPorId.and.resolveTo(relatorio2209({
      id: 'relatorio-xss',
      mensagem_usuario: '<img src=x onerror=alert(1)>',
      orientacoes: ['<script>alert(1)</script>'],
    }));

    await component.buscarPorId();

    const html = component.conteudoHtml as unknown as string;
    expect(html).not.toContain('<script>');
    expect(html).not.toContain('<img src=x');
    expect(html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
    expect(html).toContain('&lt;img src=x onerror=alert(1)&gt;');
  });

  it('ignora resposta antiga quando uma busca mais nova termina primeiro', async () => {
    let resolverAntigo!: (value: RelatorioCargaIndividualSiape | null) => void;
    const antigo = new Promise<RelatorioCargaIndividualSiape | null>(resolve => resolverAntigo = resolve);
    dao.obterPorId.and.callFake(id => id === 'antigo'
      ? antigo
      : Promise.resolve(relatorio2209({ id: 'novo' }))
    );

    component.filtro.controls.id.setValue('antigo');
    const buscaAntiga = component.buscarPorId();
    component.filtro.controls.id.setValue('novo');
    await component.buscarPorId();
    resolverAntigo(relatorio2209({ id: 'antigo' }));
    await buscaAntiga;

    expect(component.relatorio?.id).toBe('novo');
  });
});
