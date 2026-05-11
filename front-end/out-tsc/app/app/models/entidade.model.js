import { Base } from './base.model';
import { Expediente } from './expediente.model';
import { NotificacoesConfig } from './notificacao.model';
export class Entidade extends Base {
    constructor(data) {
        super();
        this.sigla = ""; // Sigla da entidade
        this.nome = ""; // Nome da entidade
        this.abrangencia = "NACIONAL"; //["NACIONAL", "ESTADUAL", "MUNICIPAL" // ("Abrangência da entidade
        this.codigo_ibge = null; //Código da UF ou do município (IBGE)
        this.uf = null; /* UF para abrangencia estadual */
        this.carga_horaria_padrao = 8; //default(8) //Carga horária utilizada ao criar plano de trabalho
        this.gravar_historico_processo = 0; //default(0) //Se grava andamento da atividade dentro do processo vinculado (Caso seja o Sei, será em Consultar Andamento)
        this.layout_formulario_atividade = "COMPLETO"; //["COMPLETO", "SIMPLIFICADO"]) default("COMPLETO") //Layout para a tela do formulário de atividades (cadastro simplificado ou completo)
        this.campos_ocultos_atividade = []; //Campos que se deseja ocultar do formulário de atividade, com seu respectivo valor padrão, em caso de null será utilizado o valor default do banco"
        this.nomenclatura = []; /* Nomenclatura da entidade */
        this.url_sei = ""; /* Url base do sei */
        this.notificacoes = new NotificacoesConfig();
        this.forma_contagem_carga_horaria = "DIA"; // Forma de contagem padrão da carga horária
        this.expediente = new Expediente(); // Expediente (Não nulo)
        this.gestor_id = null; // Usuário gestor da unidade
        this.gestor_substituto_id = null; // Usuário gestor substituto da unidade
        this.cidade_id = null;
        this.modalidade_pgd_padrao = null; //Modalidade utilizada ao criar plano de trabalho
        this.email_responsavel_siape = ""; // Email do responsável pelas alterações no SIAPE
        this.email_remetente_siape = ""; // Email do remetente a ser usado em relato de alterações no SIAPE
        this.habilitar_relatos_siape = false; // Indica se o relato de erros de lotação no SIAPE está habilitado
        this.emails = []; /* Emails */
        this.initialization(data);
    }
}
//# sourceMappingURL=entidade.model.js.map