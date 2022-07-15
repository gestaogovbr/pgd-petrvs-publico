import { Base } from './base.model';

export class TipoModalidade extends Base {
    public nome: string = ""; /* Nome da modalidade */
    public atividades_homologadas: number = 1; /* Permitir apenas atividades homologadas */
    public dispensa_avaliacao: number = 0; /* Dispensa a avaliação */
    public exige_assinatura: number = 1; /* Exigir assinatura */
    public calcula_tempo_despendido: number = 1; /* Calcula tempo despendido */
    public exige_assinatura_gestor_unidade: number = 0; /* Exigir assinatura do gestor da unidade */
    public exige_assinatura_gestor_entidade: number = 0; /* Exigir assinatura do gestor da entidade */
    public ganho_produtividade: number = 0; /* Ganho de produtividade */
    public data_inicio: Date = new Date(); /* Data de início */
    public data_fim: Date | null = null; /* Data do fim */
        
    constructor(){
        super();
    }
}