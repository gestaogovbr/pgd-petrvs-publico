import { Base } from './base.model';
import { TipoAvaliacaoJustificativa } from './tipo-avaliacao-justificativas.model';

export class TipoAvaliacao extends Base {
    public nota_atribuida: number = 0; /* Nota atribuida de 0 a 10 */
    public nome: string = ""; /* Descrição da nota atribuida */
    public aceita_entrega: number = 1; /* Se a entrega vai ser aceita e as horas pactuadas serão homologadas */
    public pergunta: string = ""; /* Pergunta motivacional, o porque você selecionou essa nota */
    public icone: string = ""; /* Classe do icone relacionado a avaliação */
    public cor: string = ""; /* Código da cor em hex */
    public tipos_avaliacoes_justificativas: TipoAvaliacaoJustificativa[] = [];
    public data_inicio: Date = new Date(); /* Data de início */
    public data_fim: Date | null = null; /* Data do fim */

    public constructor(data?: any) { super(); this.initialization(data); }
}


 