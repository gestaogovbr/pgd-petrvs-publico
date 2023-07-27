import { Base } from './base.model';

export class TipoModalidade extends Base {
    public nome: string = ""; /* Nome da modalidade */
    public plano_trabalho_assinatura_participante: number = 1; /* Exigir assinatura do usuário no plano de trabalho */
    public plano_trabalho_assinatura_gestor_unidade: number = 0; /* Exigir assinatura do gestor da unidade */
    public plano_trabalho_assinatura_gestor_entidade: number = 0; /* Exigir assinatura do gestor da entidade */
    public plano_trabalho_calcula_horas: number = 0; /* Se o plano de trabalho calcula horas (considerando a carga horaria e os dias) */
    public atividade_tempo_despendido: number = 0; /* Se calcula tempo despendido na atividade */
    public atividade_esforco: number = 0; /* Se utiliza esforço (tempo para execução) na atividade */

    public constructor(data?: any) { super(); this.initialization(data); }
}
