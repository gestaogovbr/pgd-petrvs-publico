import { Injectable, Injector } from '@angular/core';
import { Seeder } from '../models/seeder.model';
import { DaoBaseService } from './dao-base.service';

@Injectable({
  providedIn: 'root'
})
export class SeederDaoService extends DaoBaseService<Seeder> {

  constructor(protected injector: Injector) { 
    super("Seeder", injector);
    this.inputSearchConfig.searchFields = ["nome"];
  }

  public getAllSeeder(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.server.get('api/' + this.collection + '/getAll').subscribe(response => {
        resolve(this.loadSeederDados(response));
      }, error => {
        console.log("Erro ao montar a hierarquia da atividade!", error);
        resolve([]);
      });
    });
  }

  private loadSeederDados(response: any): Seeder {
    let dados = response as Seeder;
    return dados;
  }


  public executeSeeder(seederName: string): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      this.server.post('api/' + this.collection + '/execute', {
        seeder: seederName
      }).subscribe(response => {
        resolve(response || []);
      }, error => reject(error));
    });
  }
}
  