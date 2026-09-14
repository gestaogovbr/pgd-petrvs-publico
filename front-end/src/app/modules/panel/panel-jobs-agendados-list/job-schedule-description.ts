import type { JobAgendado } from 'src/app/models/job-agendado.model';

type JobScheduleDescriptionData = Pick<
    JobAgendado,
    'periodicidade' | 'expressao_cron' | 'intervalo_qtde' | 'intervalo_tipo' | 'dia' | 'horario'
>;

type JobScheduleLookupItem = {
    key: unknown;
    value: string;
};

export type JobScheduleDescriptionLookup = {
    AGENDAMENTO_INTERVALO_TIPOS: JobScheduleLookupItem[];
    AGENDAMENTO_PERIODICIDADES: JobScheduleLookupItem[];
    getValue(items: JobScheduleLookupItem[], key: unknown): string;
};

const JOB_SCHEDULE_PERIODICITY = {
    CUSTOM: 'custom',
    INTERVAL: 'cada',
    DAILY: 'todos',
    MONTHLY: 'dia'
} as const;

const INCOMPLETE_SCHEDULE_DESCRIPTION = 'Agendamento incompleto';

export function formatJobScheduleDescription(
    schedule: JobScheduleDescriptionData,
    lookup: JobScheduleDescriptionLookup
): string {
    if (schedule.periodicidade === JOB_SCHEDULE_PERIODICITY.CUSTOM) {
        return schedule.expressao_cron || INCOMPLETE_SCHEDULE_DESCRIPTION;
    }

    if (schedule.periodicidade === JOB_SCHEDULE_PERIODICITY.INTERVAL) {
        if (schedule.intervalo_qtde == null || schedule.intervalo_tipo == null) {
            return INCOMPLETE_SCHEDULE_DESCRIPTION;
        }

        const intervalType = lookup.getValue(lookup.AGENDAMENTO_INTERVALO_TIPOS, schedule.intervalo_tipo);
        return intervalType
            ? `A cada ${schedule.intervalo_qtde} ${intervalType}`
            : INCOMPLETE_SCHEDULE_DESCRIPTION;
    }

    if (schedule.horario == null || schedule.horario === '') {
        return INCOMPLETE_SCHEDULE_DESCRIPTION;
    }

    if (schedule.periodicidade === JOB_SCHEDULE_PERIODICITY.DAILY) {
        return `Todos os dias às ${schedule.horario}h`;
    }

    if (schedule.periodicidade === JOB_SCHEDULE_PERIODICITY.MONTHLY) {
        return schedule.dia == null
            ? INCOMPLETE_SCHEDULE_DESCRIPTION
            : `No dia ${schedule.dia} de cada mês, às ${schedule.horario}h`;
    }

    const periodicity = lookup.getValue(lookup.AGENDAMENTO_PERIODICIDADES, schedule.periodicidade);
    return periodicity
        ? `${periodicity} às ${schedule.horario}h`
        : INCOMPLETE_SCHEDULE_DESCRIPTION;
}
