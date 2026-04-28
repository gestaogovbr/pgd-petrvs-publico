import { Base } from './base.model';
import { NotificacoesConfig } from './notificacao.model';
export class UsuarioConfig {
    constructor() {
        this.etiquetas = [];
        this.menu_contexto = "EXECUCAO";
        this.ocultar_menu_sei = true;
        this.ocultar_container_petrvs = false;
        this.theme = 'light';
    }
}
export class Usuario extends Base {
    constructor(data) {
        super();
        this.gerencias_substitutas = [];
        this.gerencias_delegadas = [];
        this.matriculas = [];
        //public notificacoes_whatsapp?: NotificacaoWhatsapp[];
        this.participacoes_programas = [];
        this.unidades_vinculadas = [];
        this.audits_externo = [];
        this.regramentos = [];
        this.nome = ""; /* Nome do Usuário */
        this.email = ""; /* Email do Usuário */
        this.usuario_externo = true;
        this.cpf = ""; /* CPF do usuário */
        this.matricula = null; /* Matrícula do usuário */
        this.apelido = ""; /* Apelido / Nome de Guerra / Nome funcional */
        this.telefone = null; /* Telefone */
        this.data_nascimento = new Date(); /* Data de nascimento do Usuário */
        this.uf = "DF"; /* UF - Setar a primeira do LIST */
        this.sexo = null; /* Sexo */
        this.config = new UsuarioConfig(); /*UsuarioConfig = new UsuarioConfig();*/ /* Configurações diversas */
        this.notificacoes = new NotificacoesConfig();
        this.id_google = null; /* ID do usuário google */
        this.url_foto = null; /* URL da foto do usuário (temporário) */
        this.situacao_funcional = "ATIVO_PERMANENTE";
        this.situacao_siape = "ATIVO";
        this.texto_complementar_plano = ""; // Mensagem adicional para o plano de trabalho
        //public perfil_id: number = 0; /* ID do perfil - Setar o primeiro do list*/
        this.perfil_id = ""; /* ID do perfil - Setar o primeiro do list*/
        this.tipo_pedagio = null; /* Tipo de Pedágio */
        this.data_inicial_pedagio = null; /* Data Inicial do Pedágio */
        this.data_final_pedagio = null; /* Data Final do Pedágio */
        this.pedagio = false;
        this.modalidade_pgd = null; /* Modalidade PGD */
        this.modalidade_pgd_label = "Não definida";
        this.participa_pgd = 'sim'; /* Participa PGD */
        this.initialization(data);
    }
}
//# sourceMappingURL=usuario.model.js.map