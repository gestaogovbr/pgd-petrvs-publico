import { Template } from "./template.model";

export type RelatorioCodigo = "UNKNOW" | "PTR_LISTA" | "PET_LISTA";

export interface HasRelatorio {
  id: string;
  relatorios_templates?: Template[];
}
