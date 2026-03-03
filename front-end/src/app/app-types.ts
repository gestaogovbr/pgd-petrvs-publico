import { ChangeDetectorRef } from "@angular/core";

export type Contexto = "EXECUCAO" | "GESTAO" | "ADMINISTRADOR" | "DEV" | "PONTO" | "PROJETO" | "RAIOX" ;

export type FullRoute = {
    label?: string,
    route: any[],
    params?: any
}
  
export type RouteMetadata = {
    id?: string, /* ID unico da rota */
    context?: Contexto, /* Contexto */
    title?: string, /* Título da rota */
    modalClose?: (modalResult: any) => Promise<any> | void, /* Callback para o método back() caso seja modal (ao fechar a janela) */
    back?: FullRoute, /* Rota de maior prioridade, será utilizado caso esteja definido, mesmo que esteja no modal */
    source?: FullRoute, /* Rota de prioridade intermediaria, origem alimentado automaticamente pelo Navigate Service */
    default?: FullRoute, /* Roda de menor prioridade, caso não tenha nenhuma rota acima, voltará para a rota especificada aqui */
    destination?: FullRoute, /* Destino da rota (Rota atual) */
    path?: string, /* Path como definido nas rotas (Ex.: /cadastros/afastamento/:id/edit) */
    modalResult?: any, /* Utilizado caso queira passar algum valor para o modalClose */
    filterSnapshot?: any, /* Snapshot dos form de filter */
    querySnapshot?: any, /* Snapshot da query do grid */
    metadata?: any, /* Parametros que podem ser passados, como objetos por referência */
    root?: boolean, /* Módulos raiz, permite limpar todo histórico de Back, deve ser utilizado no acesso a módulos base/listagem */
    modal?: boolean, /* Se é um modal */
    modalWidth?: number /* Width da janela */
}

export type Schema = {
  name: string,
  permition?: string,
  route?: string[],
  metadata?: RouteMetadata,
  params?: any,
  icon: string;
  onClick?: () => void;
};

export type MenuSchema = { [key: string]: Schema };

export type MenuItem = {
  name: string,
  permition?: string,
  id: string,
  menu: Schema[]
} | Schema;

export type PetrvsModule = {
  name: string,
  icon: string
}

export type MenuContexto = {
  key: Contexto,
  permition?: string,
  icon: string,
  name: string,
  menu?: MenuItem[],
  petrvsModule?: string
};

export interface IAppComponent {
    cdRef: ChangeDetectorRef;
    menuContexto: MenuContexto[];
    setMenuVars(): void;
    consultarBlacklistCpf(cpf: string): Promise<void>;
    go: any; /* NavigateService */
    gb: any; /* GlobalsService */
}

export class NavigateResult {
    public modalResult: any;
  
    constructor(result: any) {
      this.modalResult = result;
    }
}
