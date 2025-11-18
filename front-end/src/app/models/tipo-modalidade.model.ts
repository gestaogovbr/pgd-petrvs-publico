import { Base } from './base.model';
import { TipoModalidadeSiape } from './tipo-modalidade-siape.model';

export class TipoModalidade extends Base {
    public nome: string = ""; /* Nome da modalidade */
    public plano_trabalho_calcula_horas: boolean = false; /* Se o plano de trabalho calcula horas (considerando a carga horaria e os dias) */
    public atividade_tempo_despendido: boolean = false; /* Se calcula tempo despendido na atividade */
    public atividade_esforco: boolean = false; /* Se utiliza esforço (tempo para execução) na atividade */
    public modalidade_siape: TipoModalidadeSiape = new TipoModalidadeSiape();

    public constructor(data?: any) { super(); this.initialization(data); }
}
