import { CommonModule } from '@angular/common';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
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

@Component({
  selector: 'section',
  template: '<span data-testid="section-selector-collision">Conteúdo substituído pelo seletor section</span>',
  standalone: false,
})
class SectionSelectorCollisionStubComponent {}

function relatorioIssue2326(overrides: Partial<RelatorioCargaIndividualSiape> = {}): RelatorioCargaIndividualSiape {
  return {
    id: 'relatorio-issue-2326',
    processamento_id: 'processamento-issue-2326',
    tipo: 'servidor',
    chave: '11122233344',
    status: 'parcial',
    entrada_valida: true,
    mensagem_usuario: 'Carga individual concluida. Confira os dados recebidos do SIAPE e registrados no Petrvs.',
    orientacoes: [
      'Se o valor recebido do SIAPE estiver incorreto, procure o RH do seu orgao.',
      'Persistindo divergencia, abra chamado no portal de atendimento.'
    ],
    secoes: [{
      tipo: 'servidor',
      indice: 1,
      titulo: 'Matricula 8482326',
      matricula: '8482326',
      status_vinculo: 'ativo',
      data_ocorrencia_exclusao: null,
      campos: [{
        campo: 'nome',
        rotulo: 'Nome',
        status: 'nao_encontrado',
        recebido_siape: 'SERVIDOR TESTE ÇÃO',
        registrado_petrvs: null
      }, {
        campo: 'emailInstitucional',
        rotulo: 'E-mail institucional',
        status: 'nao_encontrado',
        recebido_siape: 'SERVIDOR.TESTE@EXEMPLO.GOV.BR',
        registrado_petrvs: null
      }, {
        campo: 'matriculaSiape',
        rotulo: 'Matricula SIAPE',
        status: 'nao_encontrado',
        recebido_siape: '8482326',
        registrado_petrvs: null
      }, {
        campo: 'modalidadePGD',
        rotulo: 'Modalidade PGD',
        status: 'nao_encontrado',
        recebido_siape: 'parcial',
        registrado_petrvs: null
      }, {
        campo: 'participaPGD',
        rotulo: 'Participa do PGD',
        status: 'nao_encontrado',
        recebido_siape: 'sim',
        registrado_petrvs: null
      }]
    }],
    processado_em: '2026-07-20T09:46:39-03:00',
    ...overrides,
  };
}

describe('RelatorioCargaIndividualSiapeComponent - issue 2326', () => {
  let fixture: ComponentFixture<RelatorioCargaIndividualSiapeComponent>;
  let dao: jasmine.SpyObj<RelatorioCargaIndividualSiapeDaoService>;
  let dialog: jasmine.SpyObj<DialogService> & { sppinerShowing: boolean };

  beforeEach(async () => {
    dao = jasmine.createSpyObj<RelatorioCargaIndividualSiapeDaoService>('RelatorioCargaIndividualSiapeDaoService', [
      'obterPorId',
      'listarRecentes'
    ]);
    dao.listarRecentes.and.resolveTo([relatorioIssue2326()]);
    dao.obterPorId.and.resolveTo(relatorioIssue2326());

    dialog = jasmine.createSpyObj<DialogService>('DialogService', [
      'closeSppinerOverlay',
      'showSppinerOverlay',
      'alert',
      'topAlert'
    ]) as jasmine.SpyObj<DialogService> & { sppinerShowing: boolean };
    dialog.sppinerShowing = false;
    dialog.alert.and.resolveTo();

    await TestBed.configureTestingModule({
      declarations: [RelatorioCargaIndividualSiapeComponent, SectionSelectorCollisionStubComponent],
      imports: [CommonModule, ReactiveFormsModule],
      providers: [
        { provide: LookupService, useValue: {} },
        { provide: Router, useValue: { url: '/' } },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
              queryParams: {},
              url: [],
              data: {}
            }
          }
        },
        FormBuilder,
        { provide: FormHelperService, useValue: {} },
        { provide: GlobalsService, useValue: {} },
        { provide: DialogService, useValue: dialog },
        {
          provide: UtilService,
          useValue: {
            getDateTimeFormatted: (value: Date) => value.toISOString()
          }
        },
        {
          provide: NavigateService,
          useValue: {
            decodeParam: (value: unknown) => value,
            getMetadata: () => undefined,
            setDefaultBackRoute: jasmine.createSpy('setDefaultBackRoute'),
            back: jasmine.createSpy('back')
          }
        },
        { provide: LexicalService, useValue: {} },
        {
          provide: AuthService,
          useValue: {
            hasPermissionTo: jasmine.createSpy('hasPermissionTo').and.returnValue(true),
            usuarioConfig: {}
          }
        },
        { provide: EntityService, useValue: {} },
        { provide: RelatorioCargaIndividualSiapeDaoService, useValue: dao },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(RelatorioCargaIndividualSiapeComponent);
  });

  it('exibe lista e detalhe com response de relatorios recentes no formato do endpoint', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(dao.listarRecentes).toHaveBeenCalledWith('', '');

    const textoLista = fixture.nativeElement.textContent as string;
    expect(textoLista).toContain('Relatórios recentes');
    expect(textoLista).toContain('11122233344');
    expect(textoLista).toContain('Atencao');
    expect(textoLista).toContain('Carga individual concluida');

    const abrirDetalhe = fixture.nativeElement.querySelector('.relatorio-carga-siape-card__acoes button') as HTMLButtonElement | null;
    expect(abrirDetalhe).not.toBeNull();

    abrirDetalhe?.click();
    fixture.detectChanges();

    const textoDetalhe = fixture.nativeElement.textContent as string;
    expect(textoDetalhe).toContain('Matricula 8482326');
    expect(textoDetalhe).toContain('SERVIDOR TESTE ÇÃO');
    expect(textoDetalhe).toContain('Modalidade PGD');
    expect(textoDetalhe).toContain('Nao encontrado');
    expect(textoDetalhe).toContain('Nao informado');
  });
  
  it('não substitui os blocos do relatório pelo componente global com seletor section (issue 2470)', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const elementoColidido = fixture.nativeElement.querySelector('[data-testid="section-selector-collision"]');
    const cardRelatorio = fixture.nativeElement.querySelector('.relatorio-carga-siape-card');

    expect(elementoColidido).toBeNull();
    expect(cardRelatorio).not.toBeNull();
    expect(cardRelatorio.textContent).toContain('relatorio-issue-2326');
  });
});
