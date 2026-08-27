import { Base } from './base.model';

export class RelatorioLacunaPlanoTrabalho extends Base {
  public id: string = '';
  public usuario_id: string = '';
  public nome: string = '';
  public nome_exibicao: string = '';
  public matricula: string = '';
  public unidadeLotacao: string = '';
  public unidadeNome: string = '';
  public unidadeHierarquia: string = '';
  public lacuna: string = '';
  public lacuna_inicio: string = '';
  public lacuna_fim: string = '';
  public quantidade_dias: number = 0;
  public ocorrencias: any[] = [];
  public ocorrencias_texto: string = '';

  public constructor(data?: any) {
    super();
    this.initialization(data);
  }
}
