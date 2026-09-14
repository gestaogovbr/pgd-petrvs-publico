import {
    formatJobScheduleDescription,
    JobScheduleDescriptionLookup
} from './job-schedule-description';

type ScheduleData = Parameters<typeof formatJobScheduleDescription>[0];

describe('formatJobScheduleDescription', () => {
    const lookup: JobScheduleDescriptionLookup = {
        AGENDAMENTO_INTERVALO_TIPOS: [
            { key: 'minuto', value: 'minuto(s)' },
            { key: 'hora', value: 'hora(s)' }
        ],
        AGENDAMENTO_PERIODICIDADES: [
            { key: 'segunda', value: 'Toda segunda' }
        ],
        getValue: (items, key) => items.find(item => item.key === key)?.value ?? ''
    };

    const createSchedule = (changes: Partial<ScheduleData> = {}): ScheduleData => ({
        periodicidade: 'custom',
        expressao_cron: '* * * * *',
        intervalo_qtde: null,
        intervalo_tipo: null,
        dia: null,
        horario: null,
        ...changes
    });

    it('issue 2472 - deve descrever o agendamento no dia do mês sem indicar execução diária', () => {
        const schedule = createSchedule({
            periodicidade: 'dia',
            dia: 5,
            horario: '15:00'
        });

        expect(formatJobScheduleDescription(schedule, lookup)).toBe('No dia 5 de cada mês, às 15:00h');
    });

    it('deve preservar as descrições das demais periodicidades', () => {
        expect(formatJobScheduleDescription(createSchedule(), lookup)).toBe('* * * * *');
        expect(formatJobScheduleDescription(createSchedule({
            periodicidade: 'cada',
            intervalo_qtde: 2,
            intervalo_tipo: 'hora'
        }), lookup)).toBe('A cada 2 hora(s)');
        expect(formatJobScheduleDescription(createSchedule({
            periodicidade: 'todos',
            horario: '08:30'
        }), lookup)).toBe('Todos os dias às 08:30h');
        expect(formatJobScheduleDescription(createSchedule({
            periodicidade: 'segunda',
            horario: '09:00'
        }), lookup)).toBe('Toda segunda às 09:00h');
    });

    it('deve apresentar descrição segura quando os dados obrigatórios estiverem incompletos', () => {
        expect(formatJobScheduleDescription(createSchedule({
            periodicidade: 'dia',
            dia: null,
            horario: '15:00'
        }), lookup)).toBe('Agendamento incompleto');
        expect(formatJobScheduleDescription(createSchedule({
            periodicidade: 'dia',
            dia: 5,
            horario: null
        }), lookup)).toBe('Agendamento incompleto');
        expect(formatJobScheduleDescription(createSchedule({
            periodicidade: 'cada',
            intervalo_qtde: null,
            intervalo_tipo: 'hora'
        }), lookup)).toBe('Agendamento incompleto');
    });
});
