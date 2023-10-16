import { Atividade } from "./atividade.model";
import { Base } from "./base.model";
import { CadeiaValorProcesso } from "./cadeia-valor-processo.model";
import { CadeiaValor } from "./cadeia-valor.model";
import { PlanejamentoObjetivo } from "./planejamento-objetivo.model";
import { Planejamento } from "./planejamento.model";
import { PlanoEntregaEntrega } from "./plano-entrega-entrega.model";
import { PlanoTrabalhoEntrega } from "./plano-trabalho-entrega.model";

export class AtividadeHierarquia extends Base {
  public atividade!: Atividade;
  public cadeiaValor?: CadeiaValor;
  public entregaPlanoTrabalho!: PlanoTrabalhoEntrega;
  public entregasPlanoEntrega?: PlanoEntregaEntrega[];
  public objetivos?: PlanejamentoObjetivo[];
  public planejamento?: Planejamento;
  public processos?: CadeiaValorProcesso[];
}