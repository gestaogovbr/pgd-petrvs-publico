import { Base } from './base.model';
import { Documento } from './documento.model';
import { Usuario } from './usuario.model';

export class DocumentoAssinatura extends Base {
    public documento?: Documento;
    public usuario?: Usuario;

    public data_hora: Date = new Date(); /* Data e hora */
    public assinatura: string = ""; /* Assinatura */
    public documento_id: string = ""; /* Documento */
    public usuario_id: string = ""; /* Usuario */

    constructor(){
        super();
    }
}