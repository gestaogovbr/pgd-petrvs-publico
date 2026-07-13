import { RelatorioCargaIndividualSiape } from 'src/app/models/relatorio-carga-individual-siape.model';
import { RelatorioCargaIndividualSiapeComponent } from './relatorio-carga-individual-siape.component';

describe('RelatorioCargaIndividualSiapeComponent', () => {
  function createComponent(relatorio: RelatorioCargaIndividualSiape): RelatorioCargaIndividualSiapeComponent {
    const component = Object.create(RelatorioCargaIndividualSiapeComponent.prototype) as RelatorioCargaIndividualSiapeComponent;
    component.relatorio = relatorio;
    component.secaoAtivaIndex = 0;
    return component;
  }

  it('exibe abas para relatorio de servidor com multiplas matriculas', () => {
    const component = createComponent({
      id: 'relatorio-1',
      processamento_id: 'processamento-1',
      tipo: 'servidor',
      chave: '11122233344',
      status: 'sucesso',
      entrada_valida: true,
      mensagem_usuario: 'Carga individual concluida.',
      orientacoes: [],
      processado_em: null,
      secoes: [
        {
          titulo: 'Matricula 111111',
          tipo: 'servidor',
          matricula: '111111',
          status_vinculo: 'ativo',
          campos: [],
        },
        {
          titulo: 'Matricula 222222',
          tipo: 'servidor',
          matricula: '222222',
          status_vinculo: 'excluido',
          campos: [],
        },
      ],
    });

    expect(component.deveExibirAbas()).toBeTrue();
    expect(component.labelAba(component.relatorio!.secoes[0], 0)).toBe('Matricula 111111');
    expect(component.labelAba(component.relatorio!.secoes[1], 1)).toBe('Matricula 222222 (excluido)');

    component.selecionarSecao(1);

    expect(component.secaoAtiva()?.matricula).toBe('222222');
  });

  it('deriva rotulo da aba pelo campo matriculaSiape quando metadado nao existe', () => {
    const component = createComponent({
      id: 'relatorio-1',
      processamento_id: 'processamento-1',
      tipo: 'servidor',
      chave: '11122233344',
      status: 'sucesso',
      entrada_valida: true,
      mensagem_usuario: 'Carga individual concluida.',
      orientacoes: [],
      processado_em: null,
      secoes: [
        {
          titulo: 'Vinculo SIAPE 1',
          tipo: 'servidor',
          campos: [
            {
              campo: 'matriculaSiape',
              rotulo: 'Matricula SIAPE',
              recebido_siape: '333333',
              registrado_petrvs: '333333',
              status: 'confirmado',
            },
          ],
        },
        {
          titulo: 'Vinculo SIAPE 2',
          tipo: 'servidor',
          campos: [
            {
              campo: 'matriculaSiape',
              rotulo: 'Matricula SIAPE',
              recebido_siape: '444444',
              registrado_petrvs: '444444',
              status: 'confirmado',
            },
          ],
        },
      ],
    });

    expect(component.labelAba(component.relatorio!.secoes[0], 0)).toBe('Matricula 333333');
    expect(component.labelAba(component.relatorio!.secoes[1], 1)).toBe('Matricula 444444');
  });
});
