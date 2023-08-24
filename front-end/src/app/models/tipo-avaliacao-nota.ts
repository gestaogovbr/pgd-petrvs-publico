import { Base } from './base.model';
import { TipoAvaliacaoJustificativa } from './tipo-avaliacao-justificativas.model';
import { TipoAvaliacao } from './tipo-avaliacao.model';
import { TipoJustificativa } from './tipo-justificativa.model';

export class TipoAvaliacaoNota extends Base {
    public tipo_avaliacao?: TipoAvaliacao;
    public justificativas?: TipoAvaliacaoJustificativa;

    public sequencia: number = 0;
    public nota: any = 0;
    public descricao: string = "";
    public aprova: boolean = false;
    public justifica: boolean = false;
    public pergunta: string = "";
    public icone: string = "";
    public cor: string = "";
    public codigo: string = "";

    public tipo_avaliacao_id: string = "";

    public constructor(data?: any) { super(); this.initialization(data); }
}