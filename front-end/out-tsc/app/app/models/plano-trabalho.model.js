import { Base } from './base.model';
export class PlanoTrabalho extends Base {
    constructor(data) {
        super();
        this.accordionDisabled = false;
        this.carga_horaria = 0; //Carga horária diária do usuário
        this.tempo_total = 0; //Horas úteis de trabalho no período de data_inicio (vigência) à data_fim (vigência) considerando carga_horaria, feriados, fins de semana
        this.tempo_proporcional = 0; //tempo_total menos os afastamentos
        this.data_inicio = new Date(); //Início do plano
        this.data_fim = new Date(); //Final do plano
        this.status = 'INCLUIDO'; // Status atual do plano de trabalho
        this.forma_contagem_carga_horaria = "DIA"; // Forma de contagem padrão da carga horária
        this.metadados = undefined; /* Campo virtual contendo informações calculadas pelo servidor */
        this.arquivar = false; // Campo virtual utilizado pelos métodos arquivar/desarquivar
        this.entregas = []; /* Entregas vinculadas ao Plano de Trabalho*/
        this.documentos = [];
        this.atividades = [];
        this.status_historico = []; // Mudanças de status sofridas pelo plano de trabalho (histórico)
        this.consolidacoes = [];
        this.assinaturasExigidas = { "participante": [], "gestores_unidade_executora": [], "gestores_unidade_lotacao": [], "gestores_entidade": [] };
        this.jaAssinaramTCR = { "participante": [], "gestores_unidade_executora": [], "gestores_unidade_lotacao": [], "gestores_entidade": [] };
        this.criterios_avaliacao = []; /* Critérios de avaliação do plano de trabalho */
        this.quantidadeAssinaturasExigidas = 2;
        /*public _metadata: PlanoTrabalhoMetadata = {
            assinaturasExigidas: { "participante": [], "gestores_unidade_executora": [],  "gestores_unidade_lotacao": [], "gestores_entidade": [] },
            jaAssinaramTCR: { "participante": [], "gestores_unidade_executora": [],  "gestores_unidade_lotacao": [], "gestores_entidade": [] },
            criterios_avaliacao: []
        };*/
        this.programa_id = "";
        this.usuario_id = "";
        this.unidade_id = "";
        this.modalidade_pgd = null;
        this.modalidade_pgd_label = "Não definida";
        this.documento_id = null;
        this.initialization(data);
    }
}
//# sourceMappingURL=plano-trabalho.model.js.map