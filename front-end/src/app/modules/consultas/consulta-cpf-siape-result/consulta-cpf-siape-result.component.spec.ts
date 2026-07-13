import { ChangeDetectorRef, Injector } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of, throwError } from 'rxjs';
import { UnidadeIntegranteDaoService } from 'src/app/dao/unidade-integrante-dao.service';
import { UsuarioDaoService } from 'src/app/dao/usuario-dao.service';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';
import { EntityService } from 'src/app/services/entity.service';
import { FormHelperService } from 'src/app/services/form-helper.service';
import { GlobalsService } from 'src/app/services/globals.service';
import { LexicalService } from 'src/app/services/lexical.service';
import { LookupService } from 'src/app/services/lookup.service';
import { NavigateService } from 'src/app/services/navigate.service';
import { UtilService } from 'src/app/services/util.service';
import { ConsultaCpfSiapeResultComponent } from './consulta-cpf-siape-result.component';

describe('ConsultaCpfSiapeResultComponent - issue 2209', () => {
  let component: ConsultaCpfSiapeResultComponent;
  let usuarioDao: jasmine.SpyObj<UsuarioDaoService>;
  let integranteDao: jasmine.SpyObj<UnidadeIntegranteDaoService>;
  let dialog: jasmine.SpyObj<DialogService>;
  let navigate: jasmine.Spy;

  beforeEach(() => {
    usuarioDao = jasmine.createSpyObj<UsuarioDaoService>('UsuarioDaoService', [
      'query', 'sincronizarSIAPE', 'exportarCPFSIAPE', 'baixaLogSiape'
    ]);
    integranteDao = jasmine.createSpyObj<UnidadeIntegranteDaoService>('UnidadeIntegranteDaoService', ['carregarIntegrantes']);
    dialog = jasmine.createSpyObj<DialogService>('DialogService', [
      'closeSppinerOverlay', 'showSppinerOverlay', 'confirm', 'alert', 'template'
    ]);
    dialog.confirm.and.resolveTo(true);
    dialog.alert.and.resolveTo();
    navigate = jasmine.createSpy('navigate');
    const route = {
      snapshot: {
        paramMap: convertToParamMap({}), queryParams: {}, url: [], data: {}
      }
    };
    const go = {
      decodeParam: (value: unknown) => value,
      getMetadata: () => undefined,
      setDefaultBackRoute: jasmine.createSpy('setDefaultBackRoute'),
      navigate
    };
    const registry = new Map<unknown, unknown>([
      [LookupService, {}], [Router, { url: '/' }], [ActivatedRoute, route],
      [FormBuilder, new FormBuilder()], [FormHelperService, {}], [GlobalsService, {}],
      [ChangeDetectorRef, jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges', 'markForCheck'])],
      [DialogService, dialog], [UtilService, {}], [NavigateService, go], [LexicalService, {}],
      [AuthService, { usuarioConfig: {} }], [EntityService, {}],
      [UsuarioDaoService, usuarioDao], [UnidadeIntegranteDaoService, integranteDao],
    ]);
    const injector = { get: <T>(token: unknown): T => registry.get(token) as T } as Injector;

    component = new ConsultaCpfSiapeResultComponent(injector);
    component.cpf = '529.982.247-25';
  });

  it('carrega independentemente as tres matriculas e seus vinculos ativos', async () => {
    const usuarios = [
      new Usuario({ id: 'usuario-1', matricula: '1002209' }),
      new Usuario({ id: 'usuario-2', matricula: '2002209' }),
      new Usuario({ id: 'usuario-3', matricula: '4002209' }),
    ];
    usuarioDao.query.and.returnValue({ getAll: () => Promise.resolve(usuarios) } as any);
    integranteDao.carregarIntegrantes.and.callFake((_unidadeId, usuarioId) => Promise.resolve({
      integrantes: [
        { usuario_id: usuarioId, atribuicoes: ['LOTADO'] },
        { usuario_id: usuarioId, atribuicoes: [] },
      ] as any
    }));

    await component.loadUsuario();

    expect(usuarioDao.query).toHaveBeenCalledWith({ where: [['cpf', '==', '52998224725']] });
    expect(component.usuarios.map(usuario => usuario.matricula)).toEqual(['1002209', '2002209', '4002209']);
    expect(component.integrantes.length).toBe(3);
  });

  it('processa o CPF, atualiza usuarios e guarda o identificador do relatorio', async () => {
    const resumo = [
      { status: 'sucesso', mensagem: 'OK', matricula: '1002209' },
      { status: 'sucesso', mensagem: 'OK', matricula: '2002209' },
      { status: 'sucesso', mensagem: 'OK', matricula: '4002209' },
    ];
    usuarioDao.sincronizarSIAPE.and.returnValue(of({
      success: true,
      message: 'Processamento concluído',
      resumo,
      log: 'log sintético',
      relatorio_carga_id: 'relatorio-2209'
    }) as any);
    const loadUsuario = spyOn(component, 'loadUsuario').and.resolveTo();
    const mostrarResumo = spyOn<any>(component, 'mostrarResumo').and.resolveTo();

    await component.toolbarButtons.find(button => button.label === 'Processar')!.onClick!();
    await Promise.resolve();

    expect(usuarioDao.sincronizarSIAPE).toHaveBeenCalledWith('529.982.247-25');
    expect(loadUsuario).toHaveBeenCalled();
    expect(component.ultimoRelatorioCargaId).toBe('relatorio-2209');
    expect(mostrarResumo).toHaveBeenCalledWith(resumo, 'Processamento concluído', 'relatorio-2209');
    expect(component.log).toBe('log sintético');
  });

  it('preserva o relatorio e o resumo devolvidos em erro HTTP', async () => {
    const resumo = [{ status: 'erro', mensagem: 'Unidade 22103 não processada' }];
    usuarioDao.sincronizarSIAPE.and.returnValue(throwError(() => ({
      message: 'Bad Request',
      error: {
        message: 'Unidade 22103 não processada',
        resumo,
        log: 'log de erro',
        relatorio_carga_id: 'relatorio-erro-2209'
      }
    })) as any);
    const mostrarResumo = spyOn<any>(component, 'mostrarResumo').and.resolveTo();

    await component.toolbarButtons.find(button => button.label === 'Processar')!.onClick!();
    await Promise.resolve();

    expect(component.ultimoRelatorioCargaId).toBe('relatorio-erro-2209');
    expect(mostrarResumo).toHaveBeenCalledWith(
      resumo,
      'Erro ao processar CPF: Unidade 22103 não processada',
      'relatorio-erro-2209'
    );
    expect(component.log).toBe('log de erro');
  });

  it('não processa quando o usuario cancela a confirmação', async () => {
    dialog.confirm.and.resolveTo(false);

    await component.toolbarButtons.find(button => button.label === 'Processar')!.onClick!();

    expect(usuarioDao.sincronizarSIAPE).not.toHaveBeenCalled();
  });

  it('abre o relatorio da carga usando rota e metadata equivalentes', () => {
    component.abrirRelatorioCarga('relatorio-2209');

    expect(navigate).toHaveBeenCalledWith(
      { route: ['relatorios', 'carga-individual-siape'], params: { id: 'relatorio-2209' } },
      { metadata: { relatorioId: 'relatorio-2209' } }
    );
  });
});
