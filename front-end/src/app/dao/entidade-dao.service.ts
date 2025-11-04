import { Injectable, Injector } from '@angular/core';
import { Entidade } from '../models/entidade.model';
import { CidadeDaoService } from './cidade-dao.service';
import { DaoBaseService } from './dao-base.service';
import { UsuarioDaoService } from './usuario-dao.service';
import { TemplateDataset } from '../modules/uteis/templates/template.service';

@Injectable({
  providedIn: 'root'
})
export class EntidadeDaoService extends DaoBaseService<Entidade> {

  public usuarioDao: UsuarioDaoService;
  public cidadeDao: CidadeDaoService;

  constructor(protected injector: Injector) { 
    super("Entidade", injector);
    this.usuarioDao = injector.get<UsuarioDaoService>(UsuarioDaoService);
    this.cidadeDao = injector.get<CidadeDaoService>(CidadeDaoService);
    this.inputSearchConfig.searchFields = ["sigla", "nome"];
  }  

  public dataset(deeps?: string[]): TemplateDataset[] {
    return this.deepsFilter([
      { field: "sigla", label: "Sigla" },
      { field: "nome", label: "Nome" },
      { field: "gestor", label: "Gestor", fields: this.usuarioDao.dataset([]) },
      { field: "gestores_substitutos", label: "Gestor substituto", fields: this.usuarioDao.dataset([]), type: "ARRAY" },
      { field: "cidade", label: "Cidade", dao: this.cidadeDao }
    ], deeps);
  }

  public generateApiKey(entidade_id: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/generate-api-key', { entidade_id }).subscribe(response => {
        resolve(response?.api_public_key);
      }, error => reject(error));
    });
  }

  public forcaEnvio(entidade_id: string) {
    return new Promise<boolean>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/forcar-envio', {
        id: entidade_id,
      }).subscribe(response => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(!!response?.success);
        }
      }, error => reject(error));
    });
  }
}
