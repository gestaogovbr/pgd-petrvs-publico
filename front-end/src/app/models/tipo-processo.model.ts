import { LookupItem } from '../services/lookup.service';
import { Base } from './base.model';

export class TipoProcesso extends Base {
    public nome: string = ""; /* Descrição do tipo de processo */
    public codigo: string = ""; /* Codigo do tipo de processo */
    public etiquetas: LookupItem[] = []; /* Etiquetas */
    public checklist: LookupItem[] = []; /* Checklist */

    public constructor(data?: any) { super(); this.initialization(data); }
}