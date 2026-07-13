import { ChangeDetectorRef, Injector } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
import { ConsultaCpfSiapeFormComponent } from './consulta-cpf-siape-form.component';

describe('ConsultaCpfSiapeFormComponent - issue 2209', () => {
  let component: ConsultaCpfSiapeFormComponent;
  let usuarioDao: jasmine.SpyObj<UsuarioDaoService>;
  let integranteDao: jasmine.SpyObj<UnidadeIntegranteDaoService>;
  let navigate: jasmine.Spy;

  beforeEach(() => {
    usuarioDao = jasmine.createSpyObj<UsuarioDaoService>('UsuarioDaoService', ['query', 'consultarSIAPE']);
    integranteDao = jasmine.createSpyObj<UnidadeIntegranteDaoService>('UnidadeIntegranteDaoService', ['carregarIntegrantes']);
    navigate = jasmine.createSpy('navigate');

    const dialog = jasmine.createSpyObj<DialogService>('DialogService', [
      'closeSppinerOverlay', 'showSppinerOverlay', 'topAlert'
    ]);
    const cdRef = jasmine.createSpyObj<ChangeDetectorRef>('ChangeDetectorRef', ['detectChanges', 'markForCheck']);
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
    const fh = {
      FormBuilder: () => new FormGroup({
        cpf: new FormControl('', { nonNullable: true, validators: [Validators.required] })
      })
    };
    const registry = new Map<unknown, unknown>([
      [LookupService, {}],
      [Router, { url: '/' }],
      [ActivatedRoute, route],
      [FormBuilder, new FormBuilder()],
      [FormHelperService, fh],
      [GlobalsService, {}],
      [ChangeDetectorRef, cdRef],
      [DialogService, dialog],
      [UtilService, {}],
      [NavigateService, go],
      [LexicalService, {}],
      [AuthService, { usuarioConfig: {} }],
      [EntityService, {}],
      [UsuarioDaoService, usuarioDao],
      [UnidadeIntegranteDaoService, integranteDao],
    ]);
    const injector = {
      get: <T>(token: unknown): T => registry.get(token) as T
    } as Injector;

    component = new ConsultaCpfSiapeFormComponent(injector);
    component.editableForm = { error: '' } as any;
  });

  it('exige CPF antes da consulta', () => {
    component.form.controls['cpf'].setValue('');

    expect(component.form.valid).toBeFalse();
    expect(component.validate(component.form.controls['cpf'], 'cpf')).toBe('Obrigatório');
  });

  it('normaliza CPF e navega com os dados retornados pelo SIAPE', async () => {
    const usuario = new Usuario({ id: 'usuario-1', cpf: '52998224725', matricula: '1002209' });
    const query = { asPromise: jasmine.createSpy('asPromise').and.resolveTo([usuario]) };
    usuarioDao.query.and.returnValue(query as any);
    integranteDao.carregarIntegrantes.and.resolveTo({
      integrantes: [
        { usuario_id: usuario.id, atribuicoes: ['LOTADO'] },
        { usuario_id: usuario.id, atribuicoes: [] },
      ] as any
    });
    usuarioDao.consultarSIAPE.and.returnValue(of({
      success: true,
      pessoais: { nome: 'Servidor Sintético' },
      funcionais: [{ matriculaSiape: '1002209' }]
    }) as any);
    component.form.controls['cpf'].setValue('529.982.247-25');

    await component.onClickCPF();

    expect(usuarioDao.query).toHaveBeenCalledWith({ where: [['cpf', '==', '52998224725']] });
    expect(usuarioDao.consultarSIAPE).toHaveBeenCalledWith('52998224725');
    expect(component.integrantes.length).toBe(1);
    expect(navigate).toHaveBeenCalledWith(
      { route: ['consultas', 'cpf-siape-result'] },
      jasmine.objectContaining({
        metadata: jasmine.objectContaining({ cpf: '529.982.247-25', usuario: [usuario] })
      })
    );
  });

  it('encaminha todas as matriculas locais para a tela de resultado', async () => {
    const usuarios = [
      new Usuario({ id: 'usuario-1', cpf: '52998224725', matricula: '1002209' }),
      new Usuario({ id: 'usuario-2', cpf: '52998224725', matricula: '2002209' }),
      new Usuario({ id: 'usuario-3', cpf: '52998224725', matricula: '4002209' }),
    ];
    usuarioDao.query.and.returnValue({ asPromise: () => Promise.resolve(usuarios) } as any);
    integranteDao.carregarIntegrantes.and.resolveTo({ integrantes: [] });
    usuarioDao.consultarSIAPE.and.returnValue(of({
      success: true,
      pessoais: {},
      funcionais: usuarios.map(usuario => ({ matriculaSiape: usuario.matricula }))
    }) as any);
    component.form.controls['cpf'].setValue('52998224725');

    await component.onClickCPF();

    const metadata = navigate.calls.mostRecent().args[1].metadata;
    expect(metadata.usuario.map((usuario: Usuario) => usuario.id)).toEqual([
      'usuario-1', 'usuario-2', 'usuario-3'
    ]);
    expect(integranteDao.carregarIntegrantes).toHaveBeenCalledTimes(3);
  });

  it('exibe a mensagem devolvida quando a consulta SIAPE falha', async () => {
    usuarioDao.query.and.returnValue({ asPromise: () => Promise.resolve([]) } as any);
    usuarioDao.consultarSIAPE.and.returnValue(throwError(() => ({
      status: 400,
      error: { message: 'CPF não localizado no SIAPE' }
    })) as any);
    component.form.controls['cpf'].setValue('52998224725');
    const error = spyOn(component, 'error');

    await component.onClickCPF();

    expect(error).toHaveBeenCalledWith('Erro ao consultar CPF no SIAPE: CPF não localizado no SIAPE');
  });
});
