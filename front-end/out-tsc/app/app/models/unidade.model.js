import { Base } from './base.model';
import { NotificacoesConfig } from './notificacao.model';
export class Unidade extends Base {
    constructor(data) {
        super();
        this.gestor = null; /* Objeto do vinculo entre unidade/usuario que possui a atribuição de gestor */
        this.gestores_substitutos = []; /* Objeto do vinculo entre unidade/usuarios que possuem a atribuição de gestor_substituto */
        this.gestores_delegados = []; /* Objeto do vinculo entre unidade/usuarios que possuem a atribuição de gestor_delegado */
        this.codigo = ""; //Código da unidade
        this.sigla = ""; //Sigla da unidade
        this.nome = ""; //Nome da unidade
        this.path = ""; //Path dos nós pais separados por /
        this.atividades_arquivamento_automatico = 0; //Se arquiva automaticamente após avaliação
        this.distribuicao_forma_contagem_prazos = "DIAS_UTEIS"; // ["HORAS_CORRIDAS", "DIAS_CORRIDOS", "HORAS_UTEIS", "DIAS_UTEIS"]) //Forma da contagem de prazo na distribuição
        this.entrega_forma_contagem_prazos = "HORAS_UTEIS"; // ["HORAS_CORRIDAS", "HORAS_UTEIS"]) //Forma da contagem de prazo na entrega
        this.notificacoes = new NotificacoesConfig(); // Mensagens
        this.etiquetas = []; //Configuração das etiquetas que serão utilizadas nas atividades (contém nome, icone e cor)
        this.checklist = []; //Nome dos checklist
        this.data_inativacao = null; //Data em que a unidade foi inativada, se for o caso
        this.instituidora = 0; //Se a unidade é instituidora (Programas)
        this.executora = 1; //Se a unidade pode cadastrar planos
        this.informal = 1; //Se a unidade é informal
        this.expediente = null; // Expediente (Não nulo)
        this.texto_complementar_plano = ""; // Mensagem adicional para o plano de trabalho
        this.unidade_pai_id = null; //Unidade superior (nó pai hierárquico)
        this.entidade_id = null; // Entidade referente
        this.cidade_id = ""; // Cidade;
        this.initialization(data);
    }
}
//# sourceMappingURL=unidade.model.js.map