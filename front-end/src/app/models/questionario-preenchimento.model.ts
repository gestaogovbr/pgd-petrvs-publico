import { Base } from './base.model';
import { Usuario } from './usuario.model';
import { Questionario } from './questionario.model';
import { QuestionarioPerguntaResposta } from './questionario-pergunta-resposta.model';

export class QuestionarioPreenchimento extends Base {

    public usuario?: Usuario;
    public questionario?: Questionario;
    public respostas?: QuestionarioPerguntaResposta[] = [];

    public data_preenchimento: Date = new Date(); // data em que o usuario respondeu
    public editavel: number = 1; //se é possivel editar a resposta
    public versao: number = 0; //versão do questionario respondido
    public usuario_id: string = "";
    public questionario_id: string = "";

    public constructor(data?: any) { super(); this.initialization(data); }
}
