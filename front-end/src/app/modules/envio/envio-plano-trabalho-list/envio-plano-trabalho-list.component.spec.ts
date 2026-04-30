import { FormGroup } from '@angular/forms';
import { EnvioPlanoTrabalhoListComponent } from './envio-plano-trabalho-list.component';

describe('EnvioPlanoTrabalhoListComponent', () => {
  let component: EnvioPlanoTrabalhoListComponent;

  beforeEach(() => {
    component = Object.create(EnvioPlanoTrabalhoListComponent.prototype);
  });

  it('mapeia status com falha para filtro isFalha', () => {
    const where = component.filterWhere({
      value: {
        numero: '',
        unidade_id: null,
        status: 'Com falha',
      },
    } as FormGroup);

    expect(where).toContain(['isFalha', true]);
  });

  it('mapeia filtro de unidade e numero', () => {
    const where = component.filterWhere({
      value: {
        numero: '123',
        unidade_id: 'unidade-1',
        status: null,
      },
    } as FormGroup);

    expect(where).toContain(['numero', '123']);
    expect(where).toContain(['unidade_id', 'unidade-1']);
  });

  it('indica tentativa antes do agendamento', () => {
    const row: any = {
      data_agendamento_envio: new Date('2026-04-25T10:00:00Z'),
      data_tentativa_envio: new Date('2026-04-25T09:00:00Z'),
    };

    expect(component.hasTentativaBeforeAgendamento(row)).toBeTrue();
  });

  it('indica envio bem sucedido antes do agendamento', () => {
    const row: any = {
      data_agendamento_envio: new Date('2026-04-25T10:00:00Z'),
      data_envio_api_pgd: new Date('2026-04-25T09:30:00Z'),
    };

    expect(component.hasEnvioBeforeAgendamento(row)).toBeTrue();
  });

  it('indica conclusao antes do agendamento', () => {
    const row: any = {
      data_agendamento_envio: new Date('2026-04-25T10:00:00Z'),
      data_conclusao_envio: new Date('2026-04-25T09:30:00Z'),
    };

    expect(component.hasConclusaoBeforeAgendamento(row)).toBeTrue();
  });
});
